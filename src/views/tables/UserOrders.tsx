// ** MUI Imports
import { SyntheticEvent, useState } from 'react'
import { CardContent, LinearProgress, Tab, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab'
import Link from 'next/link';
import { MdOutlineChat } from 'react-icons/md';



const createData = (order_id: string, project_name: string, project_responsibility: string, price: string, progress: string, start_date: string, end_date: string, sub_admin_id: string, project_image: string, project_status: string) => {
    return { order_id, project_name, project_responsibility, price, progress, start_date, end_date, sub_admin_id, project_image, project_status }
}

const rows = [
    createData('#S001', 'Project 1', 'John Doe', '25$', '10%', '2024/04/06', '2024/04/08', 'sub admin 001', '/images/services/53.png', 'Preparing'),
    createData('#S002', 'Project 2', 'John Doe', '25$', '50%', '2024/04/06', '2024/04/10', 'sub admin 002', '/images/services/17.png', 'Preparing'),
    createData('#S003', 'Project 3', 'John Doe', '25$', '80%', '2024/04/06', '2024/04/08', 'sub admin 003', '/images/services/53.png', 'InitialReview'),
    createData('#S004', 'Project 4', 'John Doe', '25$', '40%', '2024/04/06', '2024/04/07', 'sub admin 004', '/images/services/53.png', 'InitialReview'),
    createData('#S005', 'Project 5', 'John Doe', '25$', '100%', '2024/04/06', '2024/04/01', 'sub admin 005', '/images/services/17.png', 'MoreReview'),
    createData('#S006', 'Project 6', 'John Doe', '25$', '60%', '2024/04/06', '2024/04/10', 'sub admin 006', '/images/services/17.png', 'MoreReview'),
    createData('#S007', 'Project 7', 'John Doe', '25$', '100%', '2024/04/06', '2024/04/08', 'sub admin 007', '/images/services/53.png', 'Delivered'),
    createData('#S008', 'Project 8', 'John Doe', '25$', '80%', '2024/04/06', '2024/04/05', 'sub admin 008', '/images/services/53.png', 'InitialReview'),
]

const OrdersComponent = () => {

    const [value, setValue] = useState<string>('1')


    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    const calculateProgress = (progress: string) => {
        return parseInt(progress.replace('%', ''), 10)
    }

    // Function to calculate time left for each project
    const calculateTimeLeft = (endDate: string) => {
        const difference = new Date(endDate).getTime() - new Date().getTime();
        let timeLeft = '';
    
        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
    
            timeLeft = `${days}d ${hours}h ${minutes}m`;
        } else {
            timeLeft = 'Expired';
        }
    
        return timeLeft;
    };


    const getProgressBar = (status: string, progress: number) => {
        let className = '';
        switch (status) {
            case 'Preparing':
                className = 'PreparingProgress';
                break;
            case 'InitialReview':
                className = 'InitialReviewProgress';
                break;
            case 'MoreReview':
                className = 'MoreReviewProgress';
                break;
            case 'Delivered':
                className = 'DeliveredProgress';
                break;
            default:
                className = 'DefaultProgress';
                break;
        }

        return (
            <div className={className}>
                <LinearProgress variant="determinate" value={progress} />
            </div>
        );
    };

    const statusColors = {
        Preparing: '#E9E358',
        InitialReview: '#DF6FE9',
        MoreReview: '#F6AF45',
        Delivered: '#81E303',
    };

    function isValidStatus(status: string): status is keyof typeof statusColors {
        return status in statusColors;
    }
    


    return (
        <>
            <TabContext value={value} >
                <TabList onChange={handleChange} aria-label='card navigation example'
                    indicatorColor='primary'
                    textColor='primary'
                    variant='fullWidth'
                    className='deliveryInfoTabs'
                    sx={{
                        borderRadius: '50px'
                    }}
                    style={{
                        borderRadius: '25px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        color: 'red'

                    }}
                    TabIndicatorProps={{
                        style: { display: 'none' }
                    }}>
                    <Tab value='1' label='ALL' style={{ flex: 1, textAlign: 'center' }} />
                    <Tab value='2' label='Preparing' style={{ flex: 1, textAlign: 'center' }} />
                    <Tab value='3' label='Initial review' style={{ flex: 1, textAlign: 'center' }} />
                    <Tab value='4' label='More Review' style={{ flex: 1, textAlign: 'center' }} />
                    <Tab value='5' label='Delivered' style={{ flex: 1, textAlign: 'center' }} />
                </TabList>

                <CardContent>
                    <TabPanel value='1' sx={{ p: 0 }}>
                        {rows.map((row) => {
                            const backgroundColor = isValidStatus(row.project_status) ? statusColors[row.project_status] : 'defaultColor';

                            return (
                                <div key={row.order_id} style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div className="d-flex flex-row w-100 justify-content-end p-0 m-0 align-items-center">
                                        <Link passHref href="/chat-view">
                                            <div className='chatLinkPurple'>
                                                <MdOutlineChat /> Chat
                                            </div>
                                        </Link>
                                        <Link passHref href="/">
                                            <div
                                                className='chatLinkColored'
                                                style={{ backgroundColor }}
                                            >
                                                <MdOutlineChat /> {row.project_status}
                                            </div>
                                        </Link>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'row', padding: '10px', boxShadow: '0px 2px 4px rgba(2, 3, 5, 0.15)', borderRadius: '20px', margin: '10px' }}>
                                        <div style={{ width: '75%', marginRight: '10px' }}>
                                            <div style={{ display: 'flex', paddingTop: '20px', paddingBottom: '20px' }}>
                                                <Typography>
                                                    {row.project_name} | Order{row.order_id} |
                                                    {row.project_responsibility}
                                                </Typography>
                                            </div>
                                            {/* progressbar */}
                                            <div style={{ width: "300px" }}>
                                                {/* <LinearProgress variant="determinate" value={calculateProgress(row.progress)} /> */}
                                                {getProgressBar(row.project_status, calculateProgress(row.progress))}
                                            </div>
                                            <div style={{ display: 'flex', paddingTop: '20px', paddingBottom: '20px' }}>
                                                <Typography>
                                                    {row.price} | Start Date : {row.start_date} | Delivery Date : {row.end_date} | Subadmin ID : {row.sub_admin_id}
                                                </Typography>
                                            </div>
                                        </div>
                                        <div style={{ width: '25%', marginRight: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'end', alignItems: 'center' }}>
                                            <Typography>
                                                Time Left: {calculateTimeLeft(row.end_date)}
                                            </Typography>
                                            <img src={`${row.project_image}`} alt="" style={{ width: '150px', height: 'auto', marginBottom: '10px' }}></img>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </TabPanel>
                    <TabPanel value='2' sx={{ p: 0 }}>
                        {rows.map((row) => {
                            const backgroundColor = isValidStatus(row.project_status) ? statusColors[row.project_status] : 'defaultColor';

                            return row.project_status === 'Preparing' && (
                                <div key={row.order_id} style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div className="d-flex flex-row w-100 justify-content-end p-0 m-0 align-items-center">
                                        <Link passHref href="/chat-view">
                                            <div className='chatLinkPurple'>
                                                <MdOutlineChat /> Chat
                                            </div>
                                        </Link>
                                        <Link passHref href="/">
                                            <div
                                                className='chatLinkColored'
                                                style={{ backgroundColor }}
                                            >
                                                <MdOutlineChat /> {row.project_status}
                                            </div>
                                        </Link>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'row', padding: '10px', boxShadow: '0px 2px 4px rgba(2, 3, 5, 0.15)', borderRadius: '20px', margin: '10px' }}>
                                        <div style={{ width: '75%', marginRight: '10px' }}>
                                            <div style={{ display: 'flex', paddingTop: '20px', paddingBottom: '20px' }}>
                                                <Typography>
                                                    {row.project_name} | Order{row.order_id} |
                                                    {row.project_responsibility}
                                                </Typography>
                                            </div>
                                            {/* progressbar */}
                                            <div style={{ width: "300px" }}>
                                                {/* <LinearProgress variant="determinate" value={calculateProgress(row.progress)} /> */}
                                                {getProgressBar(row.project_status, calculateProgress(row.progress))}
                                            </div>
                                            <div style={{ display: 'flex', paddingTop: '20px', paddingBottom: '20px' }}>
                                                <Typography>
                                                    {row.price} | Start Date : {row.start_date} | Delivery Date : {row.end_date} | Subadmin ID : {row.sub_admin_id}
                                                </Typography>
                                            </div>
                                        </div>
                                        <div style={{ width: '25%', marginRight: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'end', alignItems: 'center' }}>
                                            <Typography>
                                                Time Left: {calculateTimeLeft(row.end_date)}
                                            </Typography>
                                            <img src={`${row.project_image}`} alt="" style={{ width: '150px', height: 'auto', marginBottom: '10px' }}></img>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </TabPanel>
                    <TabPanel value='3' sx={{ p: 0 }}>
                        {rows.map((row) => {
                            const backgroundColor = isValidStatus(row.project_status) ? statusColors[row.project_status] : 'defaultColor';

                            return row.project_status === 'InitialReview' && (
                                <div key={row.order_id} style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div className="d-flex flex-row w-100 justify-content-end p-0 m-0 align-items-center">
                                        <Link passHref href="/chat-view">
                                            <div className='chatLinkPurple'>
                                                <MdOutlineChat /> Chat
                                            </div>
                                        </Link>
                                        <Link passHref href="/">
                                            <div
                                                className='chatLinkColored'
                                                style={{ backgroundColor }}
                                            >
                                                <MdOutlineChat /> {row.project_status}
                                            </div>
                                        </Link>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'row', padding: '10px', boxShadow: '0px 2px 4px rgba(2, 3, 5, 0.15)', borderRadius: '20px', margin: '10px' }}>
                                        <div style={{ width: '75%', marginRight: '10px' }}>
                                            <div style={{ display: 'flex', paddingTop: '20px', paddingBottom: '20px' }}>
                                                <Typography>
                                                    {row.project_name} | Order{row.order_id} |
                                                    {row.project_responsibility}
                                                </Typography>
                                            </div>
                                            {/* progressbar */}
                                            <div style={{ width: "300px" }}>
                                                {/* <LinearProgress variant="determinate" value={calculateProgress(row.progress)} /> */}
                                                {getProgressBar(row.project_status, calculateProgress(row.progress))}
                                            </div>
                                            <div style={{ display: 'flex', paddingTop: '20px', paddingBottom: '20px' }}>
                                                <Typography>
                                                    {row.price} | Start Date : {row.start_date} | Delivery Date : {row.end_date} | Subadmin ID : {row.sub_admin_id}
                                                </Typography>
                                            </div>
                                        </div>
                                        <div style={{ width: '25%', marginRight: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'end', alignItems: 'center' }}>
                                            <Typography>
                                                Time Left: {calculateTimeLeft(row.end_date)}
                                            </Typography>
                                            <img src={`${row.project_image}`} alt="" style={{ width: '150px', height: 'auto', marginBottom: '10px' }}></img>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </TabPanel>
                    <TabPanel value='4' sx={{ p: 0 }}>
                        {rows.map((row) => {
                            const backgroundColor = isValidStatus(row.project_status) ? statusColors[row.project_status] : 'defaultColor';

                            return row.project_status === 'MoreReview' && (
                                <div key={row.order_id} style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div className="d-flex flex-row w-100 justify-content-end p-0 m-0 align-items-center">
                                        <Link passHref href="/chat-view">
                                            <div className='chatLinkPurple'>
                                                <MdOutlineChat /> Chat
                                            </div>
                                        </Link>
                                        <Link passHref href="/">
                                            <div
                                                className='chatLinkColored'
                                                style={{ backgroundColor }}
                                            >
                                                <MdOutlineChat /> {row.project_status}
                                            </div>
                                        </Link>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'row', padding: '10px', boxShadow: '0px 2px 4px rgba(2, 3, 5, 0.15)', borderRadius: '20px', margin: '10px' }}>
                                        <div style={{ width: '75%', marginRight: '10px' }}>
                                            <div style={{ display: 'flex', paddingTop: '20px', paddingBottom: '20px' }}>
                                                <Typography>
                                                    {row.project_name} | Order{row.order_id} |
                                                    {row.project_responsibility}
                                                </Typography>
                                            </div>
                                            {/* progressbar */}
                                            <div style={{ width: "300px" }}>
                                                {/* <LinearProgress variant="determinate" value={calculateProgress(row.progress)} /> */}
                                                {getProgressBar(row.project_status, calculateProgress(row.progress))}
                                            </div>
                                            <div style={{ display: 'flex', paddingTop: '20px', paddingBottom: '20px' }}>
                                                <Typography>
                                                    {row.price} | Start Date : {row.start_date} | Delivery Date : {row.end_date} | Subadmin ID : {row.sub_admin_id}
                                                </Typography>
                                            </div>
                                        </div>
                                        <div style={{ width: '25%', marginRight: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'end', alignItems: 'center' }}>
                                            <Typography>
                                                Time Left: {calculateTimeLeft(row.end_date)}
                                            </Typography>
                                            <img src={`${row.project_image}`} alt="" style={{ width: '150px', height: 'auto', marginBottom: '10px' }}></img>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </TabPanel>
                    <TabPanel value='5' sx={{ p: 0 }}>
                        {rows.map((row) => {
                            const backgroundColor = isValidStatus(row.project_status) ? statusColors[row.project_status] : 'defaultColor';

                            return row.project_status === 'Delivered' && (
                                <div key={row.order_id} style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div className="d-flex flex-row w-100 justify-content-end p-0 m-0 align-items-center">
                                        <Link passHref href="/chat-view">
                                            <div className='chatLinkPurple'>
                                                <MdOutlineChat /> Chat
                                            </div>
                                        </Link>
                                        <Link passHref href="/">
                                            <div
                                                className='chatLinkColored'
                                                style={{ backgroundColor }}
                                            >
                                                <MdOutlineChat /> {row.project_status}
                                            </div>
                                        </Link>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'row', padding: '10px', boxShadow: '0px 2px 4px rgba(2, 3, 5, 0.15)', borderRadius: '20px', margin: '10px' }}>
                                        <div style={{ width: '75%', marginRight: '10px' }}>
                                            <div style={{ display: 'flex', paddingTop: '20px', paddingBottom: '20px' }}>
                                                <Typography>
                                                    {row.project_name} | Order{row.order_id} |
                                                    {row.project_responsibility}
                                                </Typography>
                                            </div>
                                            {/* progressbar */}
                                            <div style={{ width: "300px" }}>
                                                {/* <LinearProgress variant="determinate" value={calculateProgress(row.progress)} /> */}
                                                {getProgressBar(row.project_status, calculateProgress(row.progress))}
                                            </div>
                                            <div style={{ display: 'flex', paddingTop: '20px', paddingBottom: '20px' }}>
                                                <Typography>
                                                    {row.price} | Start Date : {row.start_date} | Delivery Date : {row.end_date} | Subadmin ID : {row.sub_admin_id}
                                                </Typography>
                                            </div>
                                        </div>
                                        <div style={{ width: '25%', marginRight: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'end', alignItems: 'center' }}>
                                            <Typography>
                                                Time Left: {calculateTimeLeft(row.end_date)}
                                            </Typography>
                                            <img src={`${row.project_image}`} alt="" style={{ width: '150px', height: 'auto', marginBottom: '10px' }}></img>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </TabPanel>
                </CardContent>
            </TabContext>
        </>
    )
}

export default OrdersComponent
