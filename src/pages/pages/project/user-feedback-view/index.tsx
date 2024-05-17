/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { Key, ReactChild, ReactFragment, ReactNode, ReactPortal, useState } from 'react'


// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import NormalHeader from 'src/layouts/components/NormalHeader'
import ProjectHeader from 'src/views/projectComponents/projectHeader'
import ProjectFooter from 'src/views/projectComponents/projectFooter'
import Link from 'next/link'
import Image from 'next/image';
import { Box, Button, Grid, Typography } from '@mui/material'
import { BorderRadius } from 'mdi-material-ui'



const UserFeedbackView = () => {


    const [image, setImage] = useState("/presentations/Presentation 1 images/Presentation 1_page-0001.jpg")
    
    // const [comment, setComment] = useState('')


    const handlePrevSlide = () => {
        console.log("prev slide")
    };

    const handleNextSlide = () => {
        console.log("next slide")
    };

    return (
        <>
            <NormalHeader />
            <ProjectHeader />
            <Grid container spacing={5} sx={{ padding: "50px 50px", backgroundColor: '#FFFFFF' }}>
                <Grid item xs={12} sm={12} sx={{ backgroundColor: '#F2F5FF', borderRadius: "8px", padding: '30px 50px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: "relative" }}>
                    <Typography sx={{ color: '#011627', fontSize: '30px', fontWeight: 600, fontFamily: '"Syne", sans-serif !important;', mt: '50px' }} >Feedback Area</Typography>
                    <Typography sx={{ color: '#263238', fontSize: '16px', fontWeight: 400, fontFamily: '"Syne", sans-serif !important;', mb: '50px' }} >Drag the pin or click on area which you need to add comment</Typography>
                    <div style={{ position: 'relative' }}>
                        <Image src={image} alt="Slide" width={800} height={450} className='slideImage' />
                    </div>
                    <div className='sliderButtonWrapper'>
                        <button onClick={handlePrevSlide}>&#10094; Previous Slide</button>
                        <span>1/2</span>
                        <button onClick={handleNextSlide}>Next Slide &#10095;</button>
                    </div>
                </Grid>
                <Box sx={{ mt: '50px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <Link passHref href={'/pages/project/upload-project'}>
                        <Button sx={{
                            fontSize: '16px', color: '#fff', backgroundColor: '#2D2D2EA9', '&:hover': {
                                backgroundColor: '#2D2D2E'
                            }, fontFamily: '"Syne", sans-serif !important;', borderRadius: '8px', textTransform: 'uppercase', paddingLeft: '20px', paddingRight: '20px', margin: '0px 10px', minWidth: '250px'
                        }}>
                            Submit Feedback
                        </Button>
                    </Link>
                </Box>
            </Grid>
            <ProjectFooter />
        </>
    )
}

UserFeedbackView.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default UserFeedbackView
