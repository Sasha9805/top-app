import { Htag, Button, P, Tag } from "../components";

export default function Home() {
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
		</>
	);
}
