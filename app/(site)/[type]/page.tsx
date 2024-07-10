import { getMenu } from "@/api/menu";
import { firstLevelMenu } from "@/helpers/helpers";
import { notFound } from "next/navigation";

export default async function Type({ params }: { params: { type: string } }) {
	// console.log(params);
	const firstCategoryItem = firstLevelMenu.find(
		(m) => m.route === params.type
	);
	if (!firstCategoryItem) {
		notFound();
	}
	const menu = await getMenu(firstCategoryItem.id);
	return <>Type {firstCategoryItem.id}</>;
}

export const generateStaticParams = async () => {
	return firstLevelMenu.map((m) => ({
		type: m.route,
	}));
};
