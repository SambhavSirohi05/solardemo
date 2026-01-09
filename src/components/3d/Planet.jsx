import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

const SIMULATION_SPEED = 5;

const Planet = ({ planet, onPlanetClick, isSelected, registerRef, isPaused = false, visible = true }) => {
    const meshRef = useRef();
    const orbitRef = useRef();

    const texture = useLoader(THREE.TextureLoader, planet.texture);

    useEffect(() => {
        if (registerRef && meshRef.current) {
            registerRef(planet.name, meshRef);
        }
    }, [registerRef, planet.name]);

    useFrame((state, delta) => {
        // Rotation (Self)
        if (meshRef.current) {
            const rotSpeed = 2 / Math.abs(planet.rotationPeriod);
            meshRef.current.rotation.y += rotSpeed * delta * (planet.rotationPeriod < 0 ? -1 : 1);
        }

        // Revolution (Orbit)
        if (orbitRef.current && !isPaused) {
            if (planet.orbitPeriod > 0) {
                const anglePerSecond = (Math.PI * 2) / planet.orbitPeriod * SIMULATION_SPEED;
                orbitRef.current.rotation.y += anglePerSecond * delta;
            }
        }
    });

    // Calculate Tilt in Radians
    const tiltRad = planet.tilt ? (planet.tilt * Math.PI) / 180 : 0;

    return (
        <group ref={orbitRef} visible={visible}>

            {!isPaused && (
                <mesh rotation-x={-Math.PI / 2}>
                    {/* Defensive Radius Check: Ensure innerRadius is at least 0 */}
                    <ringGeometry args={[Math.max(0, planet.distance - 0.2), planet.distance + 0.2, 128]} />
                    <meshBasicMaterial color="#ffffff" opacity={0.08} transparent side={THREE.DoubleSide} />
                </mesh>
            )}

            <group position={[planet.distance, 0, 0]}>

                {/* TULT GROUP: Wraps Planet Mesh AND Rings */}
                <group rotation={[0, 0, tiltRad]}>
                    <mesh
                        ref={meshRef}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!isSelected) {
                                onPlanetClick(planet);
                            }
                        }}
                        onPointerOver={() => {
                            if (visible) document.body.style.cursor = 'pointer';
                        }}
                        onPointerOut={() => {
                            document.body.style.cursor = 'auto';
                        }}
                    >
                        <sphereGeometry args={[planet.radius, 64, 64]} />
                        <meshStandardMaterial
                            map={texture}
                            roughness={0.8}
                            metalness={0.1}
                            emissive={'#444444'}
                            emissiveIntensity={0.05}
                        />

                        {/* HTML Label (needs to counter-rotate if we want it flat? Or just let it tilt?)
                  Usually labels should be screen-aligned. Html component handles that. 
                  But its position will be tilted. That's fine. */}
                        <Html
                            distanceFactor={planet.radius * 15}
                            zIndexRange={[100, 0]}
                            style={{
                                pointerEvents: 'none',
                                display: (isSelected || isPaused || !visible) ? 'none' : 'block',
                                width: '200px',
                                textAlign: 'center',
                                transform: 'translate3d(-50%, -100%, 0)'
                            }}
                        >
                            <div style={{
                                color: 'white',
                                background: 'rgba(0,0,0,0.6)',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontFamily: 'sans-serif',
                                display: 'inline-block',
                                whiteSpace: 'nowrap',
                                border: `1px solid ${planet.color}`,
                                boxShadow: '0 0 10px rgba(0,0,0,0.5)'
                            }}>
                                {planet.name}
                            </div>
                        </Html>
                    </mesh>

                    {planet.rings && (
                        <mesh rotation-x={-Math.PI / 2}>
                            <ringGeometry args={[planet.rings.innerRadius, planet.rings.outerRadius, 64]} />
                            {/* Using Basic Material ensuring visibility regardless of light angle */}
                            <meshBasicMaterial
                                color={planet.rings.color}
                                opacity={0.8}
                                transparent
                                side={THREE.DoubleSide}
                                map={null} // Could add ring texture later
                            />
                        </mesh>
                    )}
                </group>
            </group>
        </group>
    );
};

export default Planet;
