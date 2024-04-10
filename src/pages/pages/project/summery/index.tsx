// ** React Imports
import { ReactNode } from 'react'

// ** Next Imports

// ** MUI Components
import Box from '@mui/material/Box'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { Typography } from '@mui/material'



const SummeryPage = () => {
 


  return (
    <Box className='content-center' sx={{
      backgroundColor: '#fff'
    }}>
      <Typography>Summery</Typography>
    </Box>
  )
}

SummeryPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default SummeryPage
