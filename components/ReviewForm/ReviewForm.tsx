import { Input, Rating, Textarea, Button } from "..";
import styles from "./ReviewForm.module.css";
import { ReviewFormProps } from "./ReviewForm.props";
import cn from "classnames";
import CloseIcon from "./close.svg";

export const ReviewForm = ({
	productId,
	className,
	...props
}: ReviewFormProps) => {
	return (
		<>
			<div className={cn(className, styles.reviewForm)} {...props}>
				<Input placeholder="Имя" />
				<Input
					placeholder="Заголовок отзыва"
					className={styles.title}
				/>
				<div className={styles.rating}>
					<span>Оценка</span>
					<Rating rating={0} />
				</div>
				<Textarea
					placeholder="Текст отзыва"
					className={styles.description}
				/>
				<div className={styles.submit}>
					<Button appearance="primary">Отправить</Button>
					<span className={styles.info}>
						* Перед публикацией отзыв пройдет предварительную
						модерацию и проверку
					</span>
				</div>
			</div>
			<div className={styles.success}>
				<div className={styles.successTitle}>Ваш отзыв отправлен</div>
				<div className={styles.successDescription}>
					Спасибо, ваш отзыв будет опубликован после проверки.
				</div>
				<CloseIcon className={styles.close} />
			</div>
		</>
	);
};
