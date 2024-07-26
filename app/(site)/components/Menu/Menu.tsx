"use client";

import { useState, useEffect, useMemo, KeyboardEvent } from "react";
import { usePathname } from "next/navigation";
import {
	FirstLevelMenuItem,
	PageItem,
	MenuItem,
} from "@/interfaces/menu.interface";
import styles from "./Menu.module.css";
import cn from "classnames";
import Link from "next/link";
import { firstLevelMenu } from "@/helpers/helpers";
import { getMenu } from "@/api/menu";
import { TopLevelCategory } from "@/interfaces/page.interface";
import { motion } from "framer-motion";

export default function Menu() {
	const pathname = usePathname();

	const [menuState, setMenuState] = useState<MenuItem[]>([]);
	const [isPendingSwitching, setIsPendingSwitching] = useState(false);
	const [announce, setAnnounce] = useState<"closed" | "opened" | undefined>();

	const firstCategory = useMemo<TopLevelCategory | null>(() => {
		const pathNameCategory = pathname.split("/")[1];

		const firstLevelItem = firstLevelMenu.find(
			(m) => m.route === pathNameCategory
		);
		if (!firstLevelItem) {
			return null;
		}
		return firstLevelItem.id;
	}, [pathname]);

	const variants = {
		visible: {
			marginBottom: 20,
			transition: {
				when: "beforeChildren",
				staggerChildren: 0.1,
			},
		},
		hidden: {
			marginBottom: 0,
		},
	};

	const variantsChildren = {
		visible: {
			opacity: 1,
			height: "auto",
		},
		hidden: {
			opacity: 0,
			height: 0,
		},
	};

	useEffect(() => {
		if (firstCategory === null) {
			return;
		}
		getMenu(firstCategory).then((res) => {
			updateState(res);
		});
	}, [firstCategory]);

	const updateState = (menu: MenuItem[]) => {
		const pathNameAlias = pathname.split("/")[2];
		if (!pathNameAlias) {
			setMenuState(menu);
			setIsPendingSwitching(false);
		}

		const newMenuState = menu.map((m) => {
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
		setIsPendingSwitching(false);
	};

	const openFirstLevel = () => {
		setIsPendingSwitching(true);
	};

	const openSecondLevel = (
		secondCategory: string,
		isOpenedMainCategory: boolean
	) => {
		if (isOpenedMainCategory) {
			return;
		}
		const newMenu = menuState.map((m) => {
			if (m._id.secondCategory === secondCategory) {
				setAnnounce(m.isOpened ? "closed" : "opened");
				return {
					...m,
					isOpened: !m.isOpened,
				};
			}
			return m;
		});
		setMenuState(newMenu);
	};

	const openSecondLevelKey = (
		e: KeyboardEvent,
		secondCategory: string,
		isOpenedMainCategory: boolean
	) => {
		if (e.code === "Enter" || e.code === "Space") {
			e.preventDefault();
			openSecondLevel(secondCategory, isOpenedMainCategory);
		}
	};

	const buildFirstLevel = () => {
		return (
			<ul className={styles.firstLevelList}>
				{firstLevelMenu.map((m) => (
					<li key={m.route} aria-expanded={m.id === firstCategory}>
						<Link href={`/${m.route}`} onClick={openFirstLevel}>
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
						{m.id === firstCategory &&
							!isPendingSwitching &&
							buildSecondLevel(m)}
					</li>
				))}
			</ul>
		);
	};

	const buildSecondLevel = (firstLevelMenuItem: FirstLevelMenuItem) => {
		return (
			<ul className={styles.secondBlock}>
				{menuState.map((m) => {
					const pathNameAlias = pathname.split("/")[2];
					const aliases = m.pages.map((p) => p.alias);
					return (
						<li key={m._id.secondCategory}>
							<button
								className={styles.secondLevel}
								onClick={() =>
									openSecondLevel(
										m._id.secondCategory,
										aliases.includes(pathNameAlias)
									)
								}
								onKeyDown={(e: KeyboardEvent) =>
									openSecondLevelKey(
										e,
										m._id.secondCategory,
										aliases.includes(pathNameAlias)
									)
								}
								aria-expanded={m.isOpened ? true : false}
							>
								{m._id.secondCategory}
							</button>
							<motion.ul
								layout
								variants={variants}
								initial={m.isOpened ? "visible" : "hidden"}
								animate={m.isOpened ? "visible" : "hidden"}
								className={cn(styles.secondLevelBlock)}
							>
								{buildThirdLevel(
									m.pages,
									firstLevelMenuItem.route,
									m.isOpened ?? false
								)}
							</motion.ul>
						</li>
					);
				})}
			</ul>
		);
	};

	const buildThirdLevel = (
		pages: PageItem[],
		route: string,
		isOpened: boolean
	) => {
		return pages.map((p) => {
			const currentHref = `/${route}/${p.alias}`;
			const isActive = currentHref === pathname;
			return (
				<motion.li key={p._id} variants={variantsChildren}>
					<Link
						tabIndex={isOpened ? 0 : -1}
						href={currentHref}
						className={cn(styles.thirdLevel, {
							[styles.thirdLevelActive]: isActive,
						})}
						aria-current={isActive ? "page" : false}
					>
						{p.category}
					</Link>
				</motion.li>
			);
		});
	};

	return (
		<nav className={styles.menu} role="navigation">
			{announce && (
				<span role="log" className="visuallyHidden">
					{announce === "opened" ? "развернуто" : "свернуто"}
				</span>
			)}
			{buildFirstLevel()}
		</nav>
	);
}
