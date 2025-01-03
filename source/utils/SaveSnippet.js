import fs from 'fs';
import path from 'path';
import os from 'os';

export default function SaveSnippet(code, description, language) {
	const filePath = path.join(
		os.homedir(),
		`.config/one-snippets/${language}.json`,
	);
	let snippetObject = {
		lanague: language,
		description: description,
		code: code,
	};

	const dirPath = path.dirname(filePath);

	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath, {recursive: true});
	}

	let data = [];
	if (fs.existsSync(filePath)) {
		const fileContent = fs.readFileSync(filePath, 'utf8');
		if (fileContent) {
			data = JSON.parse(fileContent);
		}
	}

	data.push(snippetObject);

	fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
