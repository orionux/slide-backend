// ** Icon imports
import Login from 'mdi-material-ui/Login'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'

const navigation = (userType: string | undefined): VerticalNavItemsType => {
  // Define all navigation items
  const allNavItems = [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Orders',
      icon: HomeOutline,
      path: '/user-management'
    },
    {
      title: 'Account',
      icon: HomeOutline,
      path: '/user-management'
    },
    {
      title: 'Chats',
      icon: HomeOutline,
      path: '/user-management'
    },
    {
      title: 'Info',
      icon: HomeOutline,
      path: '/user-management'
    },
    {
      title: 'User Management',
      icon: AccountCogOutline,
      path: '/user-management'
    },
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
    },
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
  ];

  // Define navigation items based on user type
  let filteredNavItems: VerticalNavItemsType | ({ title: string; icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string }; path: string; openInNewTab?: undefined } | { title: string; icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string }; path: string; openInNewTab: boolean })[] = [];
  if (userType === 'admin') {
    // Admin gets all items
    filteredNavItems = allNavItems.filter(item =>
      item.title !== 'Orders' &&
      item.title !== 'Account' &&
      item.title !== 'Chats' &&
      item.title !== 'Info'
    );
  } else if (userType === 'subadmin') {
    // Subadmin gets specific items
    filteredNavItems = allNavItems.filter(item =>
      item.title !== 'User Management' &&
      item.title !== 'Sub-admin management' &&
      item.title !== 'Payment & Transaction Management' &&
      item.title !== 'Cost Matrix Management' &&
      item.title !== 'Services & Category Management' &&
      item.title !== 'Orders' &&
      item.title !== 'Account' &&
      item.title !== 'Chats' &&
      item.title !== 'Info'
    );
  } else if (userType === 'user') {
    // Regular user gets specific items
    filteredNavItems = allNavItems.filter(item =>
      item.title !== 'User Management' &&
      item.title !== 'Sub-admin management' &&
      item.title !== 'Payment & Transaction Management' &&
      item.title !== 'Order Management' &&
      item.title !== 'Chat Implementation & Moderation' &&
      item.title !== 'Cost Matrix Management' &&
      item.title !== 'Services & Category Management' &&
      item.title !== 'Logout'
    );
  }

  return filteredNavItems;
}

export default navigation;
