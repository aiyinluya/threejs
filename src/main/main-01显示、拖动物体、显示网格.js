import * as THREE from 'three';
//导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// console.log(THREE);

//1、创建场景
const scene = new THREE.Scene();

//2、创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//设置相机位置
camera.position.set(0, 0, 10);
//将相机添加到场景
scene.add(camera);

//3、添加物体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
//创建材质
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
//根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
//将几何体添加到场景中
scene.add(cube);

//4、初始化渲染器
const renderer = new THREE.WebGLRenderer();
//设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);


//5、将webgl渲染器添加到body
document.body.appendChild(renderer.domElement);

//6、使用渲染器，通过相机将场景渲染进来(一次渲染)
// renderer.render(scene, camera);

//7、创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

//8、多次渲染
function render() {
    renderer.render(scene, camera);
    //浏览器帧改变函数会被调用
    requestAnimationFrame(render);
}
render();

//9、添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

