import { Button, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import Box from '@mui/material/Box'
import Link from 'next/link'


const ProjectFooter = () => {
  return (
    <>
      <Box sx={{ padding: '50px 100px', backgroundColor: '#030211' }}>
        <Grid container spacing={10} sx={{paddingBottom: '20px'}}>
          <Grid item xs={12} sm={4}>
            <img src="/images/footerLogo.png" alt="" style={{ width: '80px', height: 'auto' }} />
            <Typography sx={{ color: '#8896AB', fontSize: '16px', fontFamily: '"Inter", sans-serif;', paddingTop: '20px', paddingRight: '20%' }}>Slide is the sole presentation-making website that enables you to seamlessly create and deliver presentations across all digital channels.</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid container spacing={5}>
              <Grid item xs={6}>
                <Typography sx={{ color: '#FFF', fontSize: '16px', fontFamily: '"Inter", sans-serif;', fontWeight: 700 }}>Product</Typography>
                <Link href={'#'} passHref>
                  <Typography sx={{ color: '#8896AB', fontSize: '16px', fontFamily: '"Inter", sans-serif;', paddingTop: '10px' }}>
                    Features
                  </Typography>
                </Link>
                <Link href={'#'} passHref>
                  <Typography sx={{ color: '#8896AB', fontSize: '16px', fontFamily: '"Inter", sans-serif;', paddingTop: '10px' }}>
                    Solutions
                  </Typography>
                </Link>
                <Link href={'#'} passHref>
                  <Typography sx={{ color: '#8896AB', fontSize: '16px', fontFamily: '"Inter", sans-serif;', paddingTop: '10px' }}>
                    Pricing
                  </Typography>
                </Link>
                <Link href={'#'} passHref>
                  <Typography sx={{ color: '#8896AB', fontSize: '16px', fontFamily: '"Inter", sans-serif;', paddingTop: '10px' }}>
                    Tutorials
                  </Typography>
                </Link>
                <Link href={'#'} passHref>
                  <Typography sx={{ color: '#8896AB', fontSize: '16px', fontFamily: '"Inter", sans-serif;', paddingTop: '10px' }}>
                    Updates
                  </Typography>
                </Link>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ color: '#FFF', fontSize: '16px', fontFamily: '"Inter", sans-serif;', fontWeight: 700 }}>Remaining</Typography>
                <Link href={'#'} passHref>
                  <Typography sx={{ color: '#8896AB', fontSize: '16px', fontFamily: '"Inter", sans-serif;', paddingTop: '10px' }}>
                    Blog
                  </Typography>
                </Link>
                <Link href={'#'} passHref>
                  <Typography sx={{ color: '#8896AB', fontSize: '16px', fontFamily: '"Inter", sans-serif;', paddingTop: '10px' }}>
                    Newsletter
                  </Typography>
                </Link>
                <Link href={'#'} passHref>
                  <Typography sx={{ color: '#8896AB', fontSize: '16px', fontFamily: '"Inter", sans-serif;', paddingTop: '10px' }}>
                    Help Centre
                  </Typography>
                </Link>
                <Link href={'#'} passHref>
                  <Typography sx={{ color: '#8896AB', fontSize: '16px', fontFamily: '"Inter", sans-serif;', paddingTop: '10px' }}>
                    Careers
                  </Typography>
                </Link>
                <Link href={'#'} passHref>
                  <Typography sx={{ color: '#8896AB', fontSize: '16px', fontFamily: '"Inter", sans-serif;', paddingTop: '10px' }}>
                    Support
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4}>
          <Typography sx={{ color: '#FFF', fontSize: '16px', fontFamily: '"Inter", sans-serif;', fontWeight: 700 }}>Newsletter</Typography>
          <Box sx={{display: 'flex', flexDirection: 'row', marginTop: '20px'}}>
            <TextField type="text" placeholder='pat@shuffle.dev' sx={{
              backgroundColor: '#fff',
              color: '#2A3342',
              borderRadius: '10px',
              '&::placeholder':{
                color: "#5836B6"
              },
              height: '50px',
              lineHeight: '26px',
              fontSize: '16px',
              marginRight: '10px'
            }} />
            <Button sx={{color: "#fff", backgroundColor: "#5836B6", height: '50px',borderRadius: '10px'}}>Subscribe</Button>
          </Box>
          </Grid>
        </Grid>
        <Box sx={{
          display: 'flex', 
          flexDirection: 'row', 
          marginTop: '20px',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop:' 50px',
          paddingBottom: '0px',
          borderTop: 'solid 1px #8896AB'
          }}>
<Typography sx={{ color: '#8896AB', fontSize: '16px', fontFamily: '"Inter", sans-serif;'}}>© 2023 Orion UX. All rights reserved.</Typography>
        </Box>
      </Box>
    </>
  )
}

export default ProjectFooter