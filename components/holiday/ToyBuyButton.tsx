import React from "react";
import PixelText from "./PixelText";

interface ToyBuyButtonProps {
	label?: string;
	onClick?: () => void;
	fullWidth?: boolean;
}

// HANYA LABEL, TANPA HARGA
const ToyBuyButton = ({
	label = "CLICK ME",
	onClick,
	fullWidth = true,
}: ToyBuyButtonProps) => {
	return (
		<button
			onClick={onClick}
			type="button"
			className="standard-98-button"
			style={{
				width: fullWidth ? "100%" : "auto",
				padding: "4px 10px",
				fontSize: "12px",
				cursor: "pointer",
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
				minHeight: "25px",
			}}>
			<span
				style={{ fontFamily: "var(--font-press-start-2p)", fontSize: "10px" }}>
				{label}
			</span>
		</button>
	);
};

export default ToyBuyButton;
