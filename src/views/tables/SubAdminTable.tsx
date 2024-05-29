// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import { styled } from '@mui/material/styles'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow, { TableRowProps } from '@mui/material/TableRow'
import TableCell, { TableCellProps, tableCellClasses } from '@mui/material/TableCell'
import { SyntheticEvent, useState } from 'react'
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
  CardMedia,
  Typography,
  Rating,
  Tab
} from '@mui/material'
import React from 'react'
import { FaUserLarge, FaUserPen, FaUserMinus } from 'react-icons/fa6'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { TabContext, TabList, TabPanel } from '@mui/lab'

interface OrderStatus {
  projectName: string
  duration: string
  status: string
}

interface RowData {
  id: string
  fullname: string
  email: string
  phoneNumber: string
  gender: string
  state: string
  profileImage: string
  orderStatus: OrderStatus[]
}

const createData = (id: string, fullname: string, email: string, phoneNumber: string, gender: string, state: string, profileImage: string, orderStatus: OrderStatus[]) => {
  return { id, fullname, email, phoneNumber, gender, state, profileImage, orderStatus }
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

const rows: RowData[] = [
  createData('1', 'John Doe', 'john@example.com', '0123654789', 'Male', 'Califonia', '/images/admin/sub-admin-avatar.png', [
    { projectName: 'Project 1', duration: '10 days', status: 'Review' },
    { projectName: 'Project 2', duration: '5 days', status: 'Review' },
    { projectName: 'Project 8', duration: '0 days', status: 'Completed' },
  ]),
  createData('2', 'Jane Smith', 'jane@example.com', '0123654789', 'Female', 'Sidny', '/images/admin/4.png', [
    { projectName: 'Project 3', duration: '15 days', status: 'Preparing' },
    { projectName: 'Project 9', duration: '0 days', status: 'Completed' },
    { projectName: 'Project 10', duration: '0 days', status: 'Terminated' },
  ]),
  createData('3', 'Alice Johnson', 'alice@example.com', '0123654789', 'Male', 'New York', '/images/admin/7.png', [
    { projectName: 'Project 4', duration: '3 days', status: 'Review' },
    { projectName: 'Project 5', duration: '0 days', status: 'Terminated' },
    { projectName: 'Project 6', duration: '7 days', status: 'Preparing' },
    { projectName: 'Project 7', duration: '10 days', status: 'Review' },
    { projectName: 'Project 11', duration: '0 days', status: 'Completed' },
  ])
]

const SubAdminTable = () => {
  const [openDialogViewUser, setOpenDialogViewUser] = useState(false)
  const [openDialogEditUser, setOpenDialogEditUser] = useState(false)
  const [openDialogDeleteUser, setOpenDialogDeleteUser] = useState(false)
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null)
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null)
  const [value, setValue] = useState<string>('1')
  const [openSubAdmin, setOpenSubAdmin] = useState(false)


  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  // view model
  const handleViewUser = (row: RowData, index: number) => {
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
  const handleEditUser = (row: RowData, index: number) => {
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
    if (selectedRow && selectedRowIndex !== null) {
      rows[selectedRowIndex] = selectedRow;
      console.log("Updated rows:", rows);
    }
    handleCloseEditDialog();
  };

  //delete model
  const handleDeleteUser = (row: RowData, index: number) => {
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
    setOpenSubAdmin(false)
  }




  return (
    <>
      <CardContent>
        <Button onClick = {handleSubAdmin} variant='contained' sx={{ backgroundColor: '#57EBB7', color: '#455A64' }}>Add Sub Admin</Button>
      </CardContent>

      <Dialog open={openSubAdmin} onClose={handleCloseSubAdmin} maxWidth='xl' >
        <DialogActions style={{ paddingTop: '20px', paddingBottom: '10px' }}>
          <Button onClick={handleCloseSubAdmin}>
            <AiOutlineCloseCircle style={{ fontSize: '25px' }} />
          </Button>
        </DialogActions>
        <DialogContent style={{ maxWidth: '1000px' }}>
          <form onSubmit={e => e.preventDefault()}>
            <CardContent>
              <Grid container spacing={5} style={{ marginBottom: 20 }}>
                <Grid item xs={12} sm={4}>
                  <Card sx={{ backgroundColor: '#263238' }}>
                    <CardMedia sx={{ height: '14.5625rem' }} image={selectedRow?.profileImage} />
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                      <Typography variant='body2' sx={{ color: '#ffffff' }}>
                        EMP : {selectedRow && selectedRow.id}
                      </Typography>
                      <Typography variant='h6' sx={{ marginBottom: 2, color: '#ffffff' }}>
                        {selectedRow && selectedRow.fullname}
                      </Typography>
                      <Rating readOnly value={5} name='read-only' sx={{ marginRight: 2 }} />
                      <Typography variant='body2' sx={{ color: '#ffffff' }}>
                        {selectedRow && selectedRow.orderStatus.length} Projects
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
                      <TextField fullWidth label='Full Name' name='fullname' value={selectedRow && selectedRow.fullname} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Gender' name='gender' value={selectedRow && selectedRow.gender}/>
                    </Grid>
                  </Grid>
                  <Grid container spacing={5} style={{ marginBottom: 20 }}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Email' name='email' value={selectedRow && selectedRow.email} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Phone Number' name='phoneNumber' value={selectedRow && selectedRow.phoneNumber} />
                    </Grid>
                  </Grid>
                  <Grid container spacing={5} style={{ marginBottom: 20 }}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='State' name='state' value={selectedRow && selectedRow.state}/>
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
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
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
                          </div>
                        </TabPanel>
                        <TabPanel value='2' sx={{ p: 0 }}>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
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
                          </div>
                        </TabPanel>
                      </CardContent>
                    </TabContext>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
            <Grid container spacing={5} style={{ marginBottom: 20, display: "flex", flexDirection: 'row', justifyContent: 'end' }}>
                <Button type='button' variant='contained' size='large' onClick={handleCloseSubAdmin} style={{ marginRight: '20px', backgroundColor: '#FFF', color: '#455A64', border: 'solid 1px #455A64' }}>
                Cancel
                </Button>
                <Button type='button' variant='contained' size='large' onClick={handleCloseSubAdmin} style={{ backgroundColor: '#57EBB7', color: '#455A64' }}>
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
                  <Checkbox checked={selectedRowIndex === index} readOnly /> {row.id}
                </StyledTableCell>
                <StyledTableCell align='left' style={{ position: 'relative' }}>
                  {row.fullname}
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
                <StyledTableCell align='left'>{row.phoneNumber}</StyledTableCell>
                <StyledTableCell align='left'>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
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
                  </div>
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
                  <CardMedia sx={{ height: '14.5625rem' }} image={selectedRow?.profileImage} />
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <Typography variant='body2' sx={{ color: '#ffffff' }}>
                      EMP : {selectedRow && selectedRow.id}
                    </Typography>
                    <Typography variant='h6' sx={{ marginBottom: 2, color: '#ffffff' }}>
                      {selectedRow && selectedRow.fullname}
                    </Typography>
                    <Rating readOnly value={5} name='read-only' sx={{ marginRight: 2 }} />
                    <Typography variant='body2' sx={{ color: '#ffffff' }}>
                      {selectedRow && selectedRow.orderStatus.length} Projects
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
                    <TextField fullWidth label='Full Name' placeholder='' value={selectedRow && selectedRow.fullname} />
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
                    <TextField fullWidth label='Phone Number' placeholder='' value={selectedRow && selectedRow.phoneNumber} />
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
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
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
                        </div>
                      </TabPanel>
                      <TabPanel value='2' sx={{ p: 0 }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
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
                        </div>
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
                    <CardMedia sx={{ height: '14.5625rem' }} image={selectedRow?.profileImage} />
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                      <Typography variant='body2' sx={{ color: '#ffffff' }}>
                        EMP : {selectedRow && selectedRow.id}
                      </Typography>
                      <Typography variant='h6' sx={{ marginBottom: 2, color: '#ffffff' }}>
                        {selectedRow && selectedRow.fullname}
                      </Typography>
                      <Rating readOnly value={5} name='read-only' sx={{ marginRight: 2 }} />
                      <Typography variant='body2' sx={{ color: '#ffffff' }}>
                        {selectedRow && selectedRow.orderStatus.length} Projects
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
                      <TextField fullWidth label='Full Name' name='fullname' value={selectedRow && selectedRow.fullname} onChange={handleInputChange}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Gender' name='gender' value={selectedRow && selectedRow.gender} onChange={handleInputChange} />
                    </Grid>
                  </Grid>
                  <Grid container spacing={5} style={{ marginBottom: 20 }}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Email' name='email' value={selectedRow && selectedRow.email} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Phone Number' name='phoneNumber' value={selectedRow && selectedRow.phoneNumber}  onChange={handleInputChange}/>
                    </Grid>
                  </Grid>
                  <Grid container spacing={5} style={{ marginBottom: 20 }}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='State' name='state' value={selectedRow && selectedRow.state}  onChange={handleInputChange}/>
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
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
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
                          </div>
                        </TabPanel>
                        <TabPanel value='2' sx={{ p: 0 }}>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
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
                          </div>
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
                <Button type='button' variant='contained' size='large' onClick={handleSave} style={{ backgroundColor: '#57EBB7', color: '#455A64' }}>
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
                  <CardMedia sx={{ height: '14.5625rem' }} image={selectedRow?.profileImage} />
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <Typography variant='body2' sx={{ color: '#ffffff' }}>
                      EMP : {selectedRow && selectedRow.id}
                    </Typography>
                    <Typography variant='h6' sx={{ marginBottom: 2, color: '#ffffff' }}>
                      {selectedRow && selectedRow.fullname}
                    </Typography>
                    <Rating readOnly value={5} name='read-only' sx={{ marginRight: 2 }} />
                    <Typography variant='body2' sx={{ color: '#ffffff' }}>
                      {selectedRow && selectedRow.orderStatus.length} Projects
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
                    <TextField fullWidth label='Full Name' placeholder='' value={selectedRow && selectedRow.fullname} />
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
                    <TextField fullWidth label='Phone Number' placeholder='' value={selectedRow && selectedRow.phoneNumber} />
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
                    <Button variant='contained' sx={{ backgroundColor: '#F1F1F1', color: '#455A64', 
                    '&:hover': {
                      backgroundColor: 'red',
                      color: '#fff'}, }}>Delete</Button>
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
