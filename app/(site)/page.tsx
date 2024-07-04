// "use client";

// import { useState } from "react";
import { Htag, Button, P, Tag, Rating } from "../../components";
import { getMenu } from "@/api/menu";

const firstCategory = 0;

export default async function Home() {
	// const [rating, setRating] = useState<number>(4);
	// const menu = await getMenu(firstCategory);
	return (
		<>
			<Htag tag="h1">Text</Htag>

			<Button appearance="primary" arrow="right">
				Button
			</Button>
			<Button appearance="ghost" arrow="down">
				Button
			</Button>

			<P size="s">Text</P>
			<P>Text</P>
			<P size="l">Text</P>

			<Tag>Test</Tag>
			<Tag color="red">Test</Tag>
			<Tag color="green">Test</Tag>
			<Tag color="gray">Test</Tag>
			<Tag color="primary">Test</Tag>

			<Tag size="m">Test</Tag>
			<Tag size="m" color="red">
				Test
			</Tag>
			<Tag size="m" color="green">
				Test
			</Tag>
			<Tag size="m" color="gray">
				Test
			</Tag>
			<Tag size="m" color="primary">
				Test
			</Tag>

			{/* <Rating rating={4} setRating={() => {}} isEditable /> */}
		</>
	);
}
