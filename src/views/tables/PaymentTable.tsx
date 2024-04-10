// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import { styled } from '@mui/material/styles'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow, { TableRowProps } from '@mui/material/TableRow'
import TableCell, { TableCellProps, tableCellClasses } from '@mui/material/TableCell'
import { Checkbox } from '@mui/material';
import Link from 'next/link'
import {  FaDownload, FaEllipsisVertical } from 'react-icons/fa6'


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

const createData = (invoiceId: string, date: string, billingName: string, amount: string, status: string, pdf: string) => {
  return { invoiceId, date, billingName, amount, status, pdf }
}

const rows = [
  createData('1', '2024-04-01', 'John Doe', '1000', 'Paid', '#'),
  createData('2', '2024-04-01', 'Jane Smith', '2000', 'Pending', '#'),
  createData('3', '2024-04-01', 'Alice Johnson', '3000', 'Paid', '#'),
  createData('4', '2024-04-01', 'Bob Brown', '4000', 'Cancelled', '#'),
  createData('5', '2024-04-01', 'Eve Adams', '5000', 'Paid', '#')
]

const PaymentTable = () => {


  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Invoice ID</StyledTableCell>
              <StyledTableCell align='left'>Date</StyledTableCell>
              <StyledTableCell align='left'>Billing Name</StyledTableCell>
              <StyledTableCell align='left'>Amount</StyledTableCell>
              <StyledTableCell align='left'>Status</StyledTableCell>
              <StyledTableCell align='left'>PDF</StyledTableCell>
              <StyledTableCell align='left'>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <><StyledTableRow key={row.invoiceId}>
                <StyledTableCell component='th' scope='row'>
                  <Checkbox readOnly /> {row.invoiceId}
                </StyledTableCell>
                <StyledTableCell align='left'>{row.date}</StyledTableCell>
                <StyledTableCell align='left'>{row.billingName}</StyledTableCell>
                <StyledTableCell align='left'>{row.amount}</StyledTableCell>
                <StyledTableCell align='left'>{row.status}</StyledTableCell>
                <StyledTableCell align='left'>
                  <Link passHref href={row.pdf}>
                    <span style={{backgroundColor: '#41EDB1', color: '#263238', padding: '8px 20px'}}><FaDownload /> PDF</span>
                  </Link>
                </StyledTableCell>
                <StyledTableCell align='left'><FaEllipsisVertical /> </StyledTableCell>
              </StyledTableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default PaymentTable
