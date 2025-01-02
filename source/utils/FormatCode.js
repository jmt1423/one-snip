// @ts-nocheck
import prettier from 'prettier';

export default function formatCode(code) {
	try {
		return prettier.format(code, {
			parser: 'babel',
			tabWidth: 2,
			useTabs: false,
		});
	} catch (error) {
		return code;
	}
}
