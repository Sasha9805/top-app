"use client";

import { Input, Rating, Textarea, Button } from "..";
import styles from "./ReviewForm.module.css";
import { ReviewFormProps } from "./ReviewForm.props";
import cn from "classnames";
import CloseIcon from "./close.svg";
import { useForm, Controller } from "react-hook-form";
import { IReviewForm } from "./ReviewForm.interface";

export const ReviewForm = ({
	productId,
	className,
	...props
}: ReviewFormProps) => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IReviewForm>();
	const onSubmit = (data: IReviewForm) => {
		console.log(data);
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(className, styles.reviewForm)} {...props}>
				<Input
					{...register("name", {
						required: { value: true, message: "Заполните имя" },
					})}
					error={errors.name}
					placeholder="Имя"
				/>
				<Input
					{...register("title", {
						required: {
							value: true,
							message: "Заполните заголовок",
						},
					})}
					error={errors.title}
					placeholder="Заголовок отзыва"
					className={styles.title}
				/>
				<div className={styles.rating}>
					<span>Оценка</span>
					<Controller
						control={control}
						name="rating"
						rules={{
							required: {
								value: true,
								message: "Укажите рейтинг",
							},
						}}
						render={({ field }) => (
							<Rating
								ref={field.ref}
								error={errors.rating}
								isEditable
								rating={field.value}
								setRating={field.onChange}
							/>
						)}
					/>
				</div>
				<Textarea
					{...register("description", {
						required: {
							value: true,
							message: "Заполните описание",
						},
					})}
					error={errors.description}
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
		</form>
	);
};
