import { getMenu } from "@/api/menu";
import { getPage } from "@/api/page";
import { getProducts } from "@/api/products";
import { firstLevelMenu } from "@/helpers/helpers";
import { notFound } from "next/navigation";
import { TopPageComponent } from "./components/TopPageComponent/TopPageComponent";
import { Metadata } from "next";

interface IPath {
	type: string;
	alias: string;
}

export async function generateMetadata({
	params,
}: {
	params: { alias: string; type: string };
}): Promise<Metadata> {
	const page = await getPage(params.alias);
	return {
		title: page?.metaTitle,
		description: page?.metaDescription,
		openGraph: {
			title: page?.metaTitle,
			description: page?.metaDescription,
			type: "article",
			url:
				process.env.NEXT_PUBLIC_DOMAIN +
				"/" +
				params.type +
				"/" +
				params.alias,
		},
	};
}

export async function generateStaticParams() {
	let paths: IPath[] = [];
	for (let topMenu of firstLevelMenu) {
		const menu = await getMenu(topMenu.id);

		const newPaths = menu.flatMap((m) =>
			m.pages.map((p) => ({
				type: topMenu.route,
				alias: p.alias,
			}))
		);
		paths = [...paths, ...newPaths];
	}
	return paths;
}

export default async function TopPage({
	params,
}: {
	params: { alias: string; type: string };
}) {
	const firstCategoryItem = firstLevelMenu.find(
		(m) => m.route === params.type
	);
	if (!firstCategoryItem) {
		notFound();
	}
	const page = await getPage(params.alias);
	if (!page) {
		notFound();
	}
	const products = await getProducts(page.category);

	return (
		<TopPageComponent
			page={page}
			products={products}
			firstCategory={firstCategoryItem.id}
		/>
	);
}
