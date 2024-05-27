import Image from 'next/image';
import React, { memo } from 'react';


export default memo(( ) => {

    //   const { setNodes } = useReactFlow();



    return (
        <>
            <div className="wrapper gradient">
                <div className="inner nodrag">
                    <>
                        <Image src={'/presentations/Presentation 1 images/Presentation 1_page-0001.jpg'} alt="Slide" width={800} height={450} className='slideImage' />
                    </>
                </div>
            </div>
        </>
    );
});
