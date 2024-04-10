// ** MUI Imports
import Card from '@mui/material/Card'

// import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// import { styled, useTheme } from '@mui/material/styles'
import { Avatar, Grid } from '@mui/material'

// import UserIcon from 'src/layouts/components/UserIcon'
import { TrendingUp } from 'mdi-material-ui'

// Styled component for the triangle shaped background image
// const TriangleImg = styled('img')({
//   right: 0,
//   bottom: 0,
//   height: 170,
//   position: 'absolute'
// })

// Styled component for the trophy image
// const TrophyImg = styled('img')({
//   right: 36,
//   bottom: 20,
//   height: 98,
//   position: 'absolute'
// })

const Trophy = ({ title , number, icon }) => {
  // ** Hook
  // const theme = useTheme()

  // const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'


  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Grid container spacing={6} sx={{display:' flex', flexDirection: 'row', alignItems:'center'}}>
          <Grid item xs={12} md={2}>
            <Avatar
              variant='rounded'
              sx={{
                mr: 3,
                width: 44,
                height: 44,
                boxShadow: 3,
                color: 'common.white',
                backgroundColor: `#29C6B7`
              }}
            >
              {icon}
            </Avatar>

          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant='h6' sx={{ my: 2, color: '#000 !important', fontSize: '15px !important', fontWeight: 600 }}>
            {title}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant='h5' sx={{ my: 2, color: '#000 !important', fontSize: '30px !important', fontWeight: 600 }}>
            {number}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Trophy
