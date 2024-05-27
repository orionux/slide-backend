import Image from 'next/image';
import React, { memo } from 'react';
import { IoIosCloseCircle } from "react-icons/io";
import { useReactFlow } from 'reactflow';


interface CommentProps {
    id: string;
  }

export default memo(({ id }: CommentProps) => {
    //   const { setNodes } = useReactFlow();
    const { setNodes } = useReactFlow();

    const onCommentDelete = () => {
        setNodes((nodes) => nodes.filter((node) => node.id !== id));
      };

    return (
        <>
            <div className="wrapper gradient">
                <div className="inner">
                    <>
                        <div className='commentWrapper'>
                           <div className='comment'>
                           <Image src={'/images/pin.png'} alt="Slide" width={25} height={30} className='' />
                           </div>
                           <div className='commentClose'>
                           <button onClick={onCommentDelete}>
                                <IoIosCloseCircle />
                            </button>
                           </div>
                           <textarea
                                className="nodrag"
                                placeholder='Add Your Comment'
                                style={{fontSize: '8px'}}
                            ></textarea>
                        </div>
                    </>
                </div>
            </div>
            {/* <Handle type="target" position={Position.Top} /> */}
        </>
    );
});
