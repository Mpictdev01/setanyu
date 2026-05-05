"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
	OrbitControls,
	Stars,
	Image,
	Text,
	RoundedBox,
	useTexture,
} from "@react-three/drei";
import * as THREE from "three";
import { useRouter } from "next/navigation";

const MEME_IMAGES = [
	"/meme/images_1.avif",
	"/meme/images_2.avif",
	"/meme/images_3.avif",
	"/meme/images_4.avif",
	"/meme/images_5.avif",
	"/meme/images_6.avif",
	"/meme/images_7.avif",
	"/meme/images_8.avif",
];

// Generate a massive amount of images for a dense dome (200 images - reduced to fit smaller radius)
const IMAGES = Array(20)
	.fill(MEME_IMAGES)
	.flat()
	.sort(() => Math.random() - 0.5);

// Helper to create a rounded rectangle alpha map texture
const useRoundedAlphaMap = (width: number, height: number, radius: number) => {
	return useMemo(() => {
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		const scale = 32; // Resolution scale
		const w = width * scale;
		const h = height * scale;
		const r = radius * scale;

		canvas.width = w;
		canvas.height = h;

		if (ctx) {
			// Draw smooth rounded rect (White on Black)
			ctx.fillStyle = "black";
			ctx.fillRect(0, 0, w, h);
			ctx.fillStyle = "white";
			ctx.beginPath();
			ctx.roundRect(0, 0, w, h, r);
			ctx.fill();
		}

		const texture = new THREE.CanvasTexture(canvas);
		return texture;
	}, [width, height, radius]);
};

// Component for a CURVED rounded image card
function RoundedImage({
	url,
	width,
	height,
	radius,
}: {
	url: string;
	width: number;
	height: number;
	radius: number;
}) {
	const texture = useTexture(url);
	const alphaMap = useRoundedAlphaMap(width, height, radius);
	const geomRef = useRef<THREE.PlaneGeometry>(null);
	const DOME_RADIUS = 15; // Must match dome radius

	// Bend the plane geometry to wrap around the sphere
	useEffect(() => {
		if (geomRef.current) {
			const posAttribute = geomRef.current.attributes.position;
			for (let i = 0; i < posAttribute.count; i++) {
				const x = posAttribute.getX(i);
				const y = posAttribute.getY(i);
				// Curvature formula: z = - (R - sqrt(R^2 - x^2 - y^2))
				// This bends the edges 'backwards' (negative Z) so the center pops out (relative)
				// or effectively wraps the surface.
				const z = -(
					DOME_RADIUS - Math.sqrt(DOME_RADIUS ** 2 - x ** 2 - y ** 2)
				);
				posAttribute.setZ(i, z);
			}
			posAttribute.needsUpdate = true;
			geomRef.current.computeVertexNormals();
		}
	}, [width, height]);

	return (
		<mesh>
			<planeGeometry ref={geomRef} args={[width, height, 8, 8]} />
			<meshBasicMaterial
				map={texture}
				alphaMap={alphaMap}
				transparent={true}
				side={THREE.DoubleSide}
			/>
		</mesh>
	);
}

function Card({
	url,
	position,
	rotation,
	onSelect,
	index,
}: {
	url: string;
	position: [number, number, number];
	rotation: [number, number, number];
	onSelect: (url: string) => void;
	index: number;
}) {
	const groupRef = useRef<THREE.Group>(null);
	const floatRef = useRef<THREE.Group>(null);
	const [hovered, hover] = useState(false);
	const [startAnim, setStartAnim] = useState(false);

	// Trigger animation start with staggered delay
	useEffect(() => {
		const timer = setTimeout(() => {
			setStartAnim(true);
		}, 500 + index * 20); // 500ms initial delay + 20ms per card
		return () => clearTimeout(timer);
	}, [index]);

	// Set initial position to center
	useMemo(() => {
		if (!startAnim && groupRef.current) {
			groupRef.current.position.set(0, 0, 0);
		}
	}, []); // Run once

	useFrame((state, delta) => {
		// 1. Scatter Animation (Move from Center to Target)
		if (groupRef.current) {
			if (startAnim) {
				const target = new THREE.Vector3(...position);
				// Smooth lerp to target position
				groupRef.current.position.lerp(target, 0.05); // Adjust 0.05 for speed
			} else {
				// Keep at center before animation starts
				groupRef.current.position.set(0, 0, 0);
			}
		}

		// 2. Floating Animation (Inner Group)
		if (floatRef.current) {
			floatRef.current.position.y =
				Math.sin(state.clock.elapsedTime + position[0] * 10) * 0.05; // Adjusted amplitude
		}
	});

	return (
		<group
			ref={groupRef}
			rotation={rotation}
			// Initial scale zero or specific can be added if needed, but per request just "menyebar"
		>
			<group
				ref={floatRef}
				onPointerOver={(e) => {
					e.stopPropagation();
					hover(true);
					document.body.style.cursor = "pointer";
				}}
				onPointerOut={() => {
					hover(false);
					document.body.style.cursor = "auto";
				}}
				onClick={(e) => {
					e.stopPropagation();
					onSelect(url);
				}}
				scale={hovered ? 1.2 : 1}>
				{/* Rounded Image Plane */}
				<RoundedImage url={url} width={3} height={4} radius={0.2} />
			</group>
		</group>
	);
}

