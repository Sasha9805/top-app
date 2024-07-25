/* eslint-disable react/display-name */
import cn from "classnames";
import styles from "./Textarea.module.css";
import { TextareaProps } from "./Textarea.props";
import { Noto_Sans } from "next/font/google";
import { ForwardedRef, forwardRef } from "react";

const noto_sans = Noto_Sans({ subsets: ["cyrillic", "latin"] });

export const Textarea = forwardRef(
	(
		{ className, error, ...props }: TextareaProps,
		ref: ForwardedRef<HTMLTextAreaElement>
	) => {
		return (
			<div className={cn(className, styles.textareaWrapper)}>
				<textarea
					ref={ref}
					className={cn(styles.textarea, noto_sans.className, {
						[styles.error]: error,
					})}
					{...props}
				/>
				{error && (
					<span role="alert" className={styles.errorMessage}>
						{error.message}
					</span>
				)}
			</div>
		);
	}
);
