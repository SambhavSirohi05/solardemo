import React, { useRef, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const Sun = ({ radius = 25, registerRef, visible = true }) => {
    const meshRef = useRef();

    const texture = useLoader(THREE.TextureLoader, '/textures/sun.jpg');

    useEffect(() => {
        if (registerRef && meshRef.current) {
            registerRef("Sun", meshRef);
        }
    }, [registerRef]);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y -= 0.002;
        }
    });

    return (
        <group>
            {/* Light ALWAYS ON */}
            <pointLight intensity={2} distance={1000} decay={0} color="#FDB813" />

            {/* Visuals - Conditional */}
            <group visible={visible}>
                <mesh ref={meshRef} onClick={(e) => e.stopPropagation()}>
                    <sphereGeometry args={[radius, 64, 64]} />
                    <meshBasicMaterial map={texture} color="#ffffff" />
                </mesh>

                {/* Glow effect */}
                <mesh>
                    <sphereGeometry args={[radius * 1.2, 32, 32]} />
                    <meshBasicMaterial color="#FFD700" transparent opacity={0.15} side={THREE.BackSide} />
                </mesh>
                <mesh>
                    <sphereGeometry args={[radius * 1.5, 32, 32]} />
                    <meshBasicMaterial color="#FF4500" transparent opacity={0.05} side={THREE.BackSide} />
                </mesh>
            </group>
        </group>
    );
};

export default Sun;
