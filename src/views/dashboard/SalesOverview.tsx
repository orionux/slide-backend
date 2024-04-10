import React from 'react';
import { LineChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { FormControl, InputLabel, Select, MenuItem, Box, Typography } from '@mui/material';

// Sample data for income and expenses
const data = [
  { month: 'Jan', income: 200, expenses: 150 },
  { month: 'Feb', income: 220, expenses: 180 },
  { month: 'Mar', income: 250, expenses: 200 },
  { month: 'Apr', income: 235, expenses: 220 },
  { month: 'May', income: 100, expenses: 230 },
  { month: 'Jun', income: 220, expenses: 200 },
  { month: 'Jul', income: 340, expenses: 260 },
  { month: 'Aug', income: 360, expenses: 280 },
  { month: 'Sep', income: 380, expenses: 290 },
  { month: 'Oct', income: 300, expenses: 310 },
  { month: 'Nov', income: 400, expenses: 250 },
  { month: 'Dec', income: 450, expenses: 180 },
];


const incomeGradient = (
  <defs>
    <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
    </linearGradient>
  </defs>
);

const expensesGradient = (
  <defs>
    <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
    </linearGradient>
  </defs>
);

const LineChartComponent = () => {
  return (
    <div>
      <Box sx={{display: 'flex', textAlign: 'start', flexDirection: 'column', justifyContent: "start", backgroundColor: '#fff', borderRadius: '12px', padding: '20px'}}>
      <Typography variant="h4" gutterBottom sx={{fontSize:'16px !important', color: '#2D3748 !important', fontWeight: '600'}}>
        Sales Overview
      </Typography>
      <Box display="flex" justifyContent="end" marginBottom={2}>
        <FormControl>
          <InputLabel>Year</InputLabel>
          <Select value="">
            <MenuItem value="">2022</MenuItem>
            <MenuItem value="">2023</MenuItem>
            <MenuItem value="">2024</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Month</InputLabel>
          <Select value="">
            <MenuItem value="Jan">January</MenuItem>
            <MenuItem value="Feb">February</MenuItem>
            <MenuItem value="Mar">March</MenuItem>
            <MenuItem value="Apr">April</MenuItem>
            <MenuItem value="May">May</MenuItem>
            <MenuItem value="Jun">June</MenuItem>
            <MenuItem value="Jul">July</MenuItem>
            <MenuItem value="Aug">August</MenuItem>
            <MenuItem value="Sep">September</MenuItem>
            <MenuItem value="Oct">October</MenuItem>
            <MenuItem value="Nov">November</MenuItem>
            <MenuItem value="Dec">December</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Date</InputLabel>
          <Select value="">
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            {/* Add more dates */}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <LineChart width={680} height={380} data={data} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false}  />
            <XAxis dataKey="month" />
            <YAxis ticks={[0, 100, 200, 300, 400, 500]} />
            <Tooltip />
            <Legend />
            {incomeGradient}
            {expensesGradient}
            <Line type="monotone" dataKey="income" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
            <Area type="monotone" dataKey="income" stroke="none" fill="url(#incomeGradient)" />
            <Area type="monotone" dataKey="expenses" stroke="none" fill="url(#expensesGradient)" />
          </LineChart>
        </Box>
      </Box>
    </div>
  );
};

export default LineChartComponent;
