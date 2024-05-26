import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react'


interface StepPaymentsProps {
    formData: any;
}

const Successfull: React.FC<StepPaymentsProps> = ({ formData = {} }) => {






    // In your Next.js page or component
    const postData = async () => {
        console.log("added form data : ", formData)
        try {
            const response = await fetch('/api/createNewPackage', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    // Usage
    postData();



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
                    <Link passHref href="/orders">
                        <Button sx={{
                            backgroundColor: '#57EBB7',
                            color: '#455A64',
                            width: '150px',
                            textTransform: 'capitalize !important',
                            marginRight: '10px',
                            '&:hover': {
                                backgroundColor: '#455A64',
                                color: '#57EBB7',
                            }
                        }} >See your order</Button>
                    </Link>
                </Box>

            </Box>
        </>
    )
}


export default Successfull