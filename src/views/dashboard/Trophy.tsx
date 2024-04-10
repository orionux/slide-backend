// ** MUI Imports
import Card from '@mui/material/Card'

// import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// import { styled, useTheme } from '@mui/material/styles'
import { Avatar, Grid } from '@mui/material'

// import UserIcon from 'src/layouts/components/UserIcon'

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


const Trophy = ({ title, number, icon, badge }) => {


  let badgeColor, badgeBackgroundColor;
  if (badge && badge.charAt(0) === '+') {
    // Positive badge
    badgeColor = '#B80202';
    badgeBackgroundColor = '#B802023c'; // Add transparency to color
  } else if (badge && badge.charAt(0) === '-') {
    // Negative badge
    badgeColor = '#0B6D4B';
    badgeBackgroundColor = '#0B6D4B3c'; // Add transparency to color
  }

  return (
    <Card sx={{ position: 'relative', borderRadius: '14px' }}>
      <CardContent>
        <Grid container spacing={6} sx={{ display: ' flex', flexDirection: 'row', alignItems: 'center' }}>
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
          {badge && ( // Render badge only if badge is provided and not empty
            <Grid item xs={12} md={4} sx={{ position: 'relative' }}>
              <span
                style={{
                  fontSize: '9px',
                  position: 'absolute',
                  right: '10px',
                  top: '10px',
                  color: badgeColor,
                  fontWeight: 500,
                  backgroundColor: badgeBackgroundColor,
                  padding: '4px 15px',
                  borderRadius: '30px'
                }}
              >{badge}</span>
              <Typography variant='h5' sx={{ my: 2, color: '#000 !important', fontSize: '30px !important', fontWeight: 600 }}>
                {number}
              </Typography>
            </Grid>
          )}
          {!badge && ( // Render number without badge if badge is not provided or empty
            <Grid item xs={12} md={4}>
              <Typography variant='h5' sx={{ my: 2, color: '#000 !important', fontSize: '30px !important', fontWeight: 600 }}>
                {number}
              </Typography>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Trophy
