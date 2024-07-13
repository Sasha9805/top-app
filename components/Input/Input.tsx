import cn from "classnames";
import styles from "./Input.module.css";
import { InputProps } from "./Input.props";
import { Noto_Sans } from "next/font/google";

const noto_sans = Noto_Sans({ subsets: ["cyrillic", "latin"] });

export const Input = ({ className, ...props }: InputProps) => {
	return <input className={cn(className, styles.input, noto_sans.className)} {...props} />;
};
