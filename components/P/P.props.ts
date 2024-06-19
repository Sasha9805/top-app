import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface PProps
	extends DetailedHTMLProps<
		HTMLAttributes<HTMLParagraphElement>,
		HTMLParagraphElement
	> {
	children: React.ReactNode;
	size?: "s" | "m" | "l";
}
