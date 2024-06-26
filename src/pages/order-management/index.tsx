
// ** MUI Imports
import Card from '@mui/material/Card'


// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import OrderManagementComponent from 'src/views/tables/OrderManagementComponent'



const AccountSettings = () => {
 

  return (
    <Card style={{borderTopLeftRadius:'25px', borderTopRightRadius:'25px'}}>
      <OrderManagementComponent />
    </Card>
  )
}

export default AccountSettings
