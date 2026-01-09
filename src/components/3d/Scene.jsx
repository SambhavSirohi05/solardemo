import React, { Suspense, useRef, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import SolarSystem from './SolarSystem';
import PlanetInspector from './PlanetInspector';


const Scene = ({ currentFocus, onPlanetClick, zoomAction, interactionDom }) => {
    const planetRefs = useRef({});
    const controlsRef = useRef();

    const registerRef = useCallback((name, ref) => {
        planetRefs.current[name] = ref;
    }, []);

    // Handle Zoom Actions
    React.useEffect(() => {
        if (zoomAction && controlsRef.current) {
            const ZOOM_FACTOR = 1.2;

            if (zoomAction.direction === 'in') {
                controlsRef.current.dollyOut(ZOOM_FACTOR);
            } else {
                controlsRef.current.dollyIn(ZOOM_FACTOR);
            }
            controlsRef.current.update();
        }
    }, [zoomAction]);

    return (
        <Canvas camera={{ position: [0, 50, 150], fov: 60 }} style={{ height: '100vh', width: '100vw', background: 'black' }}>
            <Suspense fallback={null}>

                {/* MODE SWITCHING */}
                {!currentFocus ? (
                    // --- MODE: SOLAR SYSTEM OVERVIEW ---
                    <>
                        <Stars radius={300} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
                        <ambientLight intensity={0.4} />
                        <hemisphereLight intensity={0.3} groundColor="#000000" color="#444444" />
                        <pointLight position={[0, 0, 0]} intensity={2} distance={500} decay={1} />

                        <SolarSystem
                            currentFocus={null} // Always null loop in this mode
                            onPlanetClick={onPlanetClick}
                            registerRef={registerRef}
                        />

                        {/* Free Camera for System View */}
                        <OrbitControls
                            ref={controlsRef}
                            enablePan={true}
                            enableZoom={true}
                            enableRotate={true}
                            maxDistance={800}
                            minDistance={20}
                        />
                    </>
                ) : (
                    // --- MODE: PLANET INSPECTOR ---
                    <PlanetInspector
                        planet={currentFocus}
                        interactionDom={interactionDom}
                    />
                )}

            </Suspense>
        </Canvas>
    );
};

export default Scene;
