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
import { Box } from '@mui/material';


const totalSteps = 6;
const stepTitles = ['Service', 'Category', 'Improvements', 'Delivery Info', 'Upload Data', 'Payment'];


const StartProject= () => {

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
        <Box sx={{backgroundColor: '#fff', padding: '100px'}}>
        <StepsIndicator totalSteps={totalSteps} currentStep={step} titles={stepTitles} />
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
                    />
                )}
            </div>
        </Box>
        
            <ProjectFooter />
        </>
    )
}


StartProject.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default StartProject