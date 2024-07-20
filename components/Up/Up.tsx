"use client";

import styles from "./Up.module.css";
import UpIcon from "./up.svg";
import { motion, useAnimation } from "framer-motion";
import { useScrollY } from "@/hooks/useScrollY";
import { useEffect } from "react";

export const Up = () => {
	const controls = useAnimation();
	const y = useScrollY();

	useEffect(() => {
		controls.start({ opacity: y / document.body.scrollHeight });
	}, [y, controls]);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<motion.button
			initial={{ opacity: 0 }}
			animate={controls}
			className={styles.up}
			onClick={scrollToTop}
		>
			<UpIcon />
		</motion.button>
	);
};
