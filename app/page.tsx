import { Htag, Button, P } from "../components";

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
		</>
	);
}
