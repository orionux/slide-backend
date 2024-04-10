import { Box, Button, styled } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'


const StyledLink = styled('a')({
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none'
})

const NormalHeader = () => {
    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 50px', width: '100%', backgroundColor: '#fff' }}>

                <Box sx={{ width: '100%', borderBottom: 'solid 1px #C2C2C2', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '20px' }}>
                    <Link href='/' passHref>
                        <StyledLink>
                            <img src="/images/slide-logo.png" alt="Slide Logo" style={{ width: "50px", height: 'auto' }} />
                        </StyledLink>
                    </Link>
                    <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
                        <NotificationDropdown />
                        <Link passHref href="#" >
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
                            }} >Start Now</Button>
                        </Link>
                        <Link passHref href="#">
                            <Button sx={{
                                backgroundColor: '#fff',
                                width: '150px',
                                color: '#455A64',
                                textTransform: 'capitalize !important',
                                border: 'solid 1px #455A64',
                                '&:hover': {
                                    backgroundColor: '#455A64',
                                    color: '#fff',
                                }
                            }} >User Account</Button>
                        </Link>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default NormalHeader