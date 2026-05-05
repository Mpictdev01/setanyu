"use client";

import { useThree, Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { useEffect } from "react";

function CameraRig() {
	const { camera } = useThree();
	useEffect(() => {
		camera.lookAt(0, 2, -5);
	}, [camera]);
	return null;
}

// A single voxel block
const Voxel = ({ position, color = "white", scale = [1, 1, 1] }: any) => {
	return (
		<mesh position={position} scale={scale} castShadow receiveShadow>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={color} roughness={0.8} />
		</mesh>
	);
};

// Voxel Tree
const VoxelTree = ({ position }: { position: [number, number, number] }) => {
	return (
		<group position={position}>
			<Voxel position={[0, 0.5, 0]} scale={[0.5, 1, 0.5]} color="#5C4033" /> {/* Trunk */}
			<Voxel position={[0, 1.5, 0]} scale={[1.5, 1.5, 1.5]} color="#228B22" /> {/* Leaves */}
			<Voxel position={[0, 2.2, 0]} scale={[1, 1, 1]} color="#32CD32" /> {/* Top Leaves */}
		</group>
	);
};

// Voxel Cloud
const VoxelCloud = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
	return (
		<group position={position} scale={[scale, scale, scale]}>
			<Voxel position={[0, 0, 0]} scale={[4, 2, 3]} color="#ffffff" />
			<Voxel position={[-2, -0.2, 0]} scale={[3, 1.5, 2.5]} color="#ffffff" />
			<Voxel position={[2, -0.2, 0]} scale={[3, 1.5, 2.5]} color="#ffffff" />
			<Voxel position={[1, 1.2, -0.5]} scale={[2, 1.5, 2]} color="#f9f9f9" />
			<Voxel position={[-1, 1, 0.5]} scale={[2, 1.5, 2]} color="#ffffff" />
		</group>
	);
};

const WhitehouseGroup = () => {
    // Bangunan dan lingkungan statis, tanpa useFrame atau Group Ref untuk rotasi
	return (
		<group position={[0, -2, -5]}>
			{/* Ground */}
			<Voxel position={[0, -0.5, 0]} scale={[500, 1, 500]} color="#4CAF50" />
			
			{/* Pathway */}
			<Voxel position={[0, 0.01, 8]} scale={[6, 0.1, 100]} color="#E0E0E0" />

			{/* Central Building */}
			<Voxel position={[0, 2.5, 0]} scale={[10, 5, 8]} color="#f2f2f2" />
			
			{/* Central Roof Base */}
			<Voxel position={[0, 5.5, 0]} scale={[10.5, 1, 8.5]} color="#e0e0e0" />
			{/* Top mini dome / square */}
			<Voxel position={[0, 6.5, 0]} scale={[4, 1, 4]} color="#f2f2f2" />
			
			{/* Portico Base */}
			<Voxel position={[0, 0.5, 5.5]} scale={[8, 1, 4]} color="#e0e0e0" />
			{/* Portico Roof */}
			<Voxel position={[0, 5, 5.5]} scale={[8, 0.5, 4]} color="#e0e0e0" />
			<Voxel position={[0, 5.75, 5.5]} scale={[7, 1, 3]} color="#d0d0d0" />
			
			{/* Columns */}
			{[-3.5, -2.1, -0.7, 0.7, 2.1, 3.5].map((x, i) => (
				<Voxel key={`col-${i}`} position={[x, 3, 7]} scale={[0.6, 4.5, 0.6]} color="#ffffff" />
			))}

			{/* Left Wing */}
			<Voxel position={[-10, 2, 0]} scale={[10, 4, 6]} color="#f0f0f0" />
			{/* Left Wing Roof */}
			<Voxel position={[-10, 4.25, 0]} scale={[10.2, 0.5, 6.2]} color="#e0e0e0" />

			{/* Right Wing */}
			<Voxel position={[10, 2, 0]} scale={[10, 4, 6]} color="#f0f0f0" />
			{/* Right Wing Roof */}
			<Voxel position={[10, 4.25, 0]} scale={[10.2, 0.5, 6.2]} color="#e0e0e0" />

			{/* Windows Central */}
			{[-3, -1.5, 1.5, 3].map((x) => 
				[1.5, 3.5].map((y) => (
					<Voxel key={`win-cen-${x}-${y}`} position={[x, y, 4.1]} scale={[0.8, 1, 0.1]} color="#87CEEB" />
				))
			)}
			
			{/* Windows Wings */}
			{[-13, -11, -9, -7, 7, 9, 11, 13].map((x) => 
				 [1.5, 3].map((y) => (
					<Voxel key={`win-wing-${x}-${y}`} position={[x, y, 3.1]} scale={[0.8, 1, 0.1]} color="#87CEEB" />
				))
			)}
			
			{/* Main Door */}
			<Voxel position={[0, 2, 4.1]} scale={[1.6, 2.5, 0.1]} color="#8B4513" />

			{/* American Flag Top */}
			<Voxel position={[0, 7.5, 0]} scale={[0.1, 2, 0.1]} color="#c0c0c0" />
			<Voxel position={[0.7, 8.2, 0]} scale={[1.4, 0.8, 0.05]} color="#b22234" />
			<Voxel position={[0.3, 8.4, 0.1]} scale={[0.6, 0.4, 0.06]} color="#3c3b6e" />

			{/* Trees Left */}
			<VoxelTree position={[-15, 0, 8]} />
			<VoxelTree position={[-12, 0, 10]} />
			<VoxelTree position={[-18, 0, 4]} />
			<VoxelTree position={[-8, 0, 12]} />
			
			{/* Trees Right */}
			<VoxelTree position={[15, 0, 8]} />
			<VoxelTree position={[12, 0, 10]} />
			<VoxelTree position={[18, 0, 4]} />
			<VoxelTree position={[8, 0, 12]} />

			{/* Scattered Voxel Clouds */}
			<VoxelCloud position={[-15, 15, -15]} scale={1.5} />
			<VoxelCloud position={[20, 12, -25]} scale={2} />
			<VoxelCloud position={[-25, 20, -35]} scale={2.5} />
			<VoxelCloud position={[30, 18, -20]} scale={1.8} />
			<VoxelCloud position={[0, 22, -40]} scale={3} />
			<VoxelCloud position={[-40, 16, -10]} scale={2} />
			<VoxelCloud position={[40, 14, -15]} scale={2.2} />
		</group>
	);
};

export default function VoxelWhitehouseBackground() {
	return (
		<div className="fixed inset-0 w-full h-full z-[-1] pointer-events-none">
			<Canvas shadows camera={{ position: [0, 6, 25], fov: 40 }}>
				<CameraRig />
				
				{/* Background siang hari cerah murni tanpa efek scattering senja/putih */}
				<color attach="background" args={["#1DA1F2"]} /> 
				
				{/* Fog diganti menjadi biru langit menyamarkan batasan ujung dunia (grass tidak lagi luntur memutih) */}
				<fog attach="fog" args={["#1DA1F2", 100, 300]} />

				{/* Cahaya ambient dinaikkan secara signifikan agar warna rumput dan bangunan lebih vibran */}
				<ambientLight intensity={1.5} color="#ffffff" />
				
				{/* Sinar matahari siang overhead yang kuat */}
				<directionalLight 
					position={[30, 80, 40]} 
					intensity={2.8} 
					color="#ffffff"
					castShadow 
					shadow-mapSize-width={2048} 
					shadow-mapSize-height={2048} 
				/>

				<WhitehouseGroup />
			</Canvas>
		</div>
	);
}

