/* eslint-disable react/display-name */
import cn from "classnames";
import styles from "./Card.module.css";
import { CardProps } from "./Card.props";
import { ForwardedRef, forwardRef } from "react";

export const Card = forwardRef(
	(
		{ children, color = "white", className, ...props }: CardProps,
		ref: ForwardedRef<HTMLDivElement>
	) => {
		return (
			<div
				ref={ref}
				className={cn(className, styles.card, {
					[styles.blue]: color === "blue",
				})}
				{...props}
			>
				{children}
			</div>
		);
	}
);
