// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import { styled } from '@mui/material/styles'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow, { TableRowProps } from '@mui/material/TableRow'
import TableCell, { TableCellProps, tableCellClasses } from '@mui/material/TableCell'
import { useContext, useEffect, useState } from 'react'
import {
  Checkbox,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  CardContent,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  CircularProgress,
  Skeleton
} from '@mui/material'
import { useAuth } from 'src/@core/context/AuthContext'
import { getAllCustomers, updateCustomerApi } from 'src/pages/api/userManagementAPI'
import { Email, Sledding } from 'mdi-material-ui'

interface RowData {
  id: string
  fullname: string
  email: string
  phoneNumber: string
  actionStatus: string
  gender?: string
}

interface Customer {
  id: number
  email: string
  email_verified_at: string | null
  role: string
  otp: string | null
  status: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  customer_details: {
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

// interface UpdatedRowData {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   status: string;
//   gender: string;
//   state: string;

// }

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

interface CustomerData {
  id: number
  customer_details: {
    name: string
    phone_no: string
    gender: string | null
  }
  email: string
  status: string
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

const initialRows = [
  createData('1', 'John Doe', 'john@example.com', '0123654789', 'Active', 'Male'),
  createData('2', 'Jane Smith', 'jane@example.com', '0123654789', 'Active', 'Female'),
  createData('3', 'Alice Johnson', 'alice@example.com', '0123654789', 'Inactive', 'Female'),
  createData('4', 'Bob Brown', 'bob@example.com', '0123654789', 'Active', 'Male'),
  createData('5', 'Eve Adams', 'eve@example.com', '0123654789', 'Inactive', 'Female')
]

const UserTable = () => {
  // const [rows, setRows] = useState(initialRows)
  const [rows, setRows] = useState<Row[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)
  const [selectedRow, setSelectedRow] = useState<Row | null>(null)
  // const [updatedRowData, setUpdatedRowData] = useState<UpdatedRowData| null>(null)
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null)

  // const [customerData, setCustomersData] = useState<CustomerData[]>([])

  const [loading, setLoading] = useState(true)

  const { apiConfig } = useAuth()

  const handleCheckboxClick = (row: Row, index: number) => {
    setOpenDialog(true)
    console.log(row)

    setSelectedRow(row)
    setSelectedRowIndex(index)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedRow(null)
    setSelectedRowIndex(null)
  }
  const updateCustomer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // setUpdatedRowData(selectedRow);

    const updatedCustomerData = {
      userId: selectedRow?.id,
      name: selectedRow?.name,
      phone_no: selectedRow?.phone,
      email: selectedRow?.email,
      gender: selectedRow?.gender,
      state: selectedRow?.state,
      company_name: selectedRow?.company_name,
      vat_number: selectedRow?.vat_number,
      billing_address: selectedRow?.billing_address,
      location: selectedRow?.location
    }

    console.log(updatedCustomerData)

    updateCustomerMethod(updatedCustomerData)
  }

  const updateCustomerMethod = async (customerData: any) => {
    setSaveLoading(true)
    console.log(apiConfig)

    const result = await updateCustomerApi(customerData, apiConfig)

    if (result.responseType === 'success') {
      // updateRows(result?.output?.data)

      setSaveLoading(false)
      setOpenDialog(false)
      fetchCustomers()
      setSelectedRowIndex(null)
    } else if (result.responseType === 'fail') {
      setLoading(false)
      // enqueueSnackbar(result.output.message || 'Login failed', { variant: 'error' });
    } else if (result.responseType === 'error') {
      setSaveLoading(false)
      // enqueueSnackbar(result.output.message || 'An error occurred', { variant: 'error' });
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedRow) {
      const { name, value } = e.target
      setSelectedRow({ ...selectedRow, [name]: value })
    }
  }

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    if (selectedRow) {
      const { name, value } = e.target
      setSelectedRow({ ...selectedRow, [name as string]: value })
    }
  }

  // const handleSave = () => {
  //   // if (selectedRowIndex !== null && selectedRow) {
  //   //   const updatedRows = rows.map((row, index) =>
  //   //     index === selectedRowIndex ? { ...selectedRow, gender: selectedRow.gender || '' } : row
  //   //   )
  //   //   setRows(updatedRows)
  //   //   console.log(updatedRows)
  //   // }
  //   // handleCloseDialog()
  // }

  const handleDelete = () => {
    if (selectedRowIndex !== null) {
      const updatedRows = rows.filter((_, index) => index !== selectedRowIndex)
      setRows(updatedRows)
      console.log(updatedRows)
    }
    handleCloseDialog()
  }

  const fetchCustomers = async () => {
    setLoading(true)
    // console.log(apiConfig);

    const result = await getAllCustomers(apiConfig)

    if (result.responseType === 'success') {
      updateRows(result?.output?.data)

      setLoading(false)
    } else if (result.responseType === 'fail') {
      setLoading(false)
      // enqueueSnackbar(result.output.message || 'Login failed', { variant: 'error' });
    } else if (result.responseType === 'error') {
      setLoading(false)
      // enqueueSnackbar(result.output.message || 'An error occurred', { variant: 'error' });
    }
  }

