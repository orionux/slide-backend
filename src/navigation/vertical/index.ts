// ** Icon imports
import Login from 'mdi-material-ui/Login'

// import Table from 'mdi-material-ui/Table'
// import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'User Management ',
      icon: AccountCogOutline,
      path: '/user-management'
    },

    // {
    //   sectionTitle: 'Pages'
    // },
    {
      title: 'Sub-admin management',
      icon: Login,
      path: '/sub-admin-management'
    },
    {
      title: 'Services & Category Management',
      icon: Login,
      path: '/service-and-category-managemen'
    },
    {
      title: 'Cost Matrix Management',
      icon: AccountPlusOutline,
      path: '/pages/register',
      openInNewTab: true
    },
    {
      title: 'Order Management',
      icon: AlertCircleOutline,
      path: 'order-management',
      
      // openInNewTab: true
    },

    // {
    //   sectionTitle: 'User Interface'
    // },
    {
      title: 'Chat Implementation & Moderation',
      icon: FormatLetterCase,
      path: '/typography'
    },
    {
      title: 'Payment & Transaction Management',
      path: '/payment-and-transaction-management',
      icon: GoogleCirclesExtended
    },
    {
      title: 'Logout',
      icon: CreditCardOutline,
      path: '/cards'
    },

    // {
    //   title: 'Tables',
    //   icon: Table,
    //   path: '/tables'
    // },
    // {
    //   icon: CubeOutline,
    //   title: 'Form Layouts',
    //   path: '/form-layouts'
    // }
  ]
}

export default navigation
