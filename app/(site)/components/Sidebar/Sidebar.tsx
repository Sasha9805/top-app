import Menu from "../Menu/Menu";
import { SidebarProps } from "./Sidebar.props";
import Logo from "@/public/logo.svg";
import styles from "./Sidebar.module.css";
import cn from "classnames";

export const Sidebar = ({ className, ...props }: SidebarProps) => {
	return (
		<div className={cn(className, styles.sidebar)} {...props}>
			<Logo className={styles.logo} />
			<div>Поиск</div>
			<Menu />
		</div>
	);
};
