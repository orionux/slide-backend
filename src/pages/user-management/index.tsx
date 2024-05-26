
// ** MUI Imports
import Card from '@mui/material/Card'


// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

// import Chats from 'src/views/chats/Chats'
import UserTable from 'src/views/tables/UserTable'

/*import UserTable from 'src/views/tables/UserTable'*/



const AccountSettings = () => {
 

  return (
    <Card>
      <UserTable />
      {/* <Chats /> */}
    </Card>
  )
}

export default AccountSettings
