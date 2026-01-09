import React, { useState } from 'react';
import Scene from './components/3d/Scene';
import Interface from './components/ui/Interface';

function App() {
  const [currentFocus, setCurrentFocus] = useState(null);
  const [zoomAction, setZoomAction] = useState(null);
  const [interactionDom, setInteractionDom] = useState(null);

  const handlePlanetSelect = (planet) => {
    setCurrentFocus(planet);
  };

  const handleZoom = (direction) => {
    setZoomAction({ direction, id: Date.now() });
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Scene
        currentFocus={currentFocus}
        onPlanetClick={handlePlanetSelect}
        zoomAction={zoomAction}
        interactionDom={interactionDom}
      />
      <Interface
        currentFocus={currentFocus}
        onPlanetSelect={handlePlanetSelect}
        onZoom={handleZoom}
        setInteractionDom={setInteractionDom}
      />
    </div>
  );
}

export default App;
