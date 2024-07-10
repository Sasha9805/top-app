import { getMenu } from "@/api/menu";

export default async function Search() {
	const menu = await getMenu(0);
	return <>Search</>;
}
