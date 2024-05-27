/* eslint-disable @typescript-eslint/no-unused-vars */
// import React from 'react'
import React, { useCallback, useEffect, useRef } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import SlideComment from './SlideComment';

import 'reactflow/dist/style.css';
import '../../../../styles/overview.module.css';
import Image from 'next/image';
import { addNode } from 'src/services/flowNodeFunctions';
import { v4 as uuidv4 } from 'uuid';
import ImageElement from './ImageElement';
import {
  nodes as initialNodes,
  edges as initialEdges,
} from './initialElements';


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
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);


  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );


  console.log("nodes : ", nodes)


  const addTextNode = () => {
    addNode('comment', setNodes);
    console.log("added comment")
  };
  


  return (
    <>
      <button onClick={addTextNode} style={{ zIndex: '9999' }} className='d-flex flex-column border-0 bg-dark text-white rounded justify-content-center align-items-center p-2 mt-3 ms-3 position-absolute'>
        <Image src={'/images/pin.png'} alt="Slide" width={25} height={30} className='' />
        Add Comment
      </button>
      <div ref={reactFlowWrapper} style={{ width: '80vw', height: '500px' }}>

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
          zoomOnScroll={false}
          panOnDrag={false}
        >
          {/* <MiniMap  zoomable pannable /> */}
          {/* <Controls /> */}
          <Background />
        </ReactFlow>
      </div>
    </>
  );
};

export default OverviewFlow;