import cn from "classnames";
import styles from "./Card.module.css";
import { CardProps } from "./Card.props";

export const Card = ({
	children,
	color = "white",
	className,
	...props
}: CardProps) => {
	return (
		<div
			className={cn(className, styles.card, {
				[styles.blue]: color === "blue",
			})}
			{...props}
		>
			{children}
		</div>
	);
};
