export function onTransliterateKeyDown(event) {
	const key = event.key;
	switch(key) {
	  case 'Shift':
		this.ime.state.shift = true;
		break;
	  case 'Control':
		this.ime.state.ctrl = true;
		break;
	  case 'Alt':
		this.ime.state.alt = true;
		break;
	  //default:
		//console.log(key);
	}
}

export function onTransliterateKeyUp(event) {
	const key = event.key;
	switch(key) {
	  case 'Shift':
		this.ime.state.shift = false;
		break;
	  case 'Control':
		this.ime.state.ctrl = false;
		break;
	  case 'Alt':
		this.ime.state.alt = false;
		break;
	}
}

export function onTransliterateKeyPress(event) {
	if (event.key == "Enter") return;
	
	event.preventDefault();
	let key = event.key;
	
	const startPos = this.selectionStart;
    const endPos = this.selectionEnd;
		
	let prefix = this.value.substring(0, startPos);
	const suffix = this.value.substring(endPos,this.value.length);

	for (const i of this.ime.data) {
		if (!i[0].endsWith(key)) continue;
		// if (this.state.alt != i[2]) continue;
		//if (this.state.ctrl != i[3]) continue;
		const context = i[0].slice(0, -1);
		if (!prefix.endsWith(context)) continue;
		
		prefix = prefix.substring(0, prefix.length - context.length);
		key = i[1];
	}

	this.value = prefix + key + suffix;
	this.selectionStart = this.value.length - suffix.length;
	this.selectionEnd = this.selectionStart;
}



export function setTransliterateIME(ime, editor) {
    editor.ime = {
      state: {shift:false, alt:false, ctrl:false},
      data: ime.data
    }

    editor.onkeydown = onTransliterateKeyDown;
    editor.onkeyup = onTransliterateKeyUp;
    editor.onkeypress = onTransliterateKeyPress;
  
    editor.focus();
}