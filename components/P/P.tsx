import cn from "classnames";
import styles from "./P.module.css";
import { PProps } from "./P.props";

export const P = ({ children, size = "m", className, ...props }: PProps) => {
	return (
		<p
			className={cn(className, styles.p, {
				[styles.s]: size === "s",
				[styles.m]: size === "m",
				[styles.l]: size === "l",
			})}
			{...props}
		>
			{children}
		</p>
	);
};
