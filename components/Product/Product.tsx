/* eslint-disable react/display-name */
"use client";

import styles from "./Product.module.css";
import { ProductProps } from "./Product.props";
import { Button, Card, Divider, Rating, Review, ReviewForm, Tag } from "..";
import { declOfNum, priceRu } from "@/helpers/helpers";
import Image from "next/image";
import cn from "classnames";
import { useState, useRef, forwardRef, ForwardedRef, Fragment } from "react";
import { motion, AnimationDefinition } from "framer-motion";

export const Product = motion(
	forwardRef(
		(
			{ product, className, ...props }: ProductProps,
			ref: ForwardedRef<HTMLDivElement>
		) => {
			const [isReviewOpened, setIsReviewOpened] =
				useState<boolean>(false);
			const reviewRef = useRef<HTMLDivElement>(null);

			const variants = {
				visible: { opacity: 1, height: "auto" },
				hidden: { opacity: 0, height: 0 },
			};

			const scrollToReview = () => {
				setIsReviewOpened(true);
				reviewRef.current?.focus();
			};

			const onAnimationComplete = (definition: AnimationDefinition) => {
				if (definition === "visible") {
					reviewRef.current?.scrollIntoView({
						behavior: "smooth",
						block: "start",
					});
				}
			};

			return (
				<div
					ref={ref}
					className={cn(styles.wrapper, className)}
					{...props}
				>
					<Card className={styles.product}>
						<div className={styles.logo}>
							<Image
								src={product.image}
								alt={product.title}
								width={70}
								height={70}
							/>
							{/* <img src={product.image} alt={product.title} /> */}
						</div>
						<div className={styles.title}>{product.title}</div>
						<div className={styles.price}>
							<span className="visuallyHidden">цена</span>
							{priceRu(product.price)}
							{product.oldPrice && (
								<Tag className={styles.oldPrice} color="green">
									<span className="visuallyHidden">
										скидка
									</span>
									{priceRu(product.price - product.oldPrice)}
								</Tag>
							)}
						</div>
						<div className={styles.credit}>
							<span className="visuallyHidden">кредит</span>
							{priceRu(product.credit)}/
							<span className={styles.month}>мес</span>
						</div>
						<div className={styles.rating}>
							<span className="visuallyHidden">
								{"рейтинг " + product.reviewAvg ??
									product.initialRating}
							</span>
							<Rating
								rating={
									product.reviewAvg ?? product.initialRating
								}
							/>
						</div>
						<div className={styles.tags}>
							{product.categories.map((c) => (
								<Tag
									key={c}
									color="ghost"
									className={styles.category}
								>
									{c}
								</Tag>
							))}
						</div>
						<div className={styles.priceTitle} aria-hidden={true}>
							цена
						</div>
						<div className={styles.creditTitle} aria-hidden={true}>
							в кредит
						</div>
						<div className={styles.ratingTitle}>
							<a href="#ref" onClick={scrollToReview}>
								{product.reviewCount}{" "}
								{declOfNum(product.reviewCount, [
									"отзыв",
									"отзыва",
									"отзывов",
								])}
							</a>
						</div>
						<Divider className={cn(styles.hr, styles.hr2)} />
						<div className={styles.description}>
							{product.description}
						</div>
						<div className={styles.features}>
							{product.characteristics.map((c) => (
								<div
									key={c.name}
									className={styles.characteristics}
								>
									<span
										className={styles.characteristicsName}
									>
										{c.name}
									</span>
									<span
										className={styles.characteristicsDots}
									></span>
									<span
										className={styles.characteristicsValue}
									>
										{c.value}
									</span>
								</div>
							))}
						</div>
						<div className={styles.advBlock}>
							{product.advantages && (
								<div className={styles.advantages}>
									<div className={styles.advTitle}>
										Преимущества
									</div>
									<div>{product.advantages}</div>
								</div>
							)}
							{product.disadvantages && (
								<div className={styles.disadvantages}>
									<div className={styles.advTitle}>
										Недостатки
									</div>
									<div>{product.disadvantages}</div>
								</div>
							)}
						</div>
						<Divider className={styles.hr} />
						<div className={styles.actions}>
							<Button appearance="primary">
								Узнать подробнее
							</Button>
							<Button
								appearance="ghost"
								arrow={isReviewOpened ? "down" : "right"}
								className={styles.reviewBtn}
								onClick={() =>
									setIsReviewOpened((prevState) => !prevState)
								}
								aria-expanded={isReviewOpened}
							>
								Читать отзывы
							</Button>
						</div>
					</Card>
					<motion.div
						animate={isReviewOpened ? "visible" : "hidden"}
						initial="hidden"
						variants={variants}
						onAnimationComplete={onAnimationComplete}
					>
						<Card
							ref={reviewRef}
							color="blue"
							className={cn(styles.reviews)}
							tabIndex={isReviewOpened ? 0 : -1}
						>
							{product.reviews.map((r) => (
								<Fragment key={r._id}>
									<Review review={r} />
									<Divider />
								</Fragment>
							))}
							<ReviewForm
								productId={product._id}
								isOpened={isReviewOpened}
							/>
						</Card>
					</motion.div>
				</div>
			);
		}
	)
);
