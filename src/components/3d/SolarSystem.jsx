import React from 'react';
import { planetData } from '../../data/planetData';
import Planet from './Planet';
import Sun from './Sun';

const SolarSystem = ({ currentFocus, onPlanetClick, registerRef }) => {
    return (
        <group>
            <Sun
                radius={planetData[0].radius}
                registerRef={registerRef}
                // Show sun if NO focus, OR if focus IS the Sun
                visible={!currentFocus || currentFocus.name === 'Sun'}
            />

            {planetData.slice(1).map((planet) => {
                // If focused, only the focused planet is visible
                const isVisible = !currentFocus || currentFocus.name === planet.name;
                // Note: We render ALL of them to preserve their Orbit/Rotation state (refs),
                // simply hiding the ones we don't want to see.

                return (
                    <Planet
                        key={planet.name}
                        planet={planet}
                        onPlanetClick={onPlanetClick}
                        isSelected={currentFocus?.name === planet.name}
                        registerRef={registerRef}
                        isPaused={!!currentFocus} // Pause all orbits if anyone is focused
                        visible={isVisible}
                    />
                );
            })}
        </group>
    );
};

export default SolarSystem;
