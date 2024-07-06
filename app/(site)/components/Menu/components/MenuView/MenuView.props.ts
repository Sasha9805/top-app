import { MenuItem } from "@/interfaces/menu.interface";
import { TopLevelCategory } from "@/interfaces/page.interface";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface MenuViewProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	menu: MenuItem[];
	firstCategory: TopLevelCategory;
}