function DomeContent({ onSelect }: { onSelect: (url: string) => void }) {
	const count = IMAGES.length;
	const radius = 15; // Decreased from 35 to 15 for "zoom view/kecilkan sphere"

	// Fibonacci Sphere Distribution
	const cards = useMemo(() => {
		const temp = [];
		const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

		for (let i = 0; i < count; i++) {
			const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
			const radiusAtY = Math.sqrt(1 - y * y); // Radius at y

			const theta = phi * i; // Golden angle increment

			const x = Math.cos(theta) * radiusAtY;
			const z = Math.sin(theta) * radiusAtY;

			const pos = new THREE.Vector3(x, y, z).multiplyScalar(radius);

			// Calculate rotation to face center (User is inside looking out)
			const rotation = new THREE.Euler();
			const dummy = new THREE.Object3D();
			dummy.position.copy(pos);
			dummy.lookAt(0, 0, 0); // Face the center where the user is
			rotation.copy(dummy.rotation);

			temp.push({
				url: IMAGES[i],
				position: [pos.x, pos.y, pos.z] as [number, number, number],
				rotation: [rotation.x, rotation.y, rotation.z] as [
					number,
					number,
					number
				],
			});
		}
		return temp;
	}, [count, radius]);

	return (
		<group position={[0, -3, 0]}>
			{cards.map((card, i) => (
				<Card
					key={i}
					index={i} // Pass index for staggered animation
					url={card.url}
					position={card.position}
					rotation={card.rotation}
					onSelect={onSelect}
				/>
			))}
		</group>
	);
}

export default function MemeDome() {
	const router = useRouter();
	// State for lightbox
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	return (
		<div className="w-full h-screen bg-black relative">
			{/* Exit Button - HTML Overlay */}
			<div className="absolute top-8 left-1/2 -translate-x-1/2 z-50">
				<button
					onClick={() => router.push("/")}
					className="standard-98-button px-8 py-3 flex items-center gap-3 group no-underline"
					style={{ minHeight: "40px" }}
					aria-label="Exit Dome">
					<span className="text-xs font-bold tracking-wider">EXIT DOME</span>
				</button>
			</div>

			{/* Lightbox Overlay */}
			{selectedImage && (
				<div
					className="absolute inset-0 z-[100] bg-black/80 flex items-center justify-center p-8 backdrop-blur-sm cursor-pointer"
					onClick={() => setSelectedImage(null)}>
					<div
						className="relative max-w-4xl max-h-full border-2 border-white/50 p-2 bg-black/50 rounded-lg shadow-[0_0_50px_rgba(255,255,255,0.2)]"
						onClick={(e) => e.stopPropagation()}>
						<img
							src={selectedImage}
							alt="Meme Fullscreen"
							className="max-w-full max-h-[85vh] object-contain rounded-sm"
						/>
						<button
							onClick={() => setSelectedImage(null)}
							className="absolute -top-4 -right-4 standard-98-button w-8 h-8 flex items-center justify-center font-bold"
							aria-label="Close Lightbox">
							X
						</button>
					</div>
				</div>
			)}

			<Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
				{/* Galaxy Background - Space without planets */}
				<color attach="background" args={["#050510"]} />
				<Stars
					radius={100}
					depth={50}
					count={5000}
					factor={4}
					saturation={0}
					fade
					speed={1}
				/>
				{/* Lights */}
				<ambientLight intensity={0.5} />
				<pointLight position={[0, 0, 0]} intensity={2} />{" "}
				{/* Light from center */}
				{/* Content */}
				<DomeContent onSelect={(url) => setSelectedImage(url)} />
				{/* Controls - Reverse orbit to feel like looking around */}
				<OrbitControls
					enablePan={false}
					enableZoom={true}
					enableDamping={true}
					minDistance={0.1}
					maxDistance={14} // Adjusted to keep user inside (radius 15)
					rotateSpeed={-0.5} // Invert rotation for "looking around" feel
					target={[0, 0, 0]}
				/>
			</Canvas>
		</div>
	);
}
