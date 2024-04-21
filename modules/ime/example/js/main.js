import { fetchIME, setTransliterateIME } from '/npm/esm/mod.js';

async function onCopy(event)
{
	event.preventDefault();

	const buffer = textEditor.value;
	
	if (!navigator.clipboard) {
		return;
	}

	try {
		await navigator.clipboard.writeText(buffer);
	} catch (error) {
		console.error("Copy to clipboard failed", error);
	}

	textEditor.focus();
}

function onDownload(event)
{
	event.preventDefault();

	const buffer = textEditor.value;
	
	const blobData = new Blob(
		[ buffer ], 
		{ type: 'text/plain;charset=utf-8' });

	const blobUrl = URL.createObjectURL(blobData);
	
	const link = document.createElement('a');
	link.href = blobUrl;
	link.target = "_blank";
	if (downloadFileName != null) {
		link.download = downloadFileName;
	} else {
		link.download = "new-text.md";
	}
	
	link.click();
	URL.revokeObjectURL(blobUrl);
	textEditor.focus();
}

function onReset(event)
{
	event.preventDefault();
	textEditor.value = "";
	textEditor.focus();
}

export async function onLoad()
{
    downloadButton.onclick = onDownload;
	copyButton.onclick = onCopy;
	resetButton.onclick = onReset;

    const ime = await fetchIME('/ime/transliterate.json');

    setTransliterateIME(ime, textEditor);

	console.log("Hello from IME TextEdit!");
    console.log(ime);
}