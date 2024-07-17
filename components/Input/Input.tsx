/* eslint-disable react/display-name */
import cn from "classnames";
import styles from "./Input.module.css";
import { InputProps } from "./Input.props";
import { Noto_Sans } from "next/font/google";
import { ForwardedRef, forwardRef } from "react";

const noto_sans = Noto_Sans({ subsets: ["cyrillic", "latin"] });

export const Input = forwardRef(
	(
		{ className, error, ...props }: InputProps,
		ref: ForwardedRef<HTMLInputElement>
	) => {
		return (
			<div className={cn(className, styles.inputWrapper)}>
				<input
					ref={ref}
					className={cn(styles.input, noto_sans.className, {
						[styles.error]: error,
					})}
					{...props}
				/>
				{error && (
					<span className={styles.errorMessage}>{error.message}</span>
				)}
			</div>
		);
	}
);
