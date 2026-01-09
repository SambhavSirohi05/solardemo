import React, { useRef } from 'react';
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import Planet from './Planet';
import * as THREE from 'three';

const PlanetInspector = ({ planet, interactionDom }) => {
    const inspectorPlanetData = {
        ...planet,
        distance: 0,
    };

    return (
        <group>
            {/* 'Hero' Camera - Fixed distance, good framing */}
            <PerspectiveCamera makeDefault position={[0, 0, planet.radius * 3.5]} fov={50}>
                {/* HEADLAMP: Light attached to the camera, moves with it/rotation view */}
                <pointLight intensity={1.5} distance={500} decay={1} color="#ffffff" />
            </PerspectiveCamera>

            <ambientLight intensity={0.1} />
            <directionalLight position={[50, 20, 50]} intensity={2.0} castShadow />
            <pointLight position={[-50, 0, 20]} intensity={0.5} color="#aabbff" />
            <spotLight position={[0, 50, -50]} intensity={1.5} color="#ffffff" angle={0.5} penumbra={1} />

            <group position={[0, 0, 0]}>
                <Planet
                    planet={inspectorPlanetData}
                    isSelected={false}
                    isPaused={true}
                    visible={true}
                />
            </group>

            {/* BINDING CONTROLS TO UI DIV */}
            <OrbitControls
                domElement={interactionDom} // Binds events to the Interface Hero div!
                enablePan={false}
                enableZoom={false} // Disable Zoom to allow Window Scroll
                enableRotate={true}
                autoRotate={true}
                autoRotateSpeed={0.5}
                target={[0, 0, 0]}
            />

            <Stars radius={300} depth={50} count={2000} factor={4} saturation={0} fade speed={0.5} />
        </group>
    );
};

export default PlanetInspector;
