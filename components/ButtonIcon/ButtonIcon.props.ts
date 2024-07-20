import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import up from "./up.svg";
import close from "./close.svg";
import menu from "./menu.svg";

export const icons = {
	up,
	close,
	menu,
};

export type IconMame = keyof typeof icons;

export interface ButtonIconProps
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	icon: IconMame;
	appearance: "primary" | "white";
}
