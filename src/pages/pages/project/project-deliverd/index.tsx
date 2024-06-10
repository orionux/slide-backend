// ** React Imports
import { ReactNode, useEffect, useState } from 'react'


// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { Box, Button, Grid, Typography } from '@mui/material'
import NormalHeader from 'src/layouts/components/NormalHeader'
import ProjectHeader from 'src/views/projectComponents/projectHeader'
import ProjectFooter from 'src/views/projectComponents/projectFooter'
import Link from 'next/link'


const ProjectDeliverdView = () => {

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);


    const handleDownload = () => {
        if (isClient) {
            const link = document.createElement('a');
            link.href = '/presentations/Presentation 1.pptx';
            link.download = 'Presentation 1.pptx';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };



    return (
        <>
            <NormalHeader />
            <ProjectHeader />
            <Grid container spacing={5} sx={{ padding: "50px 50px", backgroundColor: '#FFFFFF' }}>
                <Grid item xs={12} sm={12} sx={{ backgroundColor: '#F2F5FF', borderRadius: "8px", padding: '30px 50px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography sx={{ color: '#011627', fontSize: '30px', fontWeight: 600, fontFamily: '"Syne", sans-serif !important;', mt: '50px' }} >Project Deliverd</Typography>
                    <Typography sx={{ color: '#263238', fontSize: '16px', fontWeight: 400, fontFamily: '"Syne", sans-serif !important;', mb: '50px' }} >Project delivered on 16 : 45 | 23rd June 2023</Typography>

                    <img src={'/presentations/Presentation 1 images/Presentation 1_page-0001.jpg'}  alt={'ppt image'} style={{ width: "auto", height: '450px', marginBottom: '50px', borderRadius: '20px', boxShadow: '0 0 5px 1px #cccccc' }} />

                </Grid>
                <Box sx={{ mt: '50px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <Link passHref href={'/pages/project/summery'}>
                        <Button sx={{
                            fontSize: '16px', color: '#fff', backgroundColor: '#455A64', '&:hover': {
                                backgroundColor: '#455A64'
                            }, fontFamily: '"Syne", sans-serif !important;', borderRadius: '8px', textTransform: 'uppercase', paddingLeft: '20px', paddingRight: '20px', margin: '0px 10px', minWidth: '250px'
                        }}>
                            Order Summary
                        </Button>
                    </Link>
                    <Link passHref href={'/pages/project/user-feedback-view'}>
                        <Button sx={{
                            fontSize: '16px', color: '#fff', backgroundColor: '#2D2D2EA9', '&:hover': {
                                backgroundColor: '#2D2D2E'
                            }, fontFamily: '"Syne", sans-serif !important;', borderRadius: '8px', textTransform: 'uppercase', paddingLeft: '20px', paddingRight: '20px', margin: '0px 10px', minWidth: '250px'
                        }}>
                            Request Review Again
                        </Button>
                    </Link>
                    {/* Provide a button to allow users to download the presentation */}
                    <Button
                        sx={{
                            fontSize: '16px', color: '#fff', backgroundColor: '#263238', '&:hover': {
                                backgroundColor: '#263238'
                            }, fontFamily: '"Syne", sans-serif !important;', borderRadius: '8px', textTransform: 'uppercase', paddingLeft: '20px', paddingRight: '20px', margin: '0px 10px', minWidth: '250px'
                        }}
                        onClick={handleDownload}
                    >
                        Agree & Download
                    </Button>
                </Box>
            </Grid>

            <ProjectFooter />
        </>
    )
}

ProjectDeliverdView.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default ProjectDeliverdView
