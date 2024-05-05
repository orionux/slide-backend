import { Box, Typography } from '@mui/material';
import React from 'react'


interface StepPaymentsProps {
    formData: any;
}

const Successfull: React.FC<StepPaymentsProps> = ({ formData = {} }) => {

    


    console.log(formData)

    return (
        <>
            <Box
                sx={{
                    backgroundColor: '#fff',
                    padding: '100px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center'
                }}
            >
                <Box
                    sx={{
                        marginBottom: '80px',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}
                >
                    <Typography
                        sx={{
                            color: '#000',
                            fontFamily: '"Syne", sans-serif !important;',
                            fontSize: '22px',
                            fontWeight: 600,
                            textAlign: 'center',
                            mb: '15px'
                        }}
                    >
                        Payment Successful.! 
                    </Typography>
                </Box>

            </Box>
        </>
    )
}


export default Successfull