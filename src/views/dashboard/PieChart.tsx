import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Box, CardContent, Typography } from '@mui/material';

const data = [
    { name: 'Area 1', value: 300 },
    { name: 'Area 2', value: 300 },
    { name: 'Area 3', value: 300 },
    { name: 'Area 4', value: 300 },
    { name: 'Area 5', value: 300 },
];

const COLORS = ['#F0CE25', '#5E2FE1', '#9948FF', '#32F2AF', '#EA7645'];

const PieChartComponent = () => {
    return (
        <CardContent sx={{ 
            display: 'flex', 
            textAlign: 'start', 
            flexDirection: 'column', 
            justifyContent: "start", 
            backgroundColor: '#fff', 
            borderRadius: '12px', 
            padding: '20px' }}>
            <Typography variant="h4" gutterBottom sx={{ fontSize: '16px !important', color: '#2D3748 !important', fontWeight: '600' }}>
                Active Users
            </Typography>
            <Box sx={{position: 'relative', display: 'flex', justifyContent: 'center', alignItems:'center', padding: '0px !important;'}}>
            <PieChart width={400} height={400} style={{width:'100%',padding: '0px !important;', margin: '0px !important;'}}>
                <Pie
                    data={data}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    outerRadius={160}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
            <Box sx={{position: 'absolute', width:'120px', height: '120px', backgroundColor:'#fff', borderRadius: '100%', padding: '0px !important;', margin: '0px !important;' }}></Box>
            </Box>

        </CardContent>
    );
};

export default PieChartComponent;
