"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MenuViewProps } from "./MenuView.props";
import {
	FirstLevelMenuItem,
	PageItem,
	MenuItem,
} from "@/interfaces/menu.interface";
import styles from "./MenuView.module.css";
import CoursesIcon from "./icons/courses.svg";
import ServicesIcon from "./icons/services.svg";
import BooksIcon from "./icons/books.svg";
import ProductsIcon from "./icons/products.svg";
import { TopLevelCategory } from "@/interfaces/page.interface";
import cn from "classnames";
import Link from "next/link";

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

export default function MenuView({ firstCategory, menu }: MenuViewProps) {
	const pathname = usePathname();

	const [menuState, setMenuState] = useState<MenuItem[]>(menu);

	useEffect(() => {
		const pathNameAlias = pathname.split("/")[2];
		if (!pathNameAlias) {
			return;
		}

		const newMenuState = menuState.map((m) => {
			const aliases = m.pages.map((p) => p.alias);
			if (aliases.includes(pathNameAlias)) {
				return {
					...m,
					isOpened: true,
				};
			}
			return m;
		});
		setMenuState(newMenuState);
	}, [pathname]);

	const openSecondLevel = (
		secondCategory: string,
		isOpenedMainCategory: boolean
	) => {
		if (isOpenedMainCategory) {
			return;
		}
		const newMenu = menuState.map((m) => {
			if (m._id.secondCategory === secondCategory) {
				return {
					...m,
					isOpened: !m.isOpened,
				};
			}
			return m;
		});
		setMenuState(newMenu);
	};

	const buildFirstLevel = () => {
		return (
			<>
				{firstLevelMenu.map((m) => (
					<div key={m.route}>
						<Link href={`/${m.route}`}>
							<div
								className={cn(styles.firstLevel, {
									[styles.firstLevelActive]:
										m.id === firstCategory,
								})}
							>
								{m.icon}
								<span>{m.name}</span>
							</div>
						</Link>
						{m.id === firstCategory && buildSecondLevel(m)}
					</div>
				))}
			</>
		);
	};

	const buildSecondLevel = (firstLevelMenuItem: FirstLevelMenuItem) => {
		return (
			<div className={styles.secondBlock}>
				{menuState.map((m) => {
					const pathNameAlias = pathname.split("/")[2];
					const aliases = m.pages.map((p) => p.alias);
					return (
						<div key={m._id.secondCategory}>
							<div
								className={styles.secondLevel}
								onClick={() =>
									openSecondLevel(
										m._id.secondCategory,
										aliases.includes(pathNameAlias)
									)
								}
							>
								{m._id.secondCategory}
							</div>
							<div
								className={cn(styles.secondLevelBlock, {
									[styles.secondLevelBlockOpened]: m.isOpened,
								})}
							>
								{buildThirdLevel(
									m.pages,
									firstLevelMenuItem.route
								)}
							</div>
						</div>
					);
				})}
			</div>
		);
	};

	const buildThirdLevel = (pages: PageItem[], route: string) => {
		return pages.map((p) => {
			const currentHref = `/${route}/${p.alias}`;
			const isActive = currentHref === pathname;
			return (
				<Link
					key={p._id}
					href={currentHref}
					className={cn(styles.thirdLevel, {
						[styles.thirdLevelActive]: isActive,
					})}
				>
					{p.category}
				</Link>
			);
		});
	};

	return <div className={styles.menu}>{buildFirstLevel()}</div>;
}
