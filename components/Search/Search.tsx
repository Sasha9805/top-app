"use client";

import { KeyboardEvent, useState } from "react";
import cn from "classnames";
import styles from "./Search.module.css";
import { SearchProps } from "./Search.props";
import { Button, Input } from "..";
import GlassIcon from "./glass.svg";
import { useRouter } from "next/navigation";

export const Search = ({ className, ...props }: SearchProps) => {
	const [search, setSearch] = useState<string>("");
	const router = useRouter();
	const goToSearch = () => {
		const url = `/search?q=${search}`;
		router.push(url);
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Enter") {
			goToSearch();
		}
	};

	return (
		<div className={cn(className, styles.search)} {...props}>
			<Input
				className={styles.input}
				placeholder="Поиск..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
			<Button
				appearance="primary"
				className={styles.button}
				onClick={goToSearch}
			>
				<GlassIcon />
			</Button>
		</div>
	);
};
