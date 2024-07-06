import { getMenu } from "@/api/menu";
import MenuView from "./components/MenuView/MenuView";

const firstCategory = 0;

export const Menu = async () => {
	const menu = await getMenu(firstCategory);

	return <MenuView menu={menu} firstCategory={firstCategory} />;
};
