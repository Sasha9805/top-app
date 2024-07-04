import { useContext } from "react";
import styles from "./Menu.module.css";
import { FirstLevelMenuItem, PageItem } from "@/interfaces/menu.interface";
import CoursesIcon from "./icons/courses.svg";
import ServicesIcon from "./icons/services.svg";
import BooksIcon from "./icons/books.svg";
import ProductsIcon from "./icons/products.svg";
import { TopLevelCategory } from "@/interfaces/page.interface";
import cn from "classnames";
import { getMenu } from "@/api/menu";

const firstCategory = 0;

const firstLevelMenu: FirstLevelMenuItem[] = [
	{
		route: "courses",
		name: "Курсы",
		icon: <CoursesIcon />,
		id: TopLevelCategory.Courses,
	},
	{
		route: "services",
		name: "Сервисы",
		icon: <ServicesIcon />,
		id: TopLevelCategory.Services,
	},
	{
		route: "books",
		name: "Книги",
		icon: <BooksIcon />,
		id: TopLevelCategory.Books,
	},
	{
		route: "products",
		name: "Товары",
		icon: <ProductsIcon />,
		id: TopLevelCategory.Products,
	},
];

export const Menu = async () => {
	const menu = await getMenu(0);

	const buildFirstLevel = () => {
		return (
			<>
				{firstLevelMenu.map((m) => (
					<div key={m.route}>
						<a href={`/${m.route}`}>
							<div
								className={cn(styles.firstLevel, {
									[styles.firstLevelActive]:
										m.id === firstCategory,
								})}
							>
								{m.icon}
								<span>{m.name}</span>
							</div>
						</a>
						{m.id === firstCategory && buildSecondLevel(m)}
					</div>
				))}
			</>
		);
	};

	const buildSecondLevel = (firstLevelMenuItem: FirstLevelMenuItem) => {
		return (
			<div className={styles.secondBlock}>
				{menu.map((m) => (
					<div key={m._id.secondCategory}>
						<div className={styles.secondLevel}>
							{m._id.secondCategory}
						</div>
						<div
							className={cn(styles.secondLevelBlock, {
								[styles.secondLevelBlockOpened]: m.isOpened,
							})}
						>
							{buildThirdLevel(m.pages, firstLevelMenuItem.route)}
						</div>
					</div>
				))}
			</div>
		);
	};

	const buildThirdLevel = (pages: PageItem[], route: string) => {
		return pages.map((p) => (
			<a
				key={p._id}
				href={`/${route}/${p.alias}`}
				className={cn(styles.thirdLevel, {
					// Исправим при useRouter, будем сравнивать с текущим роутом
					[styles.thirdLevelActive]: false,
				})}
			>
				{p.category}
			</a>
		));
	};

	return <div className={styles.menu}>{buildFirstLevel()}</div>;
};
