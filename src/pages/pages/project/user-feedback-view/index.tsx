// ** React Imports
import { ReactNode, useState } from 'react'


// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import NormalHeader from 'src/layouts/components/NormalHeader'
import ProjectHeader from 'src/views/projectComponents/projectHeader'
import ProjectFooter from 'src/views/projectComponents/projectFooter'
import Link from 'next/link'
import Image from 'next/image';
import { Box, Button, Grid, Typography } from '@mui/material'



const UserFeedbackView = ({ }) => {

    const carouselData = [
        { image: '/presentations/Presentation 1 images/Presentation 1_page-0001.jpg' },
        { image: '/presentations/Presentation 1 images/Presentation 1_page-0002.jpg' },
        { image: '/presentations/Presentation 1 images/Presentation 1_page-0003.jpg' },
        { image: '/presentations/Presentation 1 images/Presentation 1_page-0004.jpg' },
        { image: '/presentations/Presentation 1 images/Presentation 1_page-0005.jpg' },
        { image: '/presentations/Presentation 1 images/Presentation 1_page-0006.jpg' },
        { image: '/presentations/Presentation 1 images/Presentation 1_page-0007.jpg' },
        { image: '/presentations/Presentation 1 images/Presentation 1_page-0008.jpg' },
        { image: '/presentations/Presentation 1 images/Presentation 1_page-0009.jpg' },
        { image: '/presentations/Presentation 1 images/Presentation 1_page-00010.jpg' }
    ];

    const [currentImg, setCurrentImg] = useState(0);

    const handlePrevSlide = () => {
        setCurrentImg((prev) => (prev === 0 ? carouselData.length - 1 : prev - 1));
    };

    const handleNextSlide = () => {
        setCurrentImg((prev) => (prev + 1) % carouselData.length);
    };


    return (
        <>
            <NormalHeader />
            <ProjectHeader />
            <Grid container spacing={5} sx={{ padding: "50px 50px", backgroundColor: '#FFFFFF' }}>
                <Grid item xs={12} sm={12} sx={{ backgroundColor: '#F2F5FF', borderRadius: "8px", padding: '30px 50px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography sx={{ color: '#011627', fontSize: '30px', fontWeight: 600, fontFamily: '"Syne", sans-serif !important;', mt: '50px' }} >Feedback Area</Typography>
                    <Typography sx={{ color: '#263238', fontSize: '16px', fontWeight: 400, fontFamily: '"Syne", sans-serif !important;', mb: '50px' }} >Drag the pin or click on area which you need to add comment</Typography>

                    {/* <img src={'/images/projects/Slide 06.png'} alt={'ppt image'} style={{ width: "auto", height: '450px', marginBottom: '50px' }} /> */}

                    <div>

                        <div id="carouselExampleIndicators" className="carousel carousel-fade" data-bs-ride="carousel">
                            <div className="carousel-inner">
                            {carouselData.map((item, index) => (
                                    <div key={index} className={`carousel-item ${index === currentImg ? 'active' : ''}`}>
                                        <Image src={item.image} alt={`Slide ${index + 1}`} className="d-block w-100 sliderImgStyles" width={800} height={400} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="slideNumbers">
                            <button onClick={handlePrevSlide}>&#10094; Previous Page</button>  
                            <span>{currentImg + 1} / {carouselData.length} </span>
                            <button onClick={handleNextSlide}>Next Page &#10095;</button>
                        </div>


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
