// ** React Imports
import { MouseEvent, ReactNode, useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Icons Imports
import Google from 'mdi-material-ui/Google'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
// import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'


import { authenticateUser } from 'src/utils/authUtils'
import { Grid } from '@mui/material'


// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginPage = () => {
  // ** State
  // const [values, setValues] = useState<State>({
  //   password: '',
  //   showPassword: false
  // })

  const [showPassword, setShowPassword] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

  // ** Hook
  // const theme = useTheme()
  const router = useRouter()

  const handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (prop === 'password') {
      setPassword(event.target.value);
    } else if (prop === 'email') {
      setUserEmail(event.target.value);
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };





  const handleLogin = () => {
    const userType = authenticateUser(userEmail, password);
    if (userType) {
      router.push(`/`);
    } else {
      alert('Invalid username or password');
    }
  };


  return (
    <Box className='content-center' sx={{
      backgroundImage: "url('/images/cards/loginBg.png')",
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }}>

      <Grid container spacing={5}>
        <Grid item xs={12} sm={6} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Box sx={{ mb: 6, textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
          <img src="/images/slide-logo.png" alt="Slide Logo" style={{ width: "100px", height: 'auto'}} />
            <Typography variant='body2' sx={{ color: '#455A64', fontSize: '20px', fontFamily: '"Syne", sans-serif'}}>
            We make extraordinary <br></br> Look and feel to your <br></br> presentaion 
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card sx={{ zIndex: 1, display: 'flex', flexDirection: 'row', borderRadius: '20px' }}>
            <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
              <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography
                  variant='h6'
                  sx={{
                    ml: 3,
                    lineHeight: 1,
                    fontWeight: 600,
                    color: '#030211',
                    fontSize: '45px !important',
                    fontFamily: '"Syne", sans-serif',
                  }}
                >
                  Log <span style={{ backgroundColor: '#030211', color: '#fff', paddingLeft: '20px', paddingRight: '20px' }}>In</span>
                </Typography>
              </Box>
              <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Typography variant='body2' sx={{ color: '#333333', fontSize: '16px', fontFamily: '"Inter", sans-serif;' }}>To connect with us..</Typography>
              </Box>
              <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
                <TextField
                  autoFocus
                  fullWidth
                  id='email'
                  label='Email'
                  sx={{
                    marginBottom: 4,
                    color: '#5A5A5A',
                  }}
                  value={userEmail}
                  onChange={handleChange('email')}
                />
                <FormControl fullWidth>
                  <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
                  <OutlinedInput
                    label='Password'
                    value={password}
                    id='auth-login-password'
                    onChange={handleChange('password')}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          aria-label='toggle password visibility'
                        >
                          {showPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Box
                  sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
                >
                  <FormControlLabel control={<Checkbox />} label='Remember Me' />
                  <Link passHref href='/'>
                    <LinkStyled onClick={e => e.preventDefault()}>Forgot Password?</LinkStyled>
                  </Link>
                </Box>
                <Button
                  fullWidth
                  size='large'
                  variant='contained'
                  sx={{
                    marginBottom: 7,
                    backgroundColor: '#404040',
                    color: '#fff',

                  }}
                  onClick={handleLogin}
                >
                  Login
                </Button>

                <Divider sx={{ my: 5 }}>or</Divider>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Link href='/' passHref>
                    <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                      <Google sx={{ color: '#db4437' }} />
                    </IconButton>
                  </Link>
                  <Link href='/' passHref>
                    <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                      <Facebook sx={{ color: '#497ce2' }} />
                    </IconButton>
                  </Link>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <Typography variant='body2'>
                    <Link passHref href='/pages/register'>
                      <LinkStyled sx={{ color: '#404040', textDecoration: 'underline' }}>Dont you have an Account</LinkStyled>
                    </Link>
                  </Typography>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>


      {/* <FooterIllustrationsV1 /> */}
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginPage
