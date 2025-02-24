import React, { useEffect, useState } from 'react';
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
import { useAuth } from 'src/@core/context/AuthContext';
import { enqueueSnackbar } from 'notistack';
import { addServiceApi, getAllServices, updateServiceApi } from 'src/pages/api/ServiceManagement';

// interface RowData {
//   service_id: string;
//   service_name: string;
//   service_desc: string;
//   service_image: string;
// }
interface Row {
  id: string;
  service_id: string;
  featured_image: string;
  name: string;
  description: string;
}
interface RowUpdated {
  id: string;
  service_id: string;
  featured_image: File;
  name: string;
  description: string;
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
  // const [rows, setRows] = useState<RowData[]>(initialRows);
  const [rows, setRows] = useState<Row[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [addReqBody, setAddReqBody] = useState<Row | null>(null);
  const [updateReqBody, setUpdateReqBody] = useState<RowUpdated | null>(null);
  const [selectedRow, setSelectedRow] = useState<Row | null>(null);
  const [addService, setAddService] = useState<Row | null>(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
  const [addLoading, setAddLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const { apiConfig, isAuthenticated } = useAuth()
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageUpdate, setSelectedImageUpdate] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleCheckboxClick = (row: Row, index: number) => {
    setOpenDialog(true);
    setSelectedRow(row);
    setSelectedRowIndex(index);

  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRow(null);
    setSelectedRowIndex(null);
  };
  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleInputChangeAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (setAddReqBody) {
      setAddReqBody((prevState) => ({
        ...prevState!,
        [name]: value,
      }));
    }
  };
  const handleInputChangeUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // if (setUpdateReqBody) {
    //   setUpdateReqBody((prevState) => ({
    //     ...prevState!,
    //     [name]: value,
    //   }));
    // }
    if (selectedRow) {
      setSelectedRow((prevState) => ({
        ...prevState!,
        [name]: value,
      }));
    }
  };

