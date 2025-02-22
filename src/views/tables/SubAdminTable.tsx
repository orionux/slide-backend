// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import { styled } from '@mui/material/styles'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow, { TableRowProps } from '@mui/material/TableRow'
import TableCell, { TableCellProps, tableCellClasses } from '@mui/material/TableCell'
import { SyntheticEvent, useEffect, useState, ChangeEvent, FormEvent, MouseEvent } from 'react'
import {
  Checkbox,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  CardContent,
  Grid,
  TextField,
  Card,
  InputLabel,
  CardMedia,
  Select,
  MenuItem,
  Typography,
  Rating,
  Tab,
  InputAdornment,
  IconButton,
  OutlinedInput,
  CircularProgress
} from '@mui/material'
import React from 'react'
import { FaUserLarge, FaUserPen, FaUserMinus } from 'react-icons/fa6'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { addSubAdminApi, deleteSubAdminApi, getAllSubAdmins, updateSubAdminApi } from 'src/pages/api/userManagementAPI'
import { useAuth } from 'src/@core/context/AuthContext'
import { EyeOffOutline, EyeOutline } from 'mdi-material-ui'
import { enqueueSnackbar } from 'notistack'

interface OrderStatus {
  projectName: string
  duration: string
  status: string
}

// interface RowData {
//   id: string
//   fullname: string
//   email: string
//   phoneNumber: string
//   actionStatus: string
//   gender?: string
// }

interface SubAdmin {
  id: number
  email: string
  email_verified_at: string | null
  role: string
  otp: string | null
  status: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  sub_admin_details: {
    id: number
    user_id: number
    name: string
    phone_no: string
    gender: string | null
    state: string | null
    company_name: string | null
    vat_number: string | null
    billing_address: string | null
    location: string | null
    created_at: string
    updated_at: string
    deleted_at: string | null
  }
}

interface Row {
  id: string
  name: string
  email: string
  phone: string
  status: string
  gender: string
  state?: string | null
  company_name?: string | null
  vat_number?: string | null
  billing_address?: string | null
  location?: string | null
}


interface FormData {
  name: string;
  gender: string;
  email: string;
  phone: string;
  state: string;
  password: string;
  confirmPassword: string;
}
interface FormDataUpdate {
  id: string;
  name: string;
  gender: string;
  email: string;
  phone: string;
  state: string;
}

interface Errors {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface Visibility {
  showPassword: boolean;
  showConfirmPassword: boolean;
}

const createData = (
  id: string,
  fullname: string,
  email: string,
  phoneNumber: string,
  actionStatus: string,
  gender?: string
) => {
  return { id, fullname, email, phoneNumber, actionStatus, gender: gender || '' }
}

const StyledTableCell = styled(TableCell)<TableCellProps>(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.black
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)<TableRowProps>(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },

  // hide last border
  '&:last-of-type td, &:last-of-type th': {
    border: 0
  }
}))

// const rows: RowData[] = [
//   createData('1', 'John Doe', 'john@example.com', '0123654789', 'Male', 'Califonia', '/images/admin/sub-admin-avatar.png', [
//     { projectName: 'Project 1', duration: '10 days', status: 'Review' },
//     { projectName: 'Project 2', duration: '5 days', status: 'Review' },
//     { projectName: 'Project 8', duration: '0 days', status: 'Completed' },
//   ]),
//   // createData('2', 'Jane Smith', 'jane@example.com', '0123654789', 'Female', 'Sidny', '/images/admin/4.png', [
//   //   { projectName: 'Project 3', duration: '15 days', status: 'Preparing' },
//   //   { projectName: 'Project 9', duration: '0 days', status: 'Completed' },
//   //   { projectName: 'Project 10', duration: '0 days', status: 'Terminated' },
//   // ]),
//   // createData('3', 'Alice Johnson', 'alice@example.com', '0123654789', 'Male', 'New York', '/images/admin/7.png', [
//   //   { projectName: 'Project 4', duration: '3 days', status: 'Review' },
//   //   { projectName: 'Project 5', duration: '0 days', status: 'Terminated' },
//   //   { projectName: 'Project 6', duration: '7 days', status: 'Preparing' },
//   //   { projectName: 'Project 7', duration: '10 days', status: 'Review' },
//   //   { projectName: 'Project 11', duration: '0 days', status: 'Completed' },
//   // ])
// ]

