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
//修改物体位置
// cube.position.set(5,0,0);
cube.position.x = 3;
// 设置缩放
// cube.scale.set(3,2,1);
cube.scale.x = 3;
// 旋转
cube.rotation.set(Math.PI / 4, 0, 0, 'ZYX');
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
//设置控制器阻尼，让控制器效果更真实，必须在动画循环里面调用。update()
controls.enableDamping = true;

//8、多次渲染
function render() {
  // cube.position.x += 0.1;
  // if(cube.position.x > 5) {
  //     cube.position.x = 0;
  // }

  cube.rotation.x += 0.1;
  if (cube.rotation.x > 3.14) {
    cube.rotation.x = 0;
  }
  renderer.render(scene, camera);
  controls.update();
  //浏览器帧改变函数会被调用
  requestAnimationFrame(render);
}
render();
//使屏幕改变后自适应
window.addEventListener('resize', () => {
  //画面变化更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  //更新摄像机投影矩阵
  camera.updateProjectionMatrix();
  //更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  //设置渲染器像素比
  renderer.setPixelRatio(window.devicePixelRatio);
});

//9、添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

