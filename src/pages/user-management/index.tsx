
// ** MUI Imports
import Card from '@mui/material/Card'


// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import ProtectedRoute from 'src/@core/components/ProtectedRoute'

// import Chats from 'src/views/chats/Chats'
import UserTable from 'src/views/tables/UserTable'

/*import UserTable from 'src/views/tables/UserTable'*/



const AccountSettings = () => {
 

  return (
    <ProtectedRoute>

    <Card>
      <UserTable />
      {/* <Chats /> */}
    </Card>
    </ProtectedRoute>
  )
}

export default AccountSettings
