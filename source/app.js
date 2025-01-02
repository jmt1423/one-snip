import React from 'react';
import {Text, Box} from 'ink';

export default function App() {
	return (
		<MainLayout>
			<SideBar />
			<Content />
		</MainLayout>
	);
}

function MainLayout({children}) {
	return <Box>{children}</Box>;
}

function SideBar() {
	return (
		<Box borderStyle={'single'} width={40}>
			<Text>Sidebar woo</Text>
		</Box>
	);
}

function Content() {
	return (
		<Box width={'100%'} borderStyle={'single'}>
			<Text>Content area</Text>
		</Box>
	);
}
