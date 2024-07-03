import { getMenu } from "@/api/menu";
import { getPage } from "@/api/page";
import { getProducts } from "@/api/products";
import { notFound } from "next/navigation";

const firstCategory = 0;

export async function generateStaticParams() {
	const menu = await getMenu(firstCategory);
	return menu.flatMap((item) =>
		item.pages.map((page) => ({
			alias: page.alias,
		}))
	);
}

export default async function Course({
	params,
}: {
	params: { alias: string };
}) {
	const page = await getPage(params.alias);
	if (!page) {
		notFound();
	}
	const products = await getProducts(page.category);
	return <>{products && products.length}</>;
}
