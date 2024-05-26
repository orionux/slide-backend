// ** React Imports
import { useState, Fragment, ChangeEvent, MouseEvent, ReactNode } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
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
import { Grid } from '@mui/material'

interface State {
  password: string
  showPassword: boolean
}

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
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const RegisterPage = () => {
  // ** States
  const [values, setValues] = useState({
    fullname: '',
    mobile_number: '',
    email: '',
    password: '',
    showPassword: false,
    confirmPassword: false,
    agreeToTerms: false,
  });

  // ** Hook

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }


  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const formData = {
      fullname: values.fullname,
      mobile_number: values.mobile_number,
      email: values.email,
      password: values.password,
      agreeToTerms: values.agreeToTerms,
    };

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Registration successful:', data);
    } else {
      const errorData = await response.json();
      console.error('Registration error:', errorData);
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
        <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ mb: 6, textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
            <img src="/images/slide-logo.png" alt="Slide Logo" style={{ width: "100px", height: 'auto' }} />
            <Typography variant='body2' sx={{ color: '#455A64', fontSize: '20px', fontFamily: '"Syne", sans-serif' }}>
              We make extraordinary <br></br> Look and feel to your <br></br> presentaion
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card sx={{ zIndex: 1, borderRadius: '20px' }}>
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
                  Regi<span style={{ backgroundColor: '#030211', color: '#fff' }}>ster</span>
                </Typography>
              </Box>
              <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
                <TextField autoFocus fullWidth id='fullname' label='Fullname' sx={{ marginBottom: 4 }} />
                <TextField autoFocus fullWidth id='mobile_number' label='Mobile Number' sx={{ marginBottom: 4 }} />
                <TextField fullWidth type='email' label='Email' sx={{ marginBottom: 4 }} />
                <FormControl fullWidth>
                  <InputLabel htmlFor='auth-register-password'>Password</InputLabel>
                  <OutlinedInput
                    label='Password'
                    value={values.password}
                    id='auth-register-password'
                    onChange={handleChange('password')}
                    type={values.showPassword ? 'text' : 'password'}
                    sx={{ marginBottom: 4 }}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          aria-label='toggle password visibility'
                        >
                          {values.showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel htmlFor='auth-register-password'>Password</InputLabel>
                  <OutlinedInput
                    label='Re-enter Password'
                    value={values.password}
                    id='auth-register-confirm-password'
                    type={values.showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          aria-label='toggle password visibility'
                        >
                          {values.showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControlLabel
                  control={<Checkbox />}
                  label={
                    <Fragment>
                      <span>I agree to </span>
                      <Link href='/' passHref>
                        <LinkStyled onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                          privacy policy & terms
                        </LinkStyled>
                      </Link>
                    </Fragment>
                  }
                />
                <Button fullWidth size='large' type='submit' variant='contained' onClick={handleSubmit} sx={{
                  marginBottom: 7,
                  backgroundColor: '#404040',
                  color: '#fff',

                }}>
                  Sign up
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
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                Already have an account?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/pages/login'>
                  <LinkStyled>Sign in instead</LinkStyled>
                </Link>
              </Typography>
            </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

    </Box>
  )
}

RegisterPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default RegisterPage
