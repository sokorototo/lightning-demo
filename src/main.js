"use strict";
const canvas = document.getElementById("cx");
const engine = new BABYLON.Engine(canvas, true, { alpha: true });
const scene = new BABYLON.Scene(engine);
const camera = new BABYLON.ArcRotateCamera('main_camera', 0, 0, 10, BABYLON.Vector3.Zero(), scene);
const main_light = new BABYLON.PointLight('main_light', BABYLON.Vector3.Up().scale(3), scene);
const floor = BABYLON.MeshBuilder.CreateBox('floor', {}, scene);
window.addEventListener('resize', () => {
    engine.resize();
});
engine.runRenderLoop(() => {
    scene.render();
});