  const updateRows = (data: Customer[]) => {
    const transformedData = transformData(data)
    setRows(transformedData)
  }

  const transformData = (data: Customer[]): Row[] => {
    console.log(data)
    return data.map(item => ({
      id: item.id.toString(),
      name: item.customer_details.name,
      email: item.email,
      phone: item.customer_details.phone_no,
      status: item.status,
      gender: item.customer_details.gender || 'Male',
      state: item.customer_details.state,
      company_name: item.customer_details.company_name,
      vat_number: item.customer_details.vat_number,
      billing_address: item.customer_details.billing_address,
      location: item.customer_details.location
    }))
  }

  // const updateRows = (rows) => {
  //   const transformedData = transformData(users);
  //   setRows(transformedData);
  // };

  useEffect(() => {
    fetchCustomers()
  }, [])

  // useEffect(() => {
  //   // fetchCustomers()
  //   updateRows()
  // }, [users])

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align='left'>Full Name</StyledTableCell>
              <StyledTableCell align='left'>Email Add</StyledTableCell>
              <StyledTableCell align='left'>Phone Number</StyledTableCell>
              <StyledTableCell align='left'>Action Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <>
                {[...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell align='center'>
                      <Skeleton variant='rectangular' width='100%' height={40} />
                    </TableCell>
                    <TableCell align='center'>
                      <Skeleton variant='rectangular' width='100%' height={40} />
                    </TableCell>
                    <TableCell align='center'>
                      <Skeleton variant='rectangular' width='100%' height={40} />
                    </TableCell>
                    <TableCell align='center'>
                      <Skeleton variant='rectangular' width='100%' height={40} />
                    </TableCell>
                    <TableCell align='center'>
                      <Skeleton variant='rectangular' width='100%' height={40} />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  onClick={() => {
                    console.log(row)
                    handleCheckboxClick(row, index)
                  }}
                  style={{
                    cursor: 'pointer'
                  }}
                >
                  <TableCell component='th' scope='row'>
                    <Checkbox checked={selectedRowIndex === index} readOnly />
                  </TableCell>
                  <TableCell align='left'>{row.name}</TableCell>
                  <TableCell align='left'>{row.email}</TableCell>
                  <TableCell align='left'>{row.phone}</TableCell>
                  <TableCell align='left'>{row.status}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth='xl'>
        <DialogContent style={{ maxWidth: '1000px' }}>
          <CardContent>
            <form onSubmit={updateCustomer}>
              <Grid container spacing={5} style={{ marginBottom: 20 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Full Name'
                    name='name'
                    value={selectedRow ? selectedRow?.name : ''}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-select-label'>Gender</InputLabel>
                    <Select
                      label='Gender'
                      name='gender'
                      value={selectedRow ? selectedRow?.gender || '' : ''}
                      id='form-layouts-separator-select'
                      labelId='form-layouts-separator-select-label'
                      onChange={handleSelectChange}
                    >
                      <MenuItem value='Male'>Male</MenuItem>
                      <MenuItem value='Female'>Female</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={5} style={{ marginBottom: 20 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    disabled
                    fullWidth
                    type='email'
                    label='Email'
                    name='email'
                    value={selectedRow ? selectedRow?.email : ''}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    disabled
                    fullWidth
                    label='Phone Number'
                    name='phone_no'
                    value={selectedRow ? selectedRow?.phone : ''}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={5} style={{ marginBottom: 20 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='State'
                    placeholder=''
                    name='state'
                    onChange={handleInputChange}
                    value={selectedRow ? selectedRow?.state : ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Company Name'
                    placeholder=''
                    name='company_name'
                    value={selectedRow ? selectedRow?.company_name : ''}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={5} style={{ marginBottom: 20 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='VAT Number'
                    placeholder=''
                    name='vat_number'
                    value={selectedRow ? selectedRow?.vat_number : ''}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Billing Address'
                    placeholder=''
                    name='billing_address'
                    value={selectedRow ? selectedRow?.billing_address : ''}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={5} style={{ marginBottom: 20 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Location'
                    placeholder=''
                    name='location'
                    onChange={handleInputChange}
                    value={selectedRow ? selectedRow?.location : ''}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={5} style={{ marginBottom: 0, marginTop: 20 }}>
                <Grid item xs={12} sm={4}>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={handleDelete}
                    style={{
                      border: '1px solid'
                    }}
                    sx={{
                      backgroundColor: 'transparent',
                      color: 'red',
                      '&:hover': {
                        backgroundColor: 'red',
                        color: '#fff'
                      }
                    }}
                  >
                    Delete User
                  </Button>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button
                    type='submit'
                    variant='contained'
                    size='large'
                    disabled={saveLoading}
                    startIcon={saveLoading ? <CircularProgress size={20} color='inherit' /> : null}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UserTable
