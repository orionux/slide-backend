// ** MUI Imports
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

const SubAdminView = () => {
  return (
    <Card>
      <CardMedia sx={{ height: '14.5625rem' }} image='/images/admin/sub-admin-avatar.png' />
      <CardContent>
        <Typography variant='h6' sx={{ marginBottom: 2 }}>
          Full Name
        </Typography>
        <Typography variant='body2'>
          Cancun is back, better than ever! Over a hundred Mexico resorts have reopened and the state tourism minister
          predicts Cancun will draw as many visitors in 2006 as it did two years ago.
        </Typography>
      </CardContent>
    </Card>
  )
}

export default SubAdminView
