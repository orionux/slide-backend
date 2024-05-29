import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { styled } from '@mui/material/styles';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow, { TableRowProps } from '@mui/material/TableRow';
import TableCell, { TableCellProps, tableCellClasses } from '@mui/material/TableCell';
import { Checkbox, Dialog, DialogContent, DialogActions, Button, CardContent, Grid, TextField, Typography } from '@mui/material';
import { AiOutlineCloseCircle } from 'react-icons/ai';

interface RowData {
  service_id: string;
  service_name: string;
  service_desc: string;
  service_image: string;
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
  '&:last-of-type td, &:last-of-type th': {
    border: 0,
  },
}));

const createData = (service_id: string, service_name: string, service_desc: string, service_image: string) => {
  return { service_id, service_name, service_desc, service_image };
};

const initialRows = [
  createData('#S001', 'Fix up Slideshows', 'Transform the look of existing slides & contents, and supercharge the impact of your presentation', '/images/services/Pattern.png'),
  createData('#S002', 'Fix up Slideshows', 'Transform the look of existing slides & contents, and supercharge the impact of your presentation', '/images/services/Pattern.png'),
  createData('#S003', 'Fix up Slideshows', 'Transform the look of existing slides & contents, and supercharge the impact of your presentation', '/images/services/Pattern.png'),
  createData('#S004', 'Fix up Slideshows', 'Transform the look of existing slides & contents, and supercharge the impact of your presentation', '/images/services/Pattern.png'),
  createData('#S005', 'Fix up Slideshows', 'Transform the look of existing slides & contents, and supercharge the impact of your presentation', '/images/services/Pattern.png'),
];

const ServiceTable = () => {
  const [rows, setRows] = useState<RowData[]>(initialRows);
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (selectedRow) {
      setSelectedRow((prevState) => ({
        ...prevState!,
        [name]: value,
      }));
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0] && selectedRow) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setSelectedRow((prevState) => ({
          ...prevState!,
          service_image: imageUrl,
        }));
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (selectedRow && selectedRowIndex !== null) {
      const updatedRows = [...rows];
      updatedRows[selectedRowIndex] = selectedRow;
      setRows(updatedRows);
      console.log("Updated rows:", updatedRows);
    }
    handleCloseDialog();
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Service_ID</StyledTableCell>
              <StyledTableCell align='left'>Service Name</StyledTableCell>
              <StyledTableCell align='left'>Description</StyledTableCell>
              <StyledTableCell align='left'>Image</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={row.service_id} onClick={() => handleCheckboxClick(row, index)}>
                <StyledTableCell component='th' scope='row'>
                  <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Checkbox checked={selectedRowIndex === index} readOnly /> {row.service_id}
                  </span>
                </StyledTableCell>
                <StyledTableCell align='left'><b>{row.service_name}</b></StyledTableCell>
                <StyledTableCell align='left'>{row.service_desc}</StyledTableCell>
                <StyledTableCell align='left'>
                  <img src={row.service_image} width={100} height={100} alt='' />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth='xl'>
        <DialogActions>
          <Button onClick={handleCloseDialog}>
            <AiOutlineCloseCircle style={{ fontSize: '25px' }} />
          </Button>
        </DialogActions>
        <DialogContent style={{ maxWidth: '1000px' }}>
          <CardContent>
            <form onSubmit={(e) => e.preventDefault()}>
              <Grid container spacing={5} style={{ marginBottom: 20 }}>
                <Grid item xs={12} sm={3} style={{ display: 'flex', flexDirection: 'column' }}>
                  <img src={selectedRow?.service_image} alt='' style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
                  <input
                    type='file'
                    accept='image/*'
                    style={{ display: 'none' }}
                    id='image-upload'
                    onChange={handleImageUpload}
                  />
                  <label htmlFor='image-upload'>
                    <Button variant='contained' size='large' style={{ backgroundColor: '#455A64', color: '#ffffff' }} component='span'>
                      Add Image
                    </Button>
                  </label>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <Typography variant='h6' sx={{ marginBottom: '20px', color: '#455A64' }}>
                    Service Info
                  </Typography>
                  <TextField fullWidth label='Service ID' name='service_id' value={selectedRow?.service_id || ''} onChange={handleInputChange} style={{ marginBottom: '25px' }} />
                  <TextField fullWidth label='Service Name' name='service_name' value={selectedRow?.service_name || ''} onChange={handleInputChange} style={{ marginBottom: '25px' }} />
                  <TextField fullWidth label='Service Description' name='service_desc' value={selectedRow?.service_desc || ''} onChange={handleInputChange} style={{ marginBottom: '25px' }} />
                </Grid>
              </Grid>
              <Grid container spacing={5} style={{ marginBottom: 20, display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
                <Button type='button' variant='contained' size='large' onClick={handleCloseDialog} style={{ marginRight: '20px', backgroundColor: '#FFF', color: '#455A64', border: 'solid 1px #455A64' }}>
                  Cancel
                </Button>
                <Button type='button' variant='contained' size='large' onClick={handleSubmit} style={{ backgroundColor: '#57EBB7', color: '#455A64' }}>
                  Submit
                </Button>
              </Grid>
            </form>
          </CardContent>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ServiceTable;