  const handleImageUploadAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setAddReqBody((prevState) => ({
        ...prevState!,
        image: file,
      }));
    }
  };
  const handleImageUploadUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // setSelectedImage(URL.createObjectURL(file)); // Preview the image
      // setSelectedImage(URL.createObjectURL(file)); // Preview the image
      setSelectedRow((prevState) => ({
        ...prevState!,
        featured_image: (URL.createObjectURL(file)),
        // featured_image: file,
      }));
      setUpdateReqBody((prevState) => ({
        ...prevState!,
        featured_image: file, // Store the file object
      }));
    }
  };

  const handleSubmitUpdate = () => {
    // if (selectedRow && selectedRowIndex !== null) {
    //   const updatedRows = [...rows];
    //   updatedRows[selectedRowIndex] = selectedRow;
    //   setRows(updatedRows);
    //   console.log("Updated rows:", updatedRows);
    // }
    // handleCloseDialog();

    // console.log(selectedRow);


    if (updateReqBody?.featured_image) {

      const updatedBodyReq = {
        ...selectedRow,
        featured_image: updateReqBody?.featured_image
      }

      console.log("image have ",updatedBodyReq)

      handleUpdateService(updatedBodyReq)
    } else {

      const updatedBodyReq = {

        id: selectedRow?.id,
        service_id: selectedRow?.service_id,
        // featured_image: selectedRow?.featured_image,  
        name: selectedRow?.name,
        description: selectedRow?.description
      }

      console.log("no image",updatedBodyReq)

      handleUpdateService(updatedBodyReq)

    }

  };
  const handleSubmitAdd = () => {
    // console.log(addReqBody)
    handleAddService(addReqBody)

  };

  const handleAddNewService = () => {
    setOpenAddDialog(true)
    // const lastServiceId = rows[rows.length - 1].service_id;
    // const newServiceIdNumber = parseInt(lastServiceId.replace('#S', '')) + 1;
    // const newServiceId = `#S${newServiceIdNumber.toString().padStart(3, '0')}`;

    // const newService = createData(
    //   newServiceId,
    //   'New Service',
    //   'Description of new service',
    //   '/images/services/Pattern.png'
    // );

    // setRows([...rows, newService]);
  };


  //API Calls
  const fetchServices = async () => {
    setLoading(true)
    // console.log(apiConfig);

    const result = await getAllServices(apiConfig)

    if (result.responseType === 'success') {
      // updateRows(result?.output?.data)
      setRows(result?.output?.data)
      setLoading(false)
    } else if (result.responseType === 'fail') {
      setLoading(false)
      enqueueSnackbar(result.output.message || 'Retrieving services failed', { variant: 'error' });
    } else if (result.responseType === 'error') {
      setLoading(false)
      enqueueSnackbar(result.output.message || 'An error occurred', { variant: 'error' });
    }
  }

  const handleAddService = async (formData: any) => {
    setAddLoading(true)
    const result = await addServiceApi(formData, apiConfig)

    if (result.responseType === 'success') {
      fetchServices();
      setOpenAddDialog(false)
      setAddLoading(false)
      setSelectedImage(null)
      enqueueSnackbar('Services added successful!', { variant: 'success' });
      // handleCloseSubAdmin();
      // fetchSubAdmins()
    } else if (result.responseType === 'fail') {
      setAddLoading(false)
      enqueueSnackbar(result.output.message || 'something went wrong', { variant: 'error' });
    } else if (result.responseType === 'error') {
      setAddLoading(false)
      enqueueSnackbar(result.output.message || 'An error occurred', { variant: 'error' });
    }

  }
  const handleUpdateService = async (formData: any) => {
    setUpdateLoading(true)
    const result = await updateServiceApi(formData, apiConfig)

    if (result.responseType === 'success') {
      
      // setOpenAddDialog(false)
      // setSelectedImage(null)
      
      setSelectedRow(null)
      setUpdateLoading(false)
      setSelectedRow(null)
      setUpdateReqBody(null)
      enqueueSnackbar('Services updated successful!', { variant: 'success' });
      setOpenDialog(false);
      fetchServices();
    } else if (result.responseType === 'fail') {
      setUpdateLoading(false)
      enqueueSnackbar(result.output.message || 'something went wrong', { variant: 'error' });
    } else if (result.responseType === 'error') {
      setUpdateLoading(false)
      enqueueSnackbar(result.output.message || 'An error occurred', { variant: 'error' });
    }

  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchServices();
    }
  }, [apiConfig])


  return (
    <>
      <Grid container alignItems="center">
        <Grid item sm={3}>
          <CardContent>
            <Button
              variant='contained'
              sx={{ backgroundColor: '#57EBB7', color: '#455A64' }}
              onClick={handleAddNewService}>
              Add New Service
            </Button>
          </CardContent>
        </Grid>
        <Grid item sm={6} container justifyContent="center">
          <CardContent>
            <Typography
              sx={{
                color: '#000',
                fontFamily: '"Syne", sans-serif !important;',
                fontSize: '20px',
                fontWeight: 700
              }}
            >
              Service Page
            </Typography>
          </CardContent>
        </Grid>
      </Grid>


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
              <StyledTableRow key={row.id} onClick={() => handleCheckboxClick(row, index)}>
                <StyledTableCell component='th' scope='row'>
                  <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Checkbox checked={selectedRowIndex === index} readOnly /> {row.id}
                  </span>
                </StyledTableCell>
                <StyledTableCell align='left'><b>{row.name}</b></StyledTableCell>
                <StyledTableCell align='left'>{row.description}</StyledTableCell>
                <StyledTableCell align='left'>
                  <img src={row.featured_image} width={100} height={100} alt='' />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


      {/* add service dialog  */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog} maxWidth="xl">
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>
            <AiOutlineCloseCircle style={{ fontSize: "25px" }} />
          </Button>
        </DialogActions>
        <DialogContent style={{ maxWidth: "1000px" }}>
          <CardContent>
            <form onSubmit={(e) => e.preventDefault()}>
              <Grid container spacing={5} style={{ marginBottom: 20 }}>
                {/* Image Upload Section */}
                <Grid item xs={12} sm={3} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  {/* Image Preview Box */}
                  <div
                    style={{
                      width: "100%",
                      height: "200px",
                      border: "2px dashed #455A64",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "10px",
                      backgroundColor: "#f4f4f4",
                    }}
                  >
                    {selectedImage ? (
                      <img
                        src={selectedImage}
                        alt="Preview"
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        No Image Selected
                      </Typography>
                    )}
                  </div>

                  {/* Hidden File Input */}
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    id="image-upload"
                    onChange={handleImageUploadAdd}
                  />
                  <label htmlFor="image-upload">
                    <Button
                      variant="contained"
                      size="large"
                      style={{ backgroundColor: "#455A64", color: "#ffffff" }}
                      component="span"
                    >
                      Add Image
                    </Button>
                  </label>
                </Grid>

                {/* Service Info Section */}
                <Grid item xs={12} sm={9}>
                  <Typography variant="h6" sx={{ marginBottom: "20px", color: "#455A64" }}>
                    Service Info
                  </Typography>
                  <TextField
                    fullWidth
                    label="Service ID"
                    name="service_id"
                    // value={selectedRow?.id || ""}
                    onChange={handleInputChangeAdd}
                    style={{ marginBottom: "25px" }}
                  />
                  <TextField
                    fullWidth
                    label="Service Name"
                    name="name"
                    // value={selectedRow?.name || ""}
                    onChange={handleInputChangeAdd}
                    style={{ marginBottom: "25px" }}
                  />
                  <TextField
                    fullWidth
                    label="Service Description"
                    name="description"
                    // value={selectedRow?.description || ""}
                    onChange={handleInputChangeAdd}
                    style={{ marginBottom: "25px" }}
                  />
                </Grid>
              </Grid>

              {/* Action Buttons */}
              <Grid
                container
                spacing={5}
                style={{ marginBottom: 20, display: "flex", flexDirection: "row", justifyContent: "end" }}
              >
                <Button
                  type="button"
                  variant="contained"
                  size="large"
                  onClick={handleCloseAddDialog}
                  style={{
                    marginRight: "20px",
                    backgroundColor: "#FFF",
                    color: "#455A64",
                    border: "solid 1px #455A64",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  size="large"
                  onClick={handleSubmitAdd}
                  style={{ backgroundColor: "#57EBB7", color: "#455A64" }}
                >
                  Submit
                </Button>
              </Grid>
            </form>
          </CardContent>
        </DialogContent>
      </Dialog>


      {/* Update service dialog  */}
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
                  <img src={selectedRow?.featured_image} alt='' style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
                  <input
                    type='file'
                    accept='image/*'
                    style={{ display: 'none' }}
                    id='image-upload'
                    onChange={handleImageUploadUpdate}
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
                  <TextField fullWidth label='Service ID' name='service_id' value={selectedRow?.id} disabled onChange={handleInputChangeUpdate} style={{ marginBottom: '25px' }} />
                  <TextField fullWidth label='Service Name' name='name' value={selectedRow?.name} onChange={handleInputChangeUpdate} style={{ marginBottom: '25px' }} />
                  <TextField fullWidth label='Service Description' name='description' value={selectedRow?.description} onChange={handleInputChangeUpdate} style={{ marginBottom: '25px' }} />
                </Grid>
              </Grid>
              <Grid container spacing={5} style={{ marginBottom: 20, display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
                <Button type='button' variant='contained' size='large' onClick={handleCloseDialog} style={{ marginRight: '20px', backgroundColor: '#FFF', color: '#455A64', border: 'solid 1px #455A64' }}>
                  Cancel
                </Button>
                <Button type='button' variant='contained' size='large' onClick={handleSubmitUpdate} style={{ backgroundColor: '#57EBB7', color: '#455A64' }}>
                  Update
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
