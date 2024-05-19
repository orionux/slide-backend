import Image from 'next/image';
import React, { memo } from 'react';
import { IoIosCloseCircle } from "react-icons/io";



export default memo(({ id }) => {
    //   const { setNodes } = useReactFlow();

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
                           <button>
                                <IoIosCloseCircle />
                            </button>
                           </div>
                           <input
                                type="text"
                                className="nodrag"
                                placeholder='Add Your Comment'
                            />
                        </div>
                    </>
                </div>
            </div>
            {/* <Handle type="target" position={Position.Top} /> */}
        </>
    );
});
