/* eslint-disable @typescript-eslint/no-unused-vars */
// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { authenticateUser } from 'src/utils/authUtils'

type UserType = 'admin' | 'subadmin' | 'user';

interface Props {
  userType: UserType;
}



const Dashboard: React.FC<Props> = () => {

  const router = useRouter();
  const [userType, setUserType] = useState('');
  const [authChecked, setAuthChecked] = useState(false);


  useEffect(() => {
    const userType = localStorage.getItem('userType');
    
    if (!userType) {
      router.replace('/pages/login');
    } else {
      setUserType(userType);
    }
    
    setAuthChecked(true);
  }, []);
  

  const renderComponentByUserType = () => {
    switch (userType) {
      case 'admin':
        return <AdminComponent />;
      case 'subadmin':
        return <SubAdminComponent />;
      case 'user':
        return <RegularUserComponent />;
      default:
        return null;
    }
  };


  if (!authChecked) {
    return null; 
  }

  return (
    <div>
      {renderComponentByUserType()}
    </div>
  );
}




const AdminComponent: React.FC = () => {
  return (
    <>
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Trophy />
        </Grid>
        <Grid item xs={12} md={8}>
          <StatisticsCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <WeeklyOverview />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TotalEarning />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='$25.6k'
                icon={<Poll />}
                color='success'
                trendNumber='+42%'
                title='Total Profit'
                subtitle='Weekly Profit'
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='$78'
                title='Refunds'
                trend='negative'
                color='secondary'
                trendNumber='-15%'
                subtitle='Past Month'
                icon={<CurrencyUsd />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='862'
                trend='negative'
                trendNumber='-18%'
                title='New Project'
                subtitle='Yearly Project'
                icon={<BriefcaseVariantOutline />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='15'
                color='warning'
                trend='negative'
                trendNumber='-18%'
                subtitle='Last Week'
                title='Sales Queries'
                icon={<HelpCircleOutline />}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <SalesByCountries />
        </Grid>
        <Grid item xs={12} md={12} lg={8}>
          <DepositWithdraw />
        </Grid>
        <Grid item xs={12}>
          <Table />
        </Grid>
      </Grid>
    </ApexChartWrapper>
    </>
  );
};

const SubAdminComponent: React.FC = () => {
  return (
    <>
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Trophy />
        </Grid>
        <Grid item xs={12} md={4}>
        <Trophy />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
        <Trophy />
        </Grid>
      </Grid>
    </ApexChartWrapper>
    </>
  );
};

const RegularUserComponent: React.FC = () => {
  return (
    <>
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} >
          <Trophy />
        </Grid>
        <Grid item xs={12} >
        <Trophy />
        </Grid>
        <Grid item xs={12} >
        <Trophy />
        </Grid>
      </Grid>
    </ApexChartWrapper>
    </>
  );
};

export default Dashboard
