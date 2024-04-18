import { ReactNode, useEffect, useState } from 'react'
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// !Do not remove this Layout import
import VerticalLayout from 'src/@core/layouts/VerticalLayout'
import VerticalAppBarContent from './components/vertical/AppBarContent'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'
import navigation from 'src/navigation/vertical'
import { VerticalNavItemsType } from 'src/@core/layouts/types'

interface Props {
  children: ReactNode;
  userType: string;
}

const UserLayout = ({ userType, children }: Props) => {

  console.log("user type: ", userType)

  const { settings, saveSettings } = useSettings()
  const [navItems, setNavItems] = useState<VerticalNavItemsType>([]);


  const [loggedUserType, setLoggedUserType] = useState('')
  
  // get user type for navigation filter
  useEffect(() => {
    // const items = navigation(userType); 
    // setNavItems(items); 

    const type = localStorage.getItem('userType') || '';
    setLoggedUserType(type);
    const items = navigation(loggedUserType); 
    setNavItems(items);
  }, [loggedUserType]); 
  
  
  
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))


  return (
    <VerticalLayout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      verticalNavItems={navItems}
      verticalAppBarContent={(
        props // AppBar Content
      ) => (
        <VerticalAppBarContent
          hidden={hidden}
          settings={settings}
          saveSettings={saveSettings}
          toggleNavVisibility={props.toggleNavVisibility}
        />
      )}
    >
      {children}
      {/* <UpgradeToProButton /> */}
    </VerticalLayout>
  )
}

export default UserLayout
