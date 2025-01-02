import React, {useState} from 'react';
import {Box, useApp} from 'ink';
import ContentPaneOne from './content/ContentPageOne.js';
import ContentPaneTwo from './content/ContentPageTwo.js';
import SideBar from './components/SideBar.js';
import LandingPage from './components/LandingPage.js';

const navItems = [
	{label: 'Pane 1', value: 'pane_one'},
	{label: 'Pane 2', value: 'pane_two'},
	{label: 'Exit', value: 'exit'},
];

export default function App() {
	const [currentNavItem, setNavItem] = useState(null);
	const {exit} = useApp();

	const onNavSelect = item => {
		if (item.value === 'exit') {
			exit();
		} else {
			setNavItem(item);
		}
	};

	if (!currentNavItem) {
		return <LandingPage onStart={() => setNavItem(navItems[0])} />;
	}

	return (
		<MainLayout>
			<SideBar navItems={navItems} onSelect={onNavSelect} />
			{currentNavItem?.value === 'pane_one' && <ContentPaneOne />}
			{currentNavItem?.value === 'pane_two' && <ContentPaneTwo />}
		</MainLayout>
	);
}

function MainLayout({children}) {
	return <Box>{children}</Box>;
}
