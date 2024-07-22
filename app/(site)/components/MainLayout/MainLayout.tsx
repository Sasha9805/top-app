"use client";

import { Up } from "@/components";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import { MainLayoutProps } from "./MainLayout.props";
import styles from "./MainLayout.module.css";
import { useState, useRef, KeyboardEvent } from "react";
import cn from "classnames";

export const MainLayout = ({ children }: MainLayoutProps) => {
	const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] =
		useState<boolean>(false);

	const bodyRef = useRef<HTMLDivElement>(null);

	const skipContentAction = (e: KeyboardEvent) => {
		if (e.code === "Enter" || e.code === "Space") {
			e.preventDefault();
			bodyRef.current?.focus();
		}
		setIsSkipLinkDisplayed(false);
	};

	return (
		<div className={styles.wrapper}>
			<a
				tabIndex={1}
				className={cn(styles.skipLink, {
					[styles.displayed]: isSkipLinkDisplayed,
				})}
				onFocus={() => setIsSkipLinkDisplayed(true)}
				onKeyDown={skipContentAction}
			>
				Сразу к содержанию
			</a>
			<Header className={styles.header} />
			<Sidebar className={styles.sidebar} />
			<div ref={bodyRef} tabIndex={0} className={styles.body}>
				{children}
			</div>
			<Footer className={styles.footer} />
			<Up />
		</div>
	);
};
