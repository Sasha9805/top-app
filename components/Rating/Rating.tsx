/* eslint-disable react/display-name */
"use client";

import { RatingProps } from "./Rating.props";
import styles from "./Rating.module.css";
import cn from "classnames";
import {
	useState,
	useEffect,
	useRef,
	KeyboardEvent,
	forwardRef,
	ForwardedRef,
} from "react";
import StarIcon from "./star.svg";

export const Rating = forwardRef(
	(
		{
			error,
			rating,
			isEditable = false,
			setRating,
			tabIndex,
			...props
		}: RatingProps,
		ref: ForwardedRef<HTMLDivElement>
	) => {
		const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
			new Array(5).fill(<></>)
		);
		const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

		useEffect(() => {
			constructRating(rating);
		}, [rating, tabIndex]);

		const computeFocus = (r: number, i: number): number => {
			if (!isEditable) {
				return -1;
			}

			if (!rating && i === 0) {
				return tabIndex ?? 0;
			}

			if (r === i + 1) {
				return tabIndex ?? 0;
			}

			return -1;
		};

		const constructRating = (currentRating: number) => {
			const updatedArray = ratingArray.map(
				(r: JSX.Element, i: number) => {
					return (
						<span
							key={i}
							className={cn(styles.star, {
								[styles.filled]: i < currentRating,
								[styles.editable]: isEditable,
							})}
							onMouseEnter={() => changeDisplay(i + 1)}
							onMouseLeave={() => changeDisplay(rating)}
							onClick={() => onClick(i + 1)}
							tabIndex={computeFocus(rating, i)}
							onKeyDown={handleKey}
							ref={(r) => {
								ratingArrayRef.current[i] = r;
							}}
							role={isEditable ? "slider" : ""}
							aria-valuenow={rating}
							aria-valuemin={1}
							aria-valuemax={5}
							aria-label={
								isEditable
									? "Укажите рейтинг"
									: "рейтинг " + rating
							}
							aria-invalid={error ? true : false}
						>
							<StarIcon />
						</span>
					);
				}
			);
			setRatingArray(updatedArray);
		};

		const changeDisplay = (i: number) => {
			if (!isEditable) {
				return;
			}
			constructRating(i);
		};

		const onClick = (i: number) => {
			if (!isEditable || !setRating) {
				return;
			}
			setRating(i);
		};

		const handleKey = (e: KeyboardEvent<HTMLSpanElement>) => {
			if (!isEditable || !setRating) {
				return;
			}

			if (e.code === "ArrowRight" || e.code === "ArrowUp") {
				e.preventDefault();
				if (!rating) {
					setRating(1);
				} else {
					setRating(rating < 5 ? rating + 1 : 5);
				}
				ratingArrayRef.current[rating]?.focus();
			}

			if (e.code === "ArrowLeft" || e.code === "ArrowDown") {
				e.preventDefault();
				setRating(rating > 1 ? rating - 1 : 1);
				ratingArrayRef.current[rating - 2]?.focus();
			}
		};
		return (
			<div
				{...props}
				ref={ref}
				className={cn(styles.ratingWrapper, {
					[styles.error]: error,
				})}
			>
				{ratingArray.map((r, i) => (
					<span key={i}>{r}</span>
				))}
				{error && (
					<span role="alert" className={styles.errorMessage}>
						{error.message}
					</span>
				)}
			</div>
		);
	}
);
