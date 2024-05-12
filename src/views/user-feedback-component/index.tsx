import { useState } from 'react';


type ButtonProps = {
    id: string;
    left: number;
    top: number;
    type: string;
  };


const FeedbackComponent: React.FC<ButtonProps> = ({ id, left, top, type }) => {
    

    // const [, drag] = useDrag({
    //     item: { id, left, top, type },
    //     collect: (monitor) => ({
    //       isDragging: monitor.isDragging(),
    //     }),
    //   });
    
    // const handleDragStart = (e) => {
    //     e.dataTransfer.setData('text/plain', ''); // Required for Firefox
    //     const offsetX = e.clientX - e.target.getBoundingClientRect().left;
    //     const offsetY = e.clientY - e.target.getBoundingClientRect().top;
    //     e.dataTransfer.setData('offsetX', offsetX);
    //     e.dataTransfer.setData('offsetY', offsetY);
    //     if (onDragStart) onDragStart(e);
    // };

    // const handleDragOver = (e) => {
    //     e.preventDefault();
    // };

    // const handleDrop = (e) => {
    //     e.preventDefault();
    //     const offsetX = e.clientX - e.dataTransfer.getData('offsetX');
    //     const offsetY = e.clientY - e.dataTransfer.getData('offsetY');
    //     e.target.style.position = 'absolute';
    //     e.target.style.left = offsetX + 'px';
    //     e.target.style.top = offsetY + 'px';
    //     console.log('FeedbackComponent position:', { x: offsetX, y: offsetY });
    // };

    return (
        <div
            className="feedback-container"
            style={{ position: 'absolute', left, top }}
        >
            <div className='pinWrapper'>
                <img src={'/images/pin.png'} alt={'ppt image'} style={{ width: "auto", height: '30px', marginBottom: '0px' }} />
            </div>
            <div className="inputWrapper">
                <input type="text" name='comment' placeholder='add your comment' />
            </div>
        </div>
    );
};

export default FeedbackComponent;
