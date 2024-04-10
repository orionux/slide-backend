// ** React Imports
import { ReactNode } from 'react'

// ** Next Imports

// ** MUI Components
import Box from '@mui/material/Box'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { Avatar, Button, Grid, Typography } from '@mui/material'
import NormalHeader from 'src/layouts/components/NormalHeader'
import { FaMessage } from 'react-icons/fa6'



const SummeryPage = () => {



  return (
    <>
      <NormalHeader />
      <Grid container spacing={5}>
        <Grid item xs={12} sm={12}>
          <Box
            sx={{
              backgroundColor: '#fff',
              padding: '50px 50px 100px 50px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItem: 'start',
            }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItem: 'center' }}>
              <Avatar>
                <img src="/images/admin/Avatar.png" alt="" style={{ width: '80px', height: '80px', borderRadius: '100%' }} />
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItem: 'center' }}>
                <Typography>Project Name Here</Typography>
                <Typography>Order #37689</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItem: 'center' }}>
              <Button ><FaMessage /> Back to chat</Button>
            </Box>
          </Box>
        </Grid>

      </Grid>
    </>
  )
}

SummeryPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default SummeryPage
