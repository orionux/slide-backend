import React, { ReactNode, useState } from 'react'
import StepService from './stepService';
import StepCategory from './stepCategory';
import StepImprovements from './stepImprovement';
import StepUploadData from './stepUploadData';
import StepDeliveryInfo from './stepDeliveryInfo';
import StepPayment from './stepPayment';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import StepsIndicator from './StepIndicator';
import ProjectFooter from 'src/views/projectComponents/projectFooter';
import NormalHeader from 'src/layouts/components/NormalHeader';
import { Box, Button, Typography } from '@mui/material';
import Successfull from './successfullMessage';


const totalSteps = 6;
const stepTitles = ['Service', 'Category', 'Improvements', 'Delivery Info', 'Upload Data', 'Payment'];


const StartProject = () => {

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<any>({});

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };



    const handleFormDataChange = (data: any) => {
        setFormData({ ...formData, ...data });
    };

    const handlePackageSelect = () => {
        // Your function implementation
    };


    return (
        <>
            <NormalHeader />
            
            <Box sx={{ backgroundColor: '#fff', padding: '100px',position: 'relative' }}>
                {step > 1 && step < 7 && (
                        <Button
                            sx={{
                                position: 'absolute',
                                top: '0%',
                                marginTop: '20px',
                                backgroundColor: '#2D2D2E',
                                color: '#fff',
                                fontFamily: '"Syne", sans-serif !important;',
                                fontSize: '16px',
                                fontWeight: 400,
                                width: '100px',
                                '&:hover': {
                                    backgroundColor: '#2D2D2E',
                                    color: '#fff'
                                }
                            }}
                            onClick={handleBack}
                        >
                            Back
                        </Button>
                    )}
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    
                    <Box>
                        <StepsIndicator totalSteps={totalSteps} currentStep={step} titles={stepTitles} />
                    </Box>
                    <Box sx={{}}>
                        <Typography
                            sx={{
                                color: '#000',
                                fontFamily: '"Syne", sans-serif !important;',
                                fontSize: '16px',
                                fontWeight: 600,
                                textAlign: 'center',
                            }}
                        >
                            Your Cost Will be
                        </Typography>
                        <Typography
                            sx={{
                                color: '#000',
                                fontFamily: '"Syne", sans-serif !important;',
                                fontSize: '26px',
                                fontWeight: 600,
                                textAlign: 'center',
                            }}
                        >
                            $0.00
                        </Typography>
                    </Box>
                </Box>
                <div>
                    {step === 1 && (
                        <StepService
                            formData={formData}
                            onChange={handleFormDataChange}
                            onNext={handleNext}
                            title={'Service'}
                        />
                    )}
                    {step === 2 && (
                        <StepCategory
                            formData={formData}
                            onChange={handleFormDataChange}
                            onNext={handleNext}
                            onBack={handleBack}
                            title={'Category'}
                        />
                    )}
                    {step === 3 && (
                        <StepImprovements
                            formData={formData}
                            onChange={handleFormDataChange}
                            onNext={handleNext}
                            onBack={handleBack}
                            title={'Improvements'}
                        />
                    )}
                    {step === 4 && (
                        <StepDeliveryInfo
                            formData={formData}
                            onChange={handleFormDataChange}
                            onNext={handleNext}
                            onBack={handleBack}
                            title={'Delivery Info'}
                            onPackageSelect={handlePackageSelect}
                        />
                    )}
                    {step === 5 && (
                        <StepUploadData
                            formData={formData}
                            onChange={handleFormDataChange}
                            onNext={handleNext}
                            onBack={handleBack}
                            title={'Upload Data'}
                        />
                    )}
                    {step === 6 && (
                        <StepPayment
                            formData={formData}
                            onChange={handleFormDataChange}
                            title={'Payment'}
                            onNext={handleNext}
                        />
                    )}
                    {step === 7 && <Successfull formData={formData} />}
                </div>


            </Box>

            <ProjectFooter />
        </>
    )
}


StartProject.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default StartProject