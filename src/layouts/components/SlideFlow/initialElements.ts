/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { MarkerType } from 'reactflow';

export const nodes = [
  {
    id: '2',
    type: 'slideImage',
    position: { x: 10, y: 10 },
    data: {
      label: '/presentations/Presentation 1 images/Presentation 1_page-0001.jpg',
    },
    style: {
      width: '380px',
      height: '180px',
    }
  }
];

export const edges = [
  {
    id: 'e1-2',
    source: '1-1',
    target: '1-2',
    label: 'edge',
    type: 'smoothstep',
  },
  {
    id: 'e1-3',
    source: '1-1',
    target: '1-3',
    animated: true,
    label: 'animated edge',
  }
];
