"use client";

import styles from "./Product.module.css";
import { ProductProps } from "./Product.props";
import { Button, Card, Divider, Rating, Review, ReviewForm, Tag } from "..";
import { declOfNum, priceRu } from "@/helpers/helpers";
import Image from "next/image";
import cn from "classnames";
import { useState, Fragment } from "react";

export const Product = ({ product, className, ...props }: ProductProps) => {
	const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
	return (
		<>
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
					{priceRu(product.price)}
					{product.oldPrice && (
						<Tag className={styles.oldPrice} color="green">
							{priceRu(product.price - product.oldPrice)}
						</Tag>
					)}
				</div>
				<div className={styles.credit}>
					{priceRu(product.credit)}/
					<span className={styles.month}>мес</span>
				</div>
				<div className={styles.rating}>
					<Rating
						rating={product.reviewAvg ?? product.initialRating}
					/>
				</div>
				<div className={styles.tags}>
					{product.categories.map((c) => (
						<Tag key={c} color="ghost" className={styles.category}>
							{c}
						</Tag>
					))}
				</div>
				<div className={styles.priceTitle}>цена</div>
				<div className={styles.creditTitle}>в кредит</div>
				<div className={styles.ratingTitle}>
					{product.reviewCount}{" "}
					{declOfNum(product.reviewCount, [
						"отзыв",
						"отзыва",
						"отзывов",
					])}
				</div>
				<Divider className={cn(styles.hr, styles.hr2)} />
				<div className={styles.description}>{product.description}</div>
				<div className={styles.features}>
					{product.characteristics.map((c) => (
						<div key={c.name} className={styles.characteristics}>
							<span className={styles.characteristicsName}>
								{c.name}
							</span>
							<span className={styles.characteristicsDots}></span>
							<span className={styles.characteristicsValue}>
								{c.value}
							</span>
						</div>
					))}
				</div>
				<div className={styles.advBlock}>
					{product.advantages && (
						<div className={styles.advantages}>
							<div className={styles.advTitle}>Преимущества</div>
							<div>{product.advantages}</div>
						</div>
					)}
					{product.disadvantages && (
						<div className={styles.disadvantages}>
							<div className={styles.advTitle}>Недостатки</div>
							<div>{product.disadvantages}</div>
						</div>
					)}
				</div>
				<Divider className={styles.hr} />
				<div className={styles.actions}>
					<Button appearance="primary">Узнать подробнее</Button>
					<Button
						appearance="ghost"
						arrow={isReviewOpened ? "down" : "right"}
						className={styles.reviewBtn}
						onClick={() =>
							setIsReviewOpened((prevState) => !prevState)
						}
					>
						Читать отзывы
					</Button>
				</div>
			</Card>
			<Card
				color="blue"
				className={cn(styles.reviews, {
					[styles.opened]: isReviewOpened,
					[styles.closed]: !isReviewOpened,
				})}
			>
				{product.reviews.map((r) => (
					<Fragment key={r._id}>
						<Review review={r} />
						<Divider />
					</Fragment>
				))}
				<ReviewForm productId={product._id} />
			</Card>
		</>
	);
};
