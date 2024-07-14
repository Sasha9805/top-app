import styles from "./Product.module.css";
import { ProductProps } from "./Product.props";
import { Button, Card, Divider, Rating, Tag } from "..";
import { priceRu } from "@/helpers/helpers";

export const Product = ({ product, className, ...props }: ProductProps) => {
	return (
		<Card className={styles.product}>
			<div className={styles.logo}>
				<img src={product.image} alt={product.title} />
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
				<Rating rating={product.reviewAvg ?? product.initialRating} />
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
				{product.reviewCount} отзывов
			</div>
			<Divider className={styles.hr} />
			<div className={styles.description}>{product.description}</div>
			<div className={styles.features}>фичи</div>
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
					arrow="right"
					className={styles.reviewBtn}
				>
					Читать отзывы
				</Button>
			</div>
		</Card>
	);
};
