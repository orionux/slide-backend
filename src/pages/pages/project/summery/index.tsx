// ** React Imports
import { ReactNode } from 'react'


// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { Box, Button, Grid, Typography } from '@mui/material'
import NormalHeader from 'src/layouts/components/NormalHeader'
import ProjectHeader from 'src/views/projectComponents/projectHeader'


const projectImages = [
  {
    imgId: 1,
    imgPath: '/images/projects/Image 01.png',
    imgDescription: 'Project 1'
  },
  {
    imgId: 1,
    imgPath: '/images/projects/Image 02.png',
    imgDescription: 'Project 2'
  },
  {
    imgId: 1,
    imgPath: '/images/projects/Image 03.png',
    imgDescription: 'Project 3'
  },
  {
    imgId: 1,
    imgPath: '/images/projects/Image 04.png',
    imgDescription: 'Project 4'
  },
  {
    imgId: 1,
    imgPath: '/images/projects/Image 05.png',
    imgDescription: 'Project 5'
  },
  {
    imgId: 1,
    imgPath: '/images/projects/Rectangle 6.png',
    imgDescription: 'Project 6'
  }
]

const SummeryPage = () => {



  return (
    <>
      <NormalHeader />
      <ProjectHeader />
      <Grid container spacing={5} sx={{ padding: "30px 50px", backgroundColor: '#FFFFFF' }}>
        <Grid item xs={12} sm={6} sx={{ backgroundColor: '#FFFFFF', borderRadius: "8px", padding: '30px' }}>
          <Typography sx={{ color: '#011627', fontSize: '30px', fontWeight: 600,  fontFamily: '"Syne", sans-serif !important;'  }} >Project Summery</Typography>
          <Typography sx={{ color: '#263238', fontSize: '16px', fontWeight: 400,  fontFamily: '"Syne", sans-serif !important;' }} >Project delivered on 16 : 45 | 23rd June 2023</Typography>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ backgroundColor: '#F2F5FF', borderRadius: "8px", padding: '30px' }}>
          <Typography sx={{ color: '#011627', fontSize: '30px', fontWeight: 600, fontFamily: '"Syne", sans-serif !important;' }} >Project Resources</Typography>
          <Typography sx={{ color: '#263238', fontSize: '16px', fontWeight: 400, fontFamily: '"Syne", sans-serif !important;'  }} >Lorem ipsum dolor sit amet consectetur. Pharetra consequat nec nisl at tempor vel pellentesque nunc.</Typography>

          <Grid item container spacing={2} style={{ paddingBottom: '40px', paddingTop: '40px' }}>
            {
              projectImages.map((project) => (
                <>
                  <Grid key={project.imgId} item xs={12} sm={4} sx={{ borderRadius: "8px", justifyContent: 'center', alignItems: 'center' }}>
                    <img src={project.imgPath} alt={project.imgDescription} style={{ width: "100%", height: 'auto' }} />
                  </Grid>
                </>
              ))
            }

          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItem: 'center' }}>
            <Button sx={{ fontSize: '16px', color: '#fff', backgroundColor: '#2D2D2E',  fontFamily: '"Syne", sans-serif !important;' , borderRadius: '8px', textTransform: 'uppercase', paddingLeft: '20px', paddingRight: '20px' }}>
              request more
            </Button>
          </Box>


        </Grid>


      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItem: 'center' }}>
        <Button sx={{ fontSize: '16px', color: '#fff', backgroundColor: '#2D2D2E', fontFamily: '"Syne", sans-serif !important;' , borderRadius: '8px', textTransform: 'uppercase', paddingLeft: '20px', paddingRight: '20px' }}>
          Start Now
        </Button>
      </Box>
    </>
  )
}

SummeryPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default SummeryPage