const SubAdminTable = () => {
  const [rows, setRows] = useState<Row[]>([])
  const [openDialogViewUser, setOpenDialogViewUser] = useState(false)
  const [openDialogEditUser, setOpenDialogEditUser] = useState(false)
  const [openDialogDeleteUser, setOpenDialogDeleteUser] = useState(false)
  const [selectedRow, setSelectedRow] = useState<Row | null>(null)
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null)
  const [value, setValue] = useState<string>('1')
  const [openSubAdmin, setOpenSubAdmin] = useState(false)
  const [loading, setLoading] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [addLoading, setAddLoading] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  


  const { apiConfig } = useAuth()

  // console.log("sub admin data: ",rows)

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  // view model
  const handleViewUser = (row: Row, index: number) => {
    setOpenDialogViewUser(true)
    setSelectedRow(row)
    setSelectedRowIndex(index)
  }
  const handleCloseViewDialog = () => {
    setOpenDialogViewUser(false)
    setSelectedRow(null)
    setSelectedRowIndex(null)
  }

  // edit model
  const handleEditUser = (row: Row, index: number) => {
    // console.log(index)
    setOpenDialogEditUser(true)
    setSelectedRow(row)
    setSelectedRowIndex(index)
  }
  const handleCloseEditDialog = () => {
    setOpenDialogEditUser(false)
    setSelectedRow(null)
    setSelectedRowIndex(null)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (selectedRow) {
      setSelectedRow(prevState => ({
        ...prevState!,
        [name]: value

      }));
    }
  };

  const handleSave = () => {
    // if (selectedRow && selectedRowIndex !== null) {
    //   rows[selectedRowIndex] = selectedRow;
    //   // console.log("Updated row:", selectedRow);
    // }

if (selectedRow) {
  const formDataToSubmit: FormDataUpdate = {
    id: selectedRow.id,
    name: selectedRow.name,
    gender: selectedRow.gender,
    email: selectedRow.email,
    phone: selectedRow.phone,
    state: selectedRow.state || '',
  }
  // handleEditSubAdmin(formDataToSubmit)

  console.log(formDataToSubmit)

  handleEditSubAdmin(formDataToSubmit)

}

    // handleCloseEditDialog();
  };

  //delete model
  const handleDeleteUser = (row: Row, index: number) => {
    setOpenDialogDeleteUser(true)
    setSelectedRow(row)
    setSelectedRowIndex(index)
  }
  const handleCloseDeleteDialog = () => {
    setOpenDialogDeleteUser(false)
    setSelectedRow(null)
    setSelectedRowIndex(null)
  }

  //Add Sub Admin
  const handleSubAdmin = () => {
    setOpenSubAdmin(true)
  }
  const handleCloseSubAdmin = () => {
    setFormData({
      name: '',
      gender: '',
      email: '',
      phone: '',
      state: '',
      password: '',
      confirmPassword: '',
    });
    setOpenSubAdmin(false)
  }

  // interface SubAdmin {
  //   fullname: string;
  //   gender: string;
  //   email: string;
  //   phoneNumber: string;
  //   state: string;
  //   profileImage: string;
  // }


  // const [subAdminData, setSubAdminData] = useState<SubAdmin[]>([]);
  // const [formData, setFormData] = useState<Row>({
  //   id: '',
  //   name: '',
  //   gender: '',
  //   email: '',
  //   phone: '',
  //   state: '',
  //   status: ''
  //   // profileImage: '' ,
  // });

  // State for form data
  const [formData, setFormData] = useState<FormData>({
    name: '',
    gender: '',
    email: '',
    phone: '',
    state: '',
    password: '',
    confirmPassword: '',
  });

  // State for validation errors
  const [errors, setErrors] = useState<Errors>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [visibility, setVisibility] = useState<Visibility>({
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const file = event.target.files?.[0];
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     setFormData(prevFormData => ({
    //       ...prevFormData,
    //       profileImage: reader.result as string
    //     }));
    //   };
    //   reader.readAsDataURL(file);
    // }
  };

  const handleImageClick = () => {
    document.getElementById('profileImageInput')?.click();
  };

  const updateRows = (data: SubAdmin[]) => {
    const transformedData = transformData(data)
    setRows(transformedData)
  }

  const transformData = (data: SubAdmin[]): Row[] => {
    // console.log(data)
    return data.map(item => ({
      id: item.id.toString(),
      name: item.sub_admin_details.name,
      email: item.email,
      phone: item.sub_admin_details.phone_no,
      status: item.status,
      gender: item.sub_admin_details.gender || 'Male',
      state: item.sub_admin_details.state,
      company_name: item.sub_admin_details.company_name,
      vat_number: item.sub_admin_details.vat_number,
      billing_address: item.sub_admin_details.billing_address,
      location: item.sub_admin_details.location
    }))
  }


  // Handle input change
  const handleInputChangeSub = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]: value,
    }));

    // Clear errors when the user starts typing
    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({
        ...prev,
        [name as string]: '',
      }));
    }
  };

  // Validate mobile number
  const validateMobileNumber = (value: string): string => {
    const regex = /^[0-9]{10}$/; // 10-digit mobile number
    return regex.test(value) ? '' : 'Invalid mobile number';
  };

  // Validate email
  const validateEmail = (value: string): string => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    return regex.test(value) ? '' : 'Invalid email address';
  };

  // Validate password
  const validatePassword = (value: string): string => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(value)
      ? ''
      : 'Password must be at least 8 characters with one uppercase letter, one lowercase letter, one number, and one symbol';
  };

  // Validate confirm password
  const validateConfirmPassword = (confirmPassword: string, password: string): string => {
    return confirmPassword === password ? '' : 'Passwords do not match';
  };

  // Validate form fields
  const validateForm = (): boolean => {
    const newErrors: Errors = {
      name: formData.name ? '' : 'Name is required',
      email: validateEmail(formData.email),
      phone: validateMobileNumber(formData.phone),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(formData.confirmPassword, formData.password),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== '');
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      handleAddSubAdmin(formData);
    } else {
      return
    }
  };



  // Toggle password visibility
  const handleClickShowPassword = () => {
    setVisibility((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  // Toggle confirm password visibility
  const handleClickShowConfirmPassword = () => {
    setVisibility((prev) => ({ ...prev, showConfirmPassword: !prev.showConfirmPassword }));
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };




//API HANDLING 
const handleAddSubAdmin = async (formData: FormData) => {
  setAddLoading(true)

  const result = await addSubAdminApi(formData, apiConfig)

  if (result.responseType === 'success') {

    console.log(result?.output?.data);
    setAddLoading(false)
    enqueueSnackbar('Sub Admin added successful!', { variant: 'success' });
    handleCloseSubAdmin();
    fetchSubAdmins()
  } else if (result.responseType === 'fail') {
    setAddLoading(false)
    enqueueSnackbar(result.output.message || 'something went wrong', { variant: 'error' });
  } else if (result.responseType === 'error') {
    setAddLoading(false)
    enqueueSnackbar(result.output.message || 'An error occurred', { variant: 'error' });
  }

}
const handleEditSubAdmin = async (formData: FormDataUpdate) => {
  setSaveLoading(true)

  const result = await updateSubAdminApi(formData, apiConfig)

  if (result.responseType === 'success') {
    enqueueSnackbar('Sub Admin Updated successful!', { variant: 'success' });
    fetchSubAdmins()
    setOpenDialogEditUser(false)
    setSaveLoading(false)
  } else if (result.responseType === 'fail') {
    setSaveLoading(false)
    enqueueSnackbar(result.output.message || 'something went wrong', { variant: 'error' });
  } else if (result.responseType === 'error') {
    setSaveLoading(false)
    enqueueSnackbar(result.output.message || 'An error occurred', { variant: 'error' });
  }

}
const fetchSubAdmins = async () => {
  setLoading(true)
  // console.log(apiConfig);

  const result = await getAllSubAdmins(apiConfig)

  if (result.responseType === 'success') {
    updateRows(result?.output?.data)

    console.log(result?.output?.data)

    // setLoading(false)
  } else if (result.responseType === 'fail') {
    setLoading(false)
    // enqueueSnackbar(result.output.message || 'Login failed', { variant: 'error' });
  } else if (result.responseType === 'error') {
    setLoading(false)
    // enqueueSnackbar(result.output.message || 'An error occurred', { variant: 'error' });
  }
}


  const handleDeleteSubAdmin = async () => {
    setDeleteLoading(true)

    const result = await deleteSubAdminApi(selectedRow?.id || '', apiConfig)

    if (result.responseType ==='success') {
      enqueueSnackbar('Sub Admin Deleted successful!', { variant:'success' });
      fetchSubAdmins()
      setOpenDialogDeleteUser(false)
      setDeleteLoading(false)
      setSelectedRowIndex(null)
    } else if (result.responseType === 'fail') {
      setDeleteLoading(false)
      enqueueSnackbar(result.output.message ||'something went wrong', { variant: 'error' });
    } else if (result.responseType === 'error') {
      setDeleteLoading(false)
      enqueueSnackbar(result.output.message || 'An error occurred', { variant: 'error' });
    }

  }


  useEffect(() => {
    fetchSubAdmins()
  }, [apiConfig])


  return (
    <>
      <CardContent>
        <Button onClick={handleSubAdmin} variant='contained' sx={{ backgroundColor: '#57EBB7', color: '#455A64' }}>Add Sub Admin</Button>
      </CardContent>

      <Dialog open={openSubAdmin} onClose={handleCloseSubAdmin} maxWidth='xl'>
        <DialogActions style={{ paddingTop: '20px', paddingBottom: '10px' }}>
          <Button onClick={handleCloseSubAdmin}>
            <AiOutlineCloseCircle style={{ fontSize: '25px' }} />
          </Button>
        </DialogActions>
        <DialogContent style={{ maxWidth: '1000px' }}>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <Grid container spacing={5} style={{ marginBottom: 20 }}>
                <Grid item xs={12} sm={4}>
                  <Card sx={{ backgroundColor: '#263238' }}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                      {/* <Typography variant='body2' sx={{ color: '#ffffff' }}>
                  EMP : 12345
                </Typography> */}
                      <Typography variant='h6' sx={{ marginBottom: 2, color: '#ffffff' }}>
                        {formData.name}
                      </Typography>
                      <Rating readOnly value={5} name='read-only' sx={{ marginRight: 2 }} />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography variant='h6' sx={{ marginBottom: 2, color: '#455A64' }}>
                    Basic Info
                  </Typography>
                  <Grid container spacing={5} style={{ marginBottom: 20 }}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        // label='Full Name'
                        placeholder='Full name'
                        name='name'
                        value={formData.name}
                        onChange={handleInputChangeSub}
                        error={!!errors.name}
                        helperText={errors.name}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ color: '#455A64' }}>
                      <Select
                        name='gender'
                        value={formData.gender || ''} // Use empty string as the initial value
                        id='form-layouts-separator-select'
                        labelId='form-layouts-separator-select-label'
onChange={(event) => handleInputChangeSub(event as ChangeEvent<{ name?: string; value: unknown }>)}
                        fullWidth
                        displayEmpty // This ensures the placeholder is displayed when no value is selected
                        inputProps={{ 'aria-label': 'Gender' }}
                        sx={{
                          '& .MuiSelect-select': {
                            color: formData.gender ? 'inherit' : '#999', // Gray text for placeholder
                          },
                        }}
                      >
                        <MenuItem disabled value=''>
                          <div>Gender</div> {/* Placeholder text */}
                        </MenuItem>
                        <MenuItem value='Male'>Male</MenuItem>
                        <MenuItem value='Female'>Female</MenuItem>
                      </Select>
                    </Grid>
                  </Grid>
                  <Grid container spacing={5} style={{ marginBottom: 20 }}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        // label='Email'
                        placeholder='Email'
                        name='email'
                        value={formData.email}
                        onChange={handleInputChangeSub}
                        error={!!errors.email}
                        helperText={errors.email}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        // label='Phone Number'
                        placeholder='Phone number'
                        name='phone'
                        value={formData.phone}
                        onChange={handleInputChangeSub}
                        error={!!errors.phone}
                        helperText={errors.phone}
                        required
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={5} style={{ marginBottom: 20 }}>
                    <Grid item xs={12} sm={6}>
                      <OutlinedInput
                        fullWidth
                        // label='Password'
                        placeholder='Password'
                        value={formData.password}
                        name='password'
                        onChange={handleInputChangeSub}
                        type={visibility.showPassword ? 'text' : 'password'}
                        error={!!errors.password}
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              aria-label='toggle password visibility'
                            >
                              {visibility.showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {errors.password && (
                        <Typography variant='body2' color='error' sx={{ marginBottom: 3 }}>
                          {errors.password}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <OutlinedInput
                        fullWidth
                        // label='Confirm Password'
                        placeholder='Confirm Password'
                        value={formData.confirmPassword}
                        name='confirmPassword'
                        onChange={handleInputChangeSub}
                        type={visibility.showConfirmPassword ? 'text' : 'password'}
                        error={!!errors.confirmPassword}
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={handleClickShowConfirmPassword}
                              onMouseDown={handleMouseDownPassword}
                              aria-label='toggle password visibility'
                            >
                              {visibility.showConfirmPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {errors.confirmPassword && (
                        <Typography variant='body2' color='error' sx={{ marginBottom: 2 }}>
                          {errors.confirmPassword}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                  <Grid container spacing={5} style={{ marginBottom: 20 }}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        placeholder='State'
                        // label='State'
                        name='state'
                        value={formData.state}
                        onChange={handleInputChangeSub}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
            <Grid container spacing={5} style={{ marginBottom: 20, display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
              <Button type='button' variant='contained' size='large' style={{ marginRight: '20px', backgroundColor: '#FFF', color: '#455A64', border: 'solid 1px #455A64' }} 
              onClick={handleCloseSubAdmin}
              >
                Cancel
              </Button>
              <Button type='submit' variant='contained' size='large' style={{ backgroundColor: '#57EBB7', color: '#455A64' }}
              disabled={addLoading}
              startIcon={addLoading ? <CircularProgress size={20} color='inherit' /> : null}
              >
                Add
              </Button>
            </Grid>
          </form>





        </DialogContent>
      </Dialog>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell width={100}>ID</StyledTableCell>
              <StyledTableCell align='left'>Full Name</StyledTableCell>
              <StyledTableCell align='left'>Email Add</StyledTableCell>
              <StyledTableCell align='left'>Phone Number</StyledTableCell>
              <StyledTableCell align='left'>Order Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component='th' scope='row'>
                  <Checkbox checked={selectedRowIndex === index} readOnly />
                </StyledTableCell>
                <StyledTableCell align='left' style={{ position: 'relative' }}>
                  {row.name}
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Button
                      onClick={() => handleViewUser(row, index)}
                      size='small'
                      variant='contained'
                      style={{
                        color: '#455A64',
                        backgroundColor: '#ffffff',
                        boxShadow: '',
                        fontSize: '9px',
                        marginRight: '10px',
                        padding: '5px'
                      }}
                    >
                      <FaUserLarge style={{ marginRight: '10px' }} /> View Profile
                    </Button>
                    <Button
                      onClick={() => handleEditUser(row, index)}
                      size='small'
                      variant='contained'
                      style={{
                        color: '#455A64',
                        backgroundColor: '#ffffff',
                        boxShadow: '',
                        fontSize: '9px',
                        marginRight: '10px',
                        padding: '5px'
                      }}
                    >
                      <FaUserPen style={{ marginRight: '10px' }} /> Edit profile
                    </Button>
                    <Button
                      onClick={() => handleDeleteUser(row, index)}
                      size='small'
                      variant='contained'
                      style={{
                        color: '#E82F1D',
                        backgroundColor: '#ffffff',
                        boxShadow: '',
                        fontSize: '9px',
                        marginRight: '10px',
                        padding: '5px'
                      }}
                    >
                      <FaUserMinus style={{ marginRight: '10px' }} /> Delete profile
                    </Button>
                  </div>
                </StyledTableCell>
                <StyledTableCell align='left'>{row.email}</StyledTableCell>
                <StyledTableCell align='left'>{row.phone}</StyledTableCell>
                <StyledTableCell align='left'>
                  {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {row.orderStatus
                      .filter(status => status.status !== 'Terminated' && status.status !== 'Completed')
                      .map((status, statusIndex) => (
                        <div key={statusIndex} style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <div style={{ width: '30%', marginRight: '10px' }}>{status.projectName}</div>
                          <div style={{ width: '30%', marginRight: '10px' }}>{status.duration}</div>
                          <div style={{ width: '40%', padding: '5px' }}>
                            <span
                              style={{
                                backgroundColor:
                                  status.status === 'Review'
                                    ? '#57EBB7'
                                    : status.status === 'Preparing'
                                      ? '#FFE66A'
                                      : status.status === 'Terminated'
                                        ? '#B80000'
                                        : 'inherit',
                                color:
                                  status.status === 'Review'
                                    ? '#455A64'
                                    : status.status === 'Preparing'
                                      ? '#455A64'
                                      : status.status === 'Terminated'
                                        ? '#FFFFFF'
                                        : 'inherit',
                                fontSize: '11px',
                                padding: '5px 10px',
                                borderRadius: '6px',
                              }}
                            >
                              {status.status}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div> */}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* view model */}
      <Dialog open={openDialogViewUser} onClose={handleCloseViewDialog} maxWidth='xl' >
        <DialogActions style={{ paddingTop: '20px', paddingBottom: '10px' }}>
          <Button onClick={handleCloseViewDialog}>
            <AiOutlineCloseCircle style={{ fontSize: '25px' }} />
          </Button>
        </DialogActions>
        <DialogContent style={{ maxWidth: '1000px' }}>
          <CardContent>
            <Grid container spacing={5} style={{ marginBottom: 20 }}>
              <Grid item xs={12} sm={4}>
                <Card sx={{ backgroundColor: '#263238' }}>
                  {/* <CardMedia sx={{ height: '14.5625rem' }} image={selectedRow?.profileImage} /> */}
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <Typography variant='body2' sx={{ color: '#ffffff' }}>
                      EMP : {selectedRow && selectedRow.id}
                    </Typography>
                    <Typography variant='h6' sx={{ marginBottom: 2, color: '#ffffff' }}>
                      {selectedRow && selectedRow.name}
                    </Typography>
                    <Rating readOnly value={5} name='read-only' sx={{ marginRight: 2 }} />
                    <Typography variant='body2' sx={{ color: '#ffffff' }}>
                      {/* {selectedRow && selectedRow.orderStatus.length} Projects */}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant='h6' sx={{ marginBottom: 2, color: '#455A64' }}>
                  Basic Info
                </Typography>
                <Grid container spacing={5} style={{ marginBottom: 20 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='Full Name' placeholder='' value={selectedRow && selectedRow.name} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='Gender' placeholder='' value={selectedRow && selectedRow.gender} />
                  </Grid>
                </Grid>
                <Grid container spacing={5} style={{ marginBottom: 20 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='Email' placeholder='' value={selectedRow && selectedRow.email} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='Phone Number' placeholder='' value={selectedRow && selectedRow.phone} />
                  </Grid>
                </Grid>
                <Grid container spacing={5} style={{ marginBottom: 20 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='State' placeholder='' value={selectedRow && selectedRow.state} />
                  </Grid>
                </Grid>

                <Card>
                  <Typography variant='h6' sx={{ marginBottom: 2, color: '#455A64' }}>
                    Projects
                  </Typography>
                  <TabContext value={value}>
                    <TabList onChange={handleChange} aria-label='card navigation example'>
                      <Tab value='1' label='Ongoing' />
                      <Tab value='2' label='History' />
                    </TabList>
                    <CardContent>
                      <TabPanel value='1' sx={{ p: 0 }}>
                        {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
                          {selectedRow &&
                            selectedRow.orderStatus
                              .filter(status => status.status !== 'Terminated' && status.status !== 'Completed')
                              .map((status, statusIndex) => (
                                <div key={statusIndex} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <div style={{ width: '30%', marginRight: '10px' }}>{status.projectName}</div>
                                  <div style={{ width: '30%', marginRight: '10px' }}>{status.duration}</div>
                                  <div style={{ width: '40%', padding: '5px' }}>
                                    <span
                                      style={{
                                        backgroundColor:
                                          status.status === 'Review'
                                            ? '#57EBB7'
                                            : status.status === 'Preparing'
                                              ? '#FFE66A'
                                              : status.status === 'Terminated'
                                                ? '#B80000'
                                                : 'inherit',
                                        color:
                                          status.status === 'Review'
                                            ? '#455A64'
                                            : status.status === 'Preparing'
                                              ? '#455A64'
                                              : status.status === 'Terminated'
                                                ? '#FFFFFF'
                                                : 'inherit',
                                        fontSize: '11px',
                                        padding: '5px 10px',
                                        borderRadius: '6px',
                                      }}
                                    >
                                      {status.status}
                                    </span>
                                  </div>
                                </div>
                              ))}
                        </div> */}
                      </TabPanel>
                      <TabPanel value='2' sx={{ p: 0 }}>
                        {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
                          {selectedRow &&
                            selectedRow.orderStatus
                              .filter(status => status.status === 'Terminated' || status.status === 'Completed')
                              .map((status, statusIndex) => (
                                <div key={statusIndex} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <div style={{ width: '30%', marginRight: '10px' }}>{status.projectName}</div>
                                  <div style={{ width: '30%', marginRight: '10px' }}>{status.duration}</div>
                                  <div style={{ width: '40%', padding: '5px' }}>
                                    <span
                                      style={{
                                        backgroundColor:
                                          status.status === 'Review'
                                            ? '#57EBB7'
                                            : status.status === 'Preparing'
                                              ? '#FFE66A'
                                              : status.status === 'Completed'
                                                ? '#5836B6'
                                                : status.status === 'Terminated'
                                                  ? '#B80000'
                                                  : 'inherit',
                                        color:
                                          status.status === 'Review'
                                            ? '#455A64'
                                            : status.status === 'Preparing'
                                              ? '#455A64'
                                              : status.status === 'Completed'
                                                ? '#FFFFFF'
                                                : status.status === 'Terminated'
                                                  ? '#FFFFFF'
                                                  : 'inherit',
                                        fontSize: '11px',
                                        padding: '5px 10px',
                                        borderRadius: '6px',
                                      }}
                                    >
                                      {status.status}
                                    </span>
                                  </div>
                                </div>
                              ))}
                        </div> */}
                      </TabPanel>
                    </CardContent>
                  </TabContext>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </DialogContent>
      </Dialog>

      {/* edit model */}
      <Dialog open={openDialogEditUser} onClose={handleCloseEditDialog} maxWidth='xl' >
        <DialogActions style={{ paddingTop: '20px', paddingBottom: '10px' }}>
          <Button onClick={handleCloseEditDialog}>
            <AiOutlineCloseCircle style={{ fontSize: '25px' }} />
          </Button>
        </DialogActions>
        <DialogContent style={{ maxWidth: '1000px' }}>
          <form onSubmit={e => e.preventDefault()}>
            <CardContent>
              <Grid container spacing={5} style={{ marginBottom: 20 }}>
                <Grid item xs={12} sm={4}>
                  <Card sx={{ backgroundColor: '#263238' }}>
                    {/* <CardMedia sx={{ height: '14.5625rem' }} image={selectedRow?.profileImage} /> */}
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                      <Typography variant='body2' sx={{ color: '#ffffff' }}>
                        EMP : {selectedRow && selectedRow.id}
                      </Typography>
                      <Typography variant='h6' sx={{ marginBottom: 2, color: '#ffffff' }}>
                        {selectedRow && selectedRow.name}
                      </Typography>
                      <Rating readOnly value={5} name='read-only' sx={{ marginRight: 2 }} />
                      <Typography variant='body2' sx={{ color: '#ffffff' }}>
                        {/* {selectedRow && selectedRow.orderStatus.length} Projects */}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography variant='h6' sx={{ marginBottom: 2, color: '#455A64' }}>
                    Basic Info
                  </Typography>
                  <Grid container spacing={5} style={{ marginBottom: 20 }}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Full Name' name='name' value={selectedRow?.name} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Gender' name='gender' value={selectedRow?.gender} onChange={handleInputChange} />
                    </Grid>
                  </Grid>
                  <Grid container spacing={5} style={{ marginBottom: 20 }}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Email' disabled name='email' value={selectedRow?.email} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Phone Number' disabled name='phoneNumber' value={selectedRow?.phone} onChange={handleInputChange} />
                    </Grid>
                  </Grid>
                  <Grid container spacing={5} style={{ marginBottom: 20 }}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='State' name='state' value={selectedRow?.state} onChange={handleInputChange} />
                    </Grid>
                  </Grid>

                  <Card>
                    <Typography variant='h6' sx={{ marginBottom: 2, color: '#455A64' }}>
                      Projects
                    </Typography>
                    <TabContext value={value}>
                      <TabList onChange={handleChange} aria-label='card navigation example'>
                        <Tab value='1' label='Ongoing' />
                        <Tab value='2' label='History' />
                      </TabList>
                      <CardContent>
                        <TabPanel value='1' sx={{ p: 0 }}>
                          {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {selectedRow &&
                              selectedRow.orderStatus
                                .filter(status => status.status !== 'Terminated' && status.status !== 'Completed')
                                .map((status, statusIndex) => (
                                  <div key={statusIndex} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ width: '30%', marginRight: '10px' }}>{status.projectName}</div>
                                    <div style={{ width: '30%', marginRight: '10px' }}>{status.duration}</div>
                                    <div style={{ width: '40%', padding: '5px' }}>
                                      <span
                                        style={{
                                          backgroundColor:
                                            status.status === 'Review'
                                              ? '#57EBB7'
                                              : status.status === 'Preparing'
                                                ? '#FFE66A'
                                                : status.status === 'Terminated'
                                                  ? '#B80000'
                                                  : 'inherit',
                                          color:
                                            status.status === 'Review'
                                              ? '#455A64'
                                              : status.status === 'Preparing'
                                                ? '#455A64'
                                                : status.status === 'Terminated'
                                                  ? '#FFFFFF'
                                                  : 'inherit',
                                          fontSize: '11px',
                                          padding: '5px 10px',
                                          borderRadius: '6px',
                                        }}
                                      >
                                        {status.status}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                          </div> */}
                        </TabPanel>
                        <TabPanel value='2' sx={{ p: 0 }}>
                          {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {selectedRow &&
                              selectedRow.orderStatus
                                .filter(status => status.status === 'Terminated' || status.status === 'Completed')
                                .map((status, statusIndex) => (
                                  <div key={statusIndex} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ width: '30%', marginRight: '10px' }}>{status.projectName}</div>
                                    <div style={{ width: '30%', marginRight: '10px' }}>{status.duration}</div>
                                    <div style={{ width: '40%', padding: '5px' }}>
                                      <span
                                        style={{
                                          backgroundColor:
                                            status.status === 'Review'
                                              ? '#57EBB7'
                                              : status.status === 'Preparing'
                                                ? '#FFE66A'
                                                : status.status === 'Completed'
                                                  ? '#5836B6'
                                                  : status.status === 'Terminated'
                                                    ? '#B80000'
                                                    : 'inherit',
                                          color:
                                            status.status === 'Review'
                                              ? '#455A64'
                                              : status.status === 'Preparing'
                                                ? '#455A64'
                                                : status.status === 'Completed'
                                                  ? '#FFFFFF'
                                                  : status.status === 'Terminated'
                                                    ? '#FFFFFF'
                                                    : 'inherit',
                                          fontSize: '11px',
                                          padding: '5px 10px',
                                          borderRadius: '6px',
                                        }}
                                      >
                                        {status.status}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                          </div> */}
                        </TabPanel>
                      </CardContent>
                    </TabContext>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
            <Grid container spacing={5} style={{ marginBottom: 20, display: "flex", flexDirection: 'row', justifyContent: 'end' }}>
              <Button type='button' variant='contained' size='large' onClick={handleCloseEditDialog} style={{ marginRight: '20px', backgroundColor: '#FFF', color: '#455A64', border: 'solid 1px #455A64' }}>
                Cancel
              </Button>
              <Button type='button' variant='contained' size='large' onClick={handleSave} style={{ backgroundColor: '#57EBB7', color: '#455A64' }}
              disabled={saveLoading}
              startIcon={saveLoading ? <CircularProgress size={20} color='inherit' /> : null}
              >
                Save
              </Button>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>

      {/* delete model */}
      <Dialog open={openDialogDeleteUser} onClose={handleCloseDeleteDialog}>
        <DialogContent>
          <CardContent>
            <Grid container spacing={5} style={{ marginBottom: 20 }}>
              <Grid item xs={12} sm={4}>
                <Card sx={{ backgroundColor: '#263238' }}>
                  {/* <CardMedia sx={{ height: '14.5625rem' }} image={selectedRow?.profileImage} /> */}
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <Typography variant='body2' sx={{ color: '#ffffff' }}>
                      EMP : {selectedRow && selectedRow.id}
                    </Typography>
                    <Typography variant='h6' sx={{ marginBottom: 2, color: '#ffffff' }}>
                      {selectedRow && selectedRow.name}
                    </Typography>
                    <Rating readOnly value={5} name='read-only' sx={{ marginRight: 2 }} />
                    <Typography variant='body2' sx={{ color: '#ffffff' }}>
                      {/* {selectedRow && selectedRow.orderStatus.length} Projects */}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant='h6' sx={{ marginBottom: 2, color: '#455A64' }}>
                  Basic Info
                </Typography>
                <Grid container spacing={5} style={{ marginBottom: 20 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='Full Name' placeholder='' value={selectedRow && selectedRow.name} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='Gender' placeholder='' value={selectedRow && selectedRow.gender} />
                  </Grid>
                </Grid>
                <Grid container spacing={5} style={{ marginBottom: 20 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='Email' placeholder='' value={selectedRow && selectedRow.email} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='Phone Number' placeholder='' value={selectedRow && selectedRow.phone} />
                  </Grid>
                </Grid>
                <Grid container spacing={5} style={{ marginBottom: 20 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='State' placeholder='' value={selectedRow && selectedRow.state} />
                  </Grid>
                </Grid>
                <Grid container spacing={5} style={{ marginBottom: 20 }}>
                  <Grid item xs={12} sm={12}>
                    <Typography variant='body2'>
                      Are you sure you want to delete?
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={5} style={{ marginBottom: 20 }}>
                  <Grid item xs={12} sm={6}>
                    <Button variant='contained' sx={{
                      backgroundColor: '#F1F1F1', color: '#455A64',
                      '&:hover': {
                        backgroundColor: 'red',
                        color: '#fff'
                      },
                    }}
                    onClick={handleDeleteSubAdmin}
                    disabled={deleteLoading}
                    startIcon={deleteLoading ? <CircularProgress size={20} color='inherit' /> : null}
                    >Delete</Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button onClick={handleCloseDeleteDialog} variant='contained' sx={{ backgroundColor: '#57EBB7', color: '#455A64' }}>Cancel</Button>
                  </Grid>
                </Grid>
              </Grid>

            </Grid>
          </CardContent>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SubAdminTable
