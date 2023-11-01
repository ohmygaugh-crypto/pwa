import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function ThreeScene() {
  const containerRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();

    // Add lights to the scene
    const ambientLight = new THREE.AmbientLight(0xffffff, 3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // make the scene background transparent
    const renderer = new THREE.WebGLRenderer({alpha: true});
    //  ensure that the background of the canvas is transparent
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(500, 500);

    // Set the size of the renderer
    renderer.setSize(500, 500);

    // Clear the container before appending the renderer
    if (containerRef.current) { 
      while (containerRef.current.firstChild) { 
        containerRef.current.removeChild(containerRef.current.firstChild); 
      }
      containerRef.current.appendChild(renderer.domElement);
    }

    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    const loader = new GLTFLoader();
    loader.load('/chef.glb', (gltf) => {
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
    
        gltf.scene.position.x += (gltf.scene.position.x - center.x);
        gltf.scene.position.y += (gltf.scene.position.y - center.y);
        gltf.scene.position.z += (gltf.scene.position.z - center.z);
    
        scene.add(gltf.scene);
    }, undefined, (error) => {
        console.error('An error occurred while loading the model:', error);
    });

    camera.position.z = 15;
    camera.position.y = 15;
    

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update(); // Add this line to update the controls in the animation loop
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup on unmount
    return () => {
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} />;
}

export default ThreeScene;