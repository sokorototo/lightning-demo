"use strict"
class TypeError extends Error {
	constructor(message, type) {
		super(message);
		this.type = type;
	}
}

function parse(_type, _props, _globals, _scene, _home) {
	for (let i = 0; i < +_globals?.length; i++) {
		// Synchronize globals
		const global = _globals[i];

		for (const key in _props) {
			if (key === 'name') continue;

			const property = _props[key];
			if (property.type === global.type) Object.assign(property, global);
		};
	};

	switch (_type) {
		case "PBRMaterial":

			const mat = new BABYLON.PBRMaterial(_props["name"] || "pbr_material", _scene);
			for (const key in _props) {
				if (key === 'name') continue;

				const property = _props[key];
				const { type, globals, ...props } = property;
				mat[key] = parse(type, props, globals, _scene, _home);
			};
			return mat;

		case "Flag":
			return _props.value

		case "Texture":
			const texture = new BABYLON.Texture(`${_home}${_props['url']}`, _scene);
			for (const key in _props) {
				if (key === 'name' || key === 'url') continue;
				console.log(key);

				const property = _props[key];
				const { type, globals, ...props } = property;
				texture[key] = parse(type, props, globals, _scene, _home);
			};
			return texture
		default:
			return new TypeError('Unknown import type found', _type);
	}
}

export default async function load(macroUrl, scene) { // TODO: Import BABYLON object instead of expecting it to be available globally
	const sep = '/'; // To avoid re-declarations
	if (!macroUrl.endsWith(sep)) macroUrl += sep;
	const { type, globals, ...props } = await fetch(`${macroUrl}import.json`).then(res => res.json());

	return parse(type, props, globals, scene, macroUrl);
};