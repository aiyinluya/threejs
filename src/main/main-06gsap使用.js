import * as THREE from 'three';
//导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//导入动画库
import gsap from 'gsap';

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
// 设置缩放
// cube.scale.set(3,2,1);
// 旋转
// cube.rotation.set(Math.PI / 4, 0, 0, 'ZYX');
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
//创建时钟
const clock = new THREE.Clock();
//8、多次渲染
function render() {
  var aminal = gsap.to(cube.position, {
    x: 5, duration: 5, ease: "power1.out",
    repeat: -1,
    yoyo: true,
    // delay: 2,
    onComplete: () => {
      console.log('加进去了');
    },
    onStart: () => {
      console.log('动画开始');
    }

  })
  window.addEventListener('dblclick', function () {
    if (aminal.isActive()) {
      aminal.pause();
    } else {
      aminal.resume();
    }
  
    }
  )
  // gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5, ease: "power1.out" })
  // gsap.to(cube.scale, { x:3, y:2, duration: 5 })
  //获取时间
  const t = clock.getElapsedTime();

  renderer.render(scene, camera);
  //浏览器帧改变函数会被调用,默认传递time
  requestAnimationFrame(render);
}
render();


//9、添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

