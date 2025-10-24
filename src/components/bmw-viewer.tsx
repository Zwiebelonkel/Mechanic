
/* eslint-disable */
'use client';

import React from 'react';

const BmwViewer = () => {
  return (
    <model-viewer
      src="/models/bmw_m5.glb"
      alt="A 3D model of a BMW M5"
      ar
      ar-modes="webxr scene-viewer quick-look"
      camera-controls
      auto-rotate
      shadow-intensity="1"
      environment-image="/images/garage.jpg"
      disable-zoom
      disable-pan
      style={{ width: '100%', height: '400px' }}
      field-of-view="15deg"
    ></model-viewer>
  );
};


export default BmwViewer;

    
