'use client';

import dynamic from 'next/dynamic';

const BmwViewer = dynamic(() => import('@/components/bmw-viewer'), { ssr: false });

const ModelViewerContainer = () => {
  return <BmwViewer />;
};

export default ModelViewerContainer;
