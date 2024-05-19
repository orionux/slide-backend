/* eslint-disable @typescript-eslint/no-unused-vars */
// import React from 'react'
import React, { useCallback } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import SlideComment from './SlideComment';

import {
  nodes as initialNodes,
  edges as initialEdges,
} from './initialElements';

import 'reactflow/dist/style.css';
import '../../../../styles/overview.module.css';
import ImageElement from './ImageElement';


const nodeTypes = {
    comment: SlideComment,
    slideImage: ImageElement,
  };
  
  const edgeTypes = {
    // button: ButtonEdge,
  };
  
  const nodeClassName = (node: { type: any; }) => node.type;

  
  const OverviewFlow = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = useCallback(
      (params) => setEdges((eds) => addEdge(params, eds)),
      [],
    );
  
    return (
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        attributionPosition="top-right"
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        className="overview"
      >
        <MiniMap zoomable pannable nodeClassName={nodeClassName} />
        <Controls />
        <Background />
      </ReactFlow>
    );
  };
  
  export default OverviewFlow;