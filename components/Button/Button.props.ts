import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export interface ButtonProps
	extends Omit<
		DetailedHTMLProps<
			ButtonHTMLAttributes<HTMLButtonElement>,
			HTMLButtonElement
		>,
		"onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag" | "ref"
	> {
	children: React.ReactNode;
	appearance: "primary" | "ghost";
	arrow?: "right" | "down" | "none";
}
