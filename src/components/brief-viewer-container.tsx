'use client';

import dynamic from 'next/dynamic';

const BriefViewer = dynamic(() => import('@/components/brief-viewer'), { ssr: false });

const BriefViewerContainer = () => {
  return <BriefViewer />;
};

export default BriefViewerContainer;
