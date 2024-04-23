import { Typography } from '@mui/material';
import React from 'react';

interface StepsIndicatorProps {
    totalSteps: number;
    currentStep: number;
    titles: string[];
}

const StepsIndicator: React.FC<StepsIndicatorProps> = ({
    totalSteps,
    currentStep,
    titles
}) => {
    return (
        <>
             <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'start'}}>
                {Array.from({ length: totalSteps }, (_, index) => (
                    <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 10px', position: 'relative', width: '160px' }}>
                        <Typography
                            sx={{
                                fontFamily: '"Syne", sans-serif !important;',
                                fontSize: '15px',
                                fontWeight: 600,
                                color:
                                    index + 1 === currentStep ? '#000000' : index + 1 < currentStep ? '#000000' : '#D9D9D9',
                            }}
                        >
                            {titles[index]}
                        </Typography>
                        <div
                            style={{
                                width: '10px',
                                height: '10px',
                                backgroundColor:
                                    index + 1 === currentStep
                                        ? '#11D993'
                                        : index + 1 < currentStep
                                            ? '#11D993'
                                            : '#D9D9D9',
                                borderRadius: '50%',
                                margin: '0 5px',
                                zIndex: 7
                            }}
                        ></div>
                        {index < totalSteps - 1 && (
                            <div
                                style={{
                                    width: 'calc(100% - 0px)', 
                                    height: '2px', 
                                    backgroundColor:
                                        index + 1 < currentStep ? '#11D993' : '#D9D9D9', 
                                    position: 'absolute',
                                    bottom: '14px',
                                    left: '50%',
                                    zIndex: 5
                                }}
                            ></div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default StepsIndicator;
