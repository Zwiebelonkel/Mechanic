
/* eslint-disable */
'use client';

import React from 'react';

const BriefViewer = () => {
  return (
<model-viewer
  src="/models/brief.glb"
  alt="A 3D model of a letter"
  auto-rotate
  camera-controls
  shadow-intensity="0"
  environment-image="/images/garage.jpg"
  style={{ width: '100%', height: '100%', minHeight: '400px' }}
></model-viewer>

  );
};

export default BriefViewer;
