
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'


// ** React Imports
import { useState, ElementType, ChangeEvent } from 'react'
import { MouseEvent } from 'react';


// ** MUI Imports
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button, { ButtonProps } from '@mui/material/Button'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { OutlinedInput, InputAdornment } from '@mui/material'
import { EyeOutline, EyeOffOutline } from 'mdi-material-ui'


interface State {
  newPassword: string
  currentPassword: string
  showNewPassword: boolean
  confirmNewPassword: string
  showCurrentPassword: boolean
  showConfirmNewPassword: boolean
}

interface UserAccount {
  username: string;
  gender: string;
  email: string;
  phoneNumber: string;
  status: string;
  profileImage: string;
  company: string;
  vatNumber: string;
  billingAddress: string;
  location: string;
}

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const AccountSettings = () => {


  // const [openAlert, setOpenAlert] = useState<boolean>(true)
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)

      reader.readAsDataURL(files[0])
    }
  }




  // ** States
  const [values, setValues] = useState<State>({
    newPassword: '',
    currentPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showCurrentPassword: false,
    showConfirmNewPassword: false
  })

  // Handle Current Password
  const handleCurrentPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword })
  }
  const handleMouseDownCurrentPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // Handle New Password
  const handleNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }
  const handleMouseDownNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // Handle Confirm New Password
  const handleConfirmNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }
  const handleMouseDownConfirmNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }



  const [subAdminData, setSubAdminData] = useState<UserAccount[]>([]);
  const [formData, setFormData] = useState<UserAccount>({
    username: '',
    gender: '',
    email: '',
    phoneNumber: '',
    status: '',
    profileImage: '' ,
    company: '' ,
    vatNumber: '' ,
    billingAddress: '' ,
    location: '' ,
  });

  const handleInputChangeSub = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleAddSubAdmin = () => {
    setSubAdminData([...subAdminData, formData]);
    console.log([...subAdminData, formData]);
  }



  return (
    <Card>
      <CardContent>
        <form>

          <Grid container spacing={7}>
            <Grid item xs={12} sm={6}>
              <Typography style={{ fontWeight: 600, marginBottom: '20px' }}>User Details</Typography>
              <TextField fullWidth label='Username' placeholder='johnDoe' defaultValue='johnDoe' style={{ marginBottom: '20px' }} />
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='email'
                    label='Email'
                    placeholder='johnDoe@example.com'
                    defaultValue='johnDoe@example.com'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChangeSub}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Gender</InputLabel>
                    <Select label='Gender' defaultValue='male' name='gender' value={formData.gender} onChange={handleInputChangeSub}>
                      <MenuItem value='male'>Male</MenuItem>
                      <MenuItem value='female'>Female</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={4} style={{ marginTop: '20px' }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='tel'
                    label='Contact Number'
                    placeholder='123456789'
                    defaultValue='123456789'
                    name='phoneNumber' value={formData.phoneNumber} onChange={handleInputChangeSub}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select label='Status' defaultValue='active' name='status' value={formData.status} onChange={handleInputChangeSub}>
                      <MenuItem value='active'>Active</MenuItem>
                      <MenuItem value='inactive'>Inactive</MenuItem>
                      <MenuItem value='pending'>Pending</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={4} style={{ marginTop: '20px' }}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='Company' placeholder='ABC Pvt. Ltd.' defaultValue='ABC Pvt. Ltd.' name='company' value={formData.company} onChange={handleInputChangeSub} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='Vat Number' placeholder='Vat Number' defaultValue='123' name='vatNumber' value={formData.vatNumber} onChange={handleInputChangeSub} />
                </Grid>
              </Grid>
              <Grid container spacing={4} style={{ marginTop: '20px' }}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='Billing Address' placeholder='Billing Address' defaultValue='ABC' name='billingAddress' value={formData.billingAddress} onChange={handleInputChangeSub} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='Location' placeholder='Location' defaultValue='ABC' name='location' value={formData.location} onChange={handleInputChangeSub} />
                </Grid>
              </Grid>
              <Grid item xs={12} style={{ marginTop: '40px' }}>
                <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={handleAddSubAdmin}>
                  Save Changes
                </Button>
                <Button type='reset' variant='outlined' color='secondary'>
                  Reset
                </Button>
              </Grid>

              <Typography style={{ fontWeight: 600, marginBottom: '20px', marginTop: '40px' }}>Change Password</Typography>
              <CardContent sx={{ paddingBottom: 0 }}>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={12}>
                    <Grid container spacing={5}>
                      <Grid item xs={12} sx={{ marginTop: 4.75 }}>
                        <FormControl fullWidth>
                          <InputLabel htmlFor='account-settings-current-password'>Current Password</InputLabel>
                          <OutlinedInput
                            label='Current Password'
                            value={values.currentPassword}
                            id='account-settings-current-password'
                            type={values.showCurrentPassword ? 'text' : 'password'}
                            onChange={handleCurrentPasswordChange('currentPassword')}
                            endAdornment={
                              <InputAdornment position='end'>
                                <IconButton
                                  edge='end'
                                  aria-label='toggle password visibility'
                                  onClick={handleClickShowCurrentPassword}
                                  onMouseDown={handleMouseDownCurrentPassword}
                                >
                                  {values.showCurrentPassword ? <EyeOutline /> : <EyeOffOutline />}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sx={{ marginTop: 6 }}>
                        <FormControl fullWidth>
                          <InputLabel htmlFor='account-settings-new-password'>New Password</InputLabel>
                          <OutlinedInput
                            label='New Password'
                            value={values.newPassword}
                            id='account-settings-new-password'
                            onChange={handleNewPasswordChange('newPassword')}
                            type={values.showNewPassword ? 'text' : 'password'}
                            endAdornment={
                              <InputAdornment position='end'>
                                <IconButton
                                  edge='end'
                                  onClick={handleClickShowNewPassword}
                                  aria-label='toggle password visibility'
                                  onMouseDown={handleMouseDownNewPassword}
                                >
                                  {values.showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel htmlFor='account-settings-confirm-new-password'>Confirm New Password</InputLabel>
                          <OutlinedInput
                            label='Confirm New Password'
                            value={values.confirmNewPassword}
                            id='account-settings-confirm-new-password'
                            type={values.showConfirmNewPassword ? 'text' : 'password'}
                            onChange={handleConfirmNewPasswordChange('confirmNewPassword')}
                            endAdornment={
                              <InputAdornment position='end'>
                                <IconButton
                                  edge='end'
                                  aria-label='toggle password visibility'
                                  onClick={handleClickShowConfirmNewPassword}
                                  onMouseDown={handleMouseDownConfirmNewPassword}
                                >
                                  {values.showConfirmNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>

                </Grid>
              </CardContent>
              <Box sx={{ mt: 11 }}>
                <Button variant='contained' sx={{ marginRight: 3.5 }}>
                  Save Changes
                </Button>
                <Button
                  type='reset'
                  variant='outlined'
                  color='secondary'
                  onClick={() => setValues({ ...values, currentPassword: '', newPassword: '', confirmNewPassword: '' })}
                >
                  Reset
                </Button>
              </Box>

              
            </Grid>
            <Grid item xs={12} sm={6} sx={{ marginTop: 4.8, marginBottom: 3 }}>
              <Typography style={{ fontWeight: 600, marginBottom: '20px' }}>Profile Photo</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ImgStyled src={imgSrc} alt='Profile Pic' />
                <Box>
                  <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                    Upload New Photo
                    <input
                      hidden
                      type='file'
                      onChange={onChange}
                      accept='image/png, image/jpeg'
                      id='account-settings-upload-image'
                    />
                  </ButtonStyled>
                  <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                    Reset
                  </ResetButtonStyled>
                  <Typography variant='body2' sx={{ marginTop: 5 }}>
                    Allowed PNG or JPEG. Max size of 800K.
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* {openAlert ? (
              <Grid item xs={12} sx={{ mb: 3 }}>
                <Alert
                  severity='warning'
                  sx={{ '& a': { fontWeight: 400 } }}
                  action={
                    <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
                      <Close fontSize='inherit' />
                    </IconButton>
                  }
                >
                  <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
                  <Link href='/' onClick={(e: SyntheticEvent) => e.preventDefault()}>
                    Resend Confirmation
                  </Link>
                </Alert>
              </Grid>
            ) : null} */}


          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default AccountSettings
