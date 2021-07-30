"use strict";
import Loader from './loader.js';

async function init(ev) {
	const canvas = document.getElementById("cx");

	const engine = new BABYLON.Engine(canvas, true, { alpha: true });
	engine.setHardwareScalingLevel(2);

	const scene = new BABYLON.Scene(engine);
	scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
	scene.clearColor = BABYLON.Color3.FromHexString("#002828");
	scene.debugLayer.show();
	Loader('src/floor_mat', scene).then(console.log)

	// scene.onPointerDown = () => { if (!engine.isPointerLock) engine.enterPointerlock() };

	const reflectionTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("src/environment.env", scene);
	scene.environmentTexture = reflectionTexture;
	scene.environmentIntensity = 0.35;

	const camera = new BABYLON.FreeCamera('main_camera', BABYLON.Vector3.Up().scale(12), scene);
	camera.attachControl(canvas, true);
	camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
	camera.checkCollisions = true;
	camera.applyGravity = true;
	camera.position.y += 12;
	camera.minZ = 0;

	const floor = BABYLON.MeshBuilder.CreateGround('floor', {
		height: 200,
		width: 200
	}, scene);
	floor.checkCollisions = true;

	floor.material = new BABYLON.PBRMaterial('floor_mat', scene);
	floor.material.backFaceCulling = false;
	floor.material.albedoColor = BABYLON.Color3.FromHexString("#3E1E00");
	floor.material.roughness = 0.7;
	floor.material.metallic = 0.6;

	const assetContainer = BABYLON.SceneLoader.LoadAssetContainer('./src/gun/', 'main.babylon', scene, (container) => {
		container.addAllToScene();
	});

	window.addEventListener('resize', () => {
		engine.resize();
	});

	engine.runRenderLoop(() => {
		scene.render();
	});
};

window.addEventListener('load', init, { once: true , passive: true});