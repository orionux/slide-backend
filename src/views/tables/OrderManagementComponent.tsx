// ** MUI Imports
import { SyntheticEvent, useState } from 'react'
import { CardContent, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab'

// interface RowData {
//     service_id: string;
//     service_name: string;
//     service_desc: string;
//     service_image: string;
// }


const createData = (service_id: string, service_name: string, service_desc: string, service_image: string, service_status: string) => {
    return { service_id, service_name, service_desc, service_image, service_status }
}

const rows = [
    createData('#S001', 'Fix up Slideshows', 'transform the look of an existing slides & contents ,and supercharge the impact of you presentation', '/images/services/Pattern.png', 'Todo'),
    createData('#S002', 'Fix up Slideshows', 'transform the look of an existing slides & contents ,and supercharge the impact of you presentation', '/images/services/Pattern.png', 'Ongoing'),
    createData('#S003', 'Fix up Slideshows', 'transform the look of an existing slides & contents ,and supercharge the impact of you presentation', '/images/services/Pattern.png', 'Review'),
    createData('#S004', 'Fix up Slideshows', 'transform the look of an existing slides & contents ,and supercharge the impact of you presentation', '/images/services/Pattern.png', 'Corrections'),
    createData('#S005', 'Fix up Slideshows', 'transform the look of an existing slides & contents ,and supercharge the impact of you presentation', '/images/services/Pattern.png', 'Delivered'),
    createData('#S006', 'Fix up Slideshows', 'transform the look of an existing slides & contents ,and supercharge the impact of you presentation', '/images/services/Pattern.png', 'Todo'),
    createData('#S007', 'Fix up Slideshows', 'transform the look of an existing slides & contents ,and supercharge the impact of you presentation', '/images/services/Pattern.png', 'Todo'),
    createData('#S008', 'Fix up Slideshows', 'transform the look of an existing slides & contents ,and supercharge the impact of you presentation', '/images/services/Pattern.png', 'Ongoing'),
    createData('#S009', 'Fix up Slideshows', 'transform the look of an existing slides & contents ,and supercharge the impact of you presentation', '/images/services/Pattern.png', 'Review'),
    createData('#S010', 'Fix up Slideshows', 'transform the look of an existing slides & contents ,and supercharge the impact of you presentation', '/images/services/Pattern.png', 'Review'),
    createData('#S011', 'Fix up Slideshows', 'transform the look of an existing slides & contents ,and supercharge the impact of you presentation', '/images/services/Pattern.png', 'Corrections'),
    createData('#S012', 'Fix up Slideshows', 'transform the look of an existing slides & contents ,and supercharge the impact of you presentation', '/images/services/Pattern.png', 'Todo'),
]

const OrderManagementComponent = () => {

    const [value, setValue] = useState<string>('1')


    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }


    return (
        <>
            <TabContext value={value}>
                <TabList onChange={handleChange} aria-label='card navigation example'>
                    <Tab value='1' label='Todo' />
                    <Tab value='2' label='Ongoing' />
                    <Tab value='3' label='Review' />
                    <Tab value='4' label='Corrections' />
                    <Tab value='5' label='Delivered' />
                </TabList>
                <CardContent>
                    <TabPanel value='1' sx={{ p: 0 }}>
                        {rows.map((row) => (
                            row.service_status === 'Todo' && (
                                <div key={row.service_id} style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'row' }}>
                                        <div style={{ width: '30%', marginRight: '10px' }}>{row.service_name}</div>
                                        <div style={{ width: '30%', marginRight: '10px' }}>{row.service_desc}</div>
                                    </div>
                                </div>
                            )
                        ))}
                    </TabPanel>

                    <TabPanel value='2' sx={{ p: 0 }}>
                        {rows.map((row) => (
                            row.service_status === 'Ongoing' && (
                                <div key={row.service_id} style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'row' }}>
                                        <div style={{ width: '30%', marginRight: '10px' }}>{row.service_name}</div>
                                        <div style={{ width: '30%', marginRight: '10px' }}>{row.service_desc}</div>
                                    </div>
                                </div>
                            )
                        ))}
                    </TabPanel>
                    <TabPanel value='3' sx={{ p: 0 }}>
                        {rows.map((row) => (
                            row.service_status === 'Review' && (
                                <div key={row.service_id} style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'row' }}>
                                        <div style={{ width: '30%', marginRight: '10px' }}>{row.service_name}</div>
                                        <div style={{ width: '30%', marginRight: '10px' }}>{row.service_desc}</div>
                                    </div>
                                </div>
                            )
                        ))}
                    </TabPanel>
                    <TabPanel value='4' sx={{ p: 0 }}>
                        {rows.map((row) => (
                            row.service_status === 'Corrections' && (
                                <div key={row.service_id} style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'row' }}>
                                        <div style={{ width: '30%', marginRight: '10px' }}>{row.service_name}</div>
                                        <div style={{ width: '30%', marginRight: '10px' }}>{row.service_desc}</div>
                                    </div>
                                </div>
                            )
                        ))}
                    </TabPanel>
                    <TabPanel value='5' sx={{ p: 0 }}>
                        {rows.map((row) => (
                            row.service_status === 'Delivered' && (
                                <div key={row.service_id} style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'row' }}>
                                        <div style={{ width: '30%', marginRight: '10px' }}>{row.service_name}</div>
                                        <div style={{ width: '30%', marginRight: '10px' }}>{row.service_desc}</div>
                                    </div>
                                </div>
                            )
                        ))}
                    </TabPanel>
                </CardContent>
            </TabContext>
        </>
    )
}

export default OrderManagementComponent
