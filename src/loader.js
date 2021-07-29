"use strict"
class TypeError extends Error{
	constructor(message, type){
		this.type = type;
		super(message);
	}
}

export default async function load(macroUrl) { // TODO: Import BABYLON object instead of expecting it to be available globally
	const sep = '/'; // To avoid redeclaration
	if (!macroUrl.endsWith(sep)) macroUrl += sep;
	const {globals, ...props} = await fetch(`${macroUrl}import.json`).then(res => res.json());

	switch (props.type) {
		case "PBRMaterial":
			console.log('[LOADER] Loading PBRMaterial!');
			for (let i = 0; i < globals.length; i++) {
				const global = globals[i];
				console.log(global);
			}
			break;
	
		default:
			throw new TypeError('Unknown import type found', props.type);
	}
}