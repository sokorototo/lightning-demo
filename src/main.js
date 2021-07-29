"use strict";

const canvas = document.getElementById("cx");

const engine = new BABYLON.Engine(canvas, true, { alpha: true });
engine.setHardwareScalingLevel(2);

const scene = new BABYLON.Scene(engine);
scene.debugLayer.show();
scene.clearColor = BABYLON.Color3.Teal();

const reflectionTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("src/environment.env", scene);
scene.environmentTexture = reflectionTexture;

const camera = new BABYLON.ArcRotateCamera('main_camera', 0, 0, 10, BABYLON.Vector3.Zero(), scene);
camera.minZ = 0;
camera.attachControl(canvas, true);

const floor = BABYLON.MeshBuilder.CreateBox('floor', {
	depth: 200,
	height: 0.1,
	width: 200
}, scene);
floor.material = new BABYLON.PBRMaterial('floor_mat', scene);

const assetContainer = new BABYLON.AssetContainer(scene);

window.addEventListener('resize', () => {
	engine.resize();
});

engine.runRenderLoop(() => {
	scene.render();
});

console.log(window);