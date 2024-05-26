import { SetStateAction } from "react";
import { Node } from "reactflow";
import { v4 as uuidv4 } from 'uuid';


// node id generate
export const generateSlideId = () => `slide_${uuidv4()}`;
export const generateCommentId = () => `comment_${uuidv4()}`;


const processNode = {
    color: '#fff',
    borderColor: '#872341',
  };


export const addNode = async (type: string, setNodes: { (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (arg0: (prevNodes: any) => any[]): void; }) => {


    const newNodeId = generateCommentId();
    const newNode = {
      id: newNodeId,
      data: { label: `Comment ${newNodeId}` },
      position: {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      },
      type,
      style: processNode,
    };
  
    try {
      // Make API call to post the new node data
  
    //   console.log("new node data : ", newNode)
    //   const response = await fetch(`${apiUrl}/data-flow-insert-node`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(newNode), 
    //   });
  
    //   if (!response.ok) {
    //     throw new Error('Failed to add node');
    //   }
  
    //   console.log('response : ',response )
  
      setNodes((prevNodes: any) => {
        const updatedNodes = [...prevNodes, newNode];
        console.log('Updated Node List:', updatedNodes);

        return updatedNodes;
      });
    } catch (error) {
      console.error('Error adding node:', error);
    }
  };