// ** MUI Imports
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { styled } from '@mui/material/styles';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow, { TableRowProps } from '@mui/material/TableRow';
import TableCell, { TableCellProps, tableCellClasses } from '@mui/material/TableCell';
import { useState } from 'react';
import { Checkbox, Dialog, DialogContent, DialogActions, Button, CardContent, Grid, TextField, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface RowData {
  id: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  actionStatus: string;
  gender?: string;
}

const StyledTableCell = styled(TableCell)<TableCellProps>(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)<TableRowProps>(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-of-type td, &:last-of-type th': {
    border: 0,
  },
}));

const createData = (id: string, fullname: string, email: string, phoneNumber: string, actionStatus: string, gender?: string) => {
  return { id, fullname, email, phoneNumber, actionStatus, gender: gender || '' };
};

const initialRows = [
  createData('1', 'John Doe', 'john@example.com', '0123654789', 'Active', 'Male'),
  createData('2', 'Jane Smith', 'jane@example.com', '0123654789', 'Active', 'Female'),
  createData('3', 'Alice Johnson', 'alice@example.com', '0123654789', 'Inactive', 'Female'),
  createData('4', 'Bob Brown', 'bob@example.com', '0123654789', 'Active', 'Male'),
  createData('5', 'Eve Adams', 'eve@example.com', '0123654789', 'Inactive', 'Female'),
];

const UserTable = () => {
  const [rows, setRows] = useState(initialRows);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  const handleCheckboxClick = (row: RowData, index: number) => {
    setOpenDialog(true);
    setSelectedRow(row);
    setSelectedRowIndex(index);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRow(null);
    setSelectedRowIndex(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedRow) {
      const { name, value } = e.target;
      setSelectedRow({ ...selectedRow, [name]: value });
    }
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    if (selectedRow) {
      const { name, value } = e.target;
      setSelectedRow({ ...selectedRow, [name as string]: value });
    }
  };

  const handleSave = () => {
    if (selectedRowIndex !== null && selectedRow) {
      const updatedRows = rows.map((row, index) => 
        index === selectedRowIndex ? { ...selectedRow, gender: selectedRow.gender || '' } : row
      );
      setRows(updatedRows);
      console.log(updatedRows);
    }
    handleCloseDialog();
  };

  const handleDelete = () => {
    if (selectedRowIndex !== null) {
      const updatedRows = rows.filter((_, index) => index !== selectedRowIndex);
      setRows(updatedRows);
      console.log(updatedRows);
    }
    handleCloseDialog();
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="left">Full Name</StyledTableCell>
              <StyledTableCell align="left">Email Add</StyledTableCell>
              <StyledTableCell align="left">Phone Number</StyledTableCell>
              <StyledTableCell align="left">Action Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={row.id} onClick={() => handleCheckboxClick(row, index)}>
                <StyledTableCell component="th" scope="row">
                  <Checkbox checked={selectedRowIndex === index} readOnly /> {row.id}
                </StyledTableCell>
                <StyledTableCell align="left">{row.fullname}</StyledTableCell>
                <StyledTableCell align="left">{row.email}</StyledTableCell>
                <StyledTableCell align="left">{row.phoneNumber}</StyledTableCell>
                <StyledTableCell align="left">{row.actionStatus}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xl">
        <DialogContent style={{ maxWidth: '1000px' }}>
          <CardContent>
            <form onSubmit={(e) => e.preventDefault()}>
              <Grid container spacing={5} style={{ marginBottom: 20 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="fullname"
                    value={selectedRow ? selectedRow.fullname : ''}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="form-layouts-separator-select-label">Gender</InputLabel>
                    <Select
                      label="Gender"
                      name="gender"
                      value={selectedRow ? selectedRow.gender || '' : ''}
                      id="form-layouts-separator-select"
                      labelId="form-layouts-separator-select-label"
                      onChange={handleSelectChange}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={5} style={{ marginBottom: 20 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="email"
                    label="Email"
                    name="email"
                    value={selectedRow ? selectedRow.email : ''}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phoneNumber"
                    value={selectedRow ? selectedRow.phoneNumber : ''}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={5} style={{ marginBottom: 20 }}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="State" placeholder="" name="state" onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Company Name" placeholder="" name="companyName" onChange={handleInputChange} />
                </Grid>
              </Grid>
              <Grid container spacing={5} style={{ marginBottom: 20 }}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="VAT Number" placeholder="" name="vatNumber" onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Billing Address" placeholder="" name="billingAddress" onChange={handleInputChange} />
                </Grid>
              </Grid>
              <Grid container spacing={5} style={{ marginBottom: 20 }}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Location" placeholder="" name="location" onChange={handleInputChange} />
                </Grid>
              </Grid>
              <Grid container spacing={5} style={{ marginBottom: 0, marginTop: 20 }}>
              <Grid item xs={12} sm={4}>
                  <Button variant="contained" color="secondary" onClick={handleDelete} 
                  style={{
                    border:'1px solid'}}
                    sx={{ backgroundColor: 'transparent', color: 'red', 
                    '&:hover': {
                      backgroundColor: 'red',
                      color: '#fff'}, }}>
                    Delete User
                  </Button>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button type="submit" variant="contained" size="large" onClick={handleSave}>
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
  );
};

export default UserTable;
