import cn from "classnames";
import styles from "./Textarea.module.css";
import { TextareaProps } from "./Textarea.props";
import { Noto_Sans } from "next/font/google";

const noto_sans = Noto_Sans({ subsets: ["cyrillic", "latin"] });

export const Textarea = ({ className, ...props }: TextareaProps) => {
	return (
		<textarea
			className={cn(className, styles.input, noto_sans.className)}
			{...props}
		/>
	);
};
