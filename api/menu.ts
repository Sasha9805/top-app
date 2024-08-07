import { API } from "@/app/api";
import { MenuItem } from "@/interfaces/menu.interface";

export async function getMenu(firstCategory: number): Promise<MenuItem[]> {
	const res = await fetch(API.topPage.find, {
		method: "POST",
		body: JSON.stringify({ firstCategory }),
		headers: new Headers({ "content-type": "application/json" }),
	});
	const menu = (await res.json()) as MenuItem[];
	return menu.map((m) => ({
		...m,
		isOpened: false,
	}));
}
