import { Avatar, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { FaMessage } from 'react-icons/fa6'
import Box from '@mui/material/Box'


const ProjectFooter = () => {
  return (
    <>
      <Box sx={{ padding: '50px 100px', backgroundColor: '#030211' }}>
        <Grid container spacing={10} sx={{}}>
          <Grid item xs={12} sm={4}>
            <img src="/images/footerLogo.png" alt="" style={{ width: '80px', height: '80px' }} />
            <Typography>Slide is the sole presentation-making website that enables you to seamlessly create and deliver presentations across all digital channels.</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <img src="/images/footerLogo.png" alt="" style={{ width: '80px', height: '80px' }} />
            <Typography>Slide is the sole presentation-making website that enables you to seamlessly create and deliver presentations across all digital channels.</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <img src="/images/footerLogo.png" alt="" style={{ width: '80px', height: '80px' }} />
            <Typography>Slide is the sole presentation-making website that enables you to seamlessly create and deliver presentations across all digital channels.</Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default ProjectFooter