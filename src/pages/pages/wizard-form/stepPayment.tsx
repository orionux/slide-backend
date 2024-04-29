import { Box, Button, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React from 'react'


interface StepPaymentsProps {
    formData: any;
    onChange: (formData: any) => void;
    title: string;
    onNext: () => void;
}

const StepPayment: React.FC<StepPaymentsProps> = ({ formData, onChange, onNext }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ ...formData, keepDataInProfile: e.target.value === 'true' });
    };

    console.log(formData)

    return (
        <>
            <Box
                sx={{
                    backgroundColor: '#fff',
                    padding: '100px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center'
                }}
            >
                <Box
                    sx={{
                        marginBottom: '80px',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'start',
                        alignItems: 'start',
                        textAlign: 'start'
                    }}
                >
                    <Typography
                        sx={{
                            color: '#000',
                            fontFamily: '"Syne", sans-serif !important;',
                            fontSize: '22px',
                            fontWeight: 600,
                            textAlign: 'start',
                            mb: '15px'
                        }}
                    >
                        Company Details
                    </Typography>
                    <TextField name='company_name' placeholder='Company Name' onChange={handleChange} sx={{ mb: '15px', width: '100%' }}></TextField>
                    <TextField name='vat_number' placeholder='VAT Number' onChange={handleChange} sx={{ mb: '15px', width: '100%' }} ></TextField>
                    <TextField name='billing_email' placeholder='Billing email' onChange={handleChange} sx={{ mb: '15px', width: '100%' }} ></TextField>
                    {/* radio here  -  Keep data in your Profile */}
                    <RadioGroup name="keepDataInProfile" onChange={handleRadioChange} value={formData.keepDataInProfile ? 'true' : 'false'} sx={{ mb: '30px' }}>
                        <FormControlLabel value="true" control={<Radio />} label="Keep data in your Profile" />
                    </RadioGroup>

                    <Typography
                        sx={{
                            color: '#000',
                            fontFamily: '"Syne", sans-serif !important;',
                            fontSize: '22px',
                            fontWeight: 600,
                            textAlign: 'start',
                            mb: '15px'
                        }}
                    >
                        Billing Information
                    </Typography>
                    <TextField name='selected_cuntry' placeholder='Select Country' onChange={handleChange} sx={{ mb: '15px', width: '100%' }}></TextField>
                    <TextField name='bulling_address' placeholder='Billing Address' onChange={handleChange} sx={{ mb: '15px', width: '100%' }} ></TextField>
                    <TextField name='city' placeholder='City' onChange={handleChange} sx={{ mb: '15px', width: '100%' }} ></TextField>
                    <TextField name='state' placeholder='State' onChange={handleChange} sx={{ mb: '15px', width: '100%' }} ></TextField>
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                    <Button
                        sx={{
                            backgroundColor: '#2D2D2E',
                            color: '#fff',
                            fontFamily: '"Syne", sans-serif !important;',
                            fontSize: '16px',
                            fontWeight: 400,
                            width: '300px',
                            '&:hover': {
                                backgroundColor: '#2D2D2E',
                                color: '#fff'
                            }
                        }}
                        onClick={onNext}
                    >
                        Continue
                    </Button>
                    </Box>
                </Box>

            </Box>
        </>
    )
}


export default StepPayment