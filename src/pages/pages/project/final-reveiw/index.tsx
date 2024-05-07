import { Box, Button, Grid } from '@mui/material'

/*import { DiscPlayer } from 'mdi-material-ui'*/

import React, { ReactNode, useState } from 'react'
import { FaBars } from 'react-icons/fa6'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import NormalHeader from 'src/layouts/components/NormalHeader'
import ProjectFooter from 'src/views/projectComponents/projectFooter'
import ProjectHeader from 'src/views/projectComponents/projectHeader'


const FinalReview = () => {
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [rotated, setRotated] = useState(true);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            setSelectedFiles(files);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (files) {
            setSelectedFiles(files);
        }
    };

    return (
        <>
            <NormalHeader />
            <ProjectHeader />
            <Grid container spacing={10} sx={{ minHeight: '500px', padding: '100px' }}>
                <Grid item xs={1} sx={{ minHeight: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                        style={{ transform: rotated ? 'rotate(-90deg)' : 'rotate(0deg)' }}
                        onClick={() => setRotated(!rotated)}
                        sx={{
                            width: '100% !important',
                            minWidth: '450px',
                            borderRadius: '50px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '8px 25px',
                            color: '#fff',
                            backgroundColor: '#333333'
                        }}
                    >
                        <span></span>   Project Summary <FaBars />
                    </Button>
                </Grid>
                <Grid item xs={11}>
                    <div
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        style={{
                            border: '2px dashed #ccc',
                            borderRadius: '10px',
                            padding: '20px',
                            height: '450px',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                        }}
                    >
                        <label htmlFor="file-upload">
                            <svg width="103" height="89" viewBox="0 0 103 89" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M53.4478 20.2116C53.2416 20.903 53.6355 21.6295 54.3263 21.8355L54.4636 21.8765L54.4695 21.8696C55.1174 21.9867 55.76 21.5987 55.9504 20.956C57.6854 15.1262 63.1516 11.0535 69.2416 11.0535C69.9626 11.0535 70.5474 10.4687 70.5474 9.74769C70.5474 9.02668 69.9626 8.44193 69.2416 8.44193C61.757 8.44193 55.4674 13.4252 53.4478 20.2116ZM53.4478 20.2116L53.6607 20.2751L53.4478 20.2118C53.4478 20.2117 53.4478 20.2117 53.4478 20.2116Z" fill="#57EBB7" stroke="#F9FFF9" strokeWidth="0.444268" />
                                <path d="M84.4138 62.8468H77.9122C77.3139 62.8468 76.8285 62.3615 76.8285 61.7632C76.8285 61.1649 77.3139 60.6796 77.9122 60.6796H84.4138C93.376 60.6796 100.668 53.3876 100.668 44.4254C100.668 35.4632 93.376 28.1711 84.4138 28.1711H84.2574C83.9432 28.1711 83.6444 28.0349 83.4385 27.7973C83.2327 27.5597 83.1398 27.2446 83.1847 26.9335C83.2814 26.2586 83.3302 25.5805 83.3302 24.9203C83.3302 17.1531 77.0103 10.8332 69.2431 10.8332C66.2213 10.8332 63.3397 11.7775 60.9092 13.5647C60.3751 13.9571 59.6166 13.783 59.3078 13.1955C52.4245 0.0884084 34.4462 -1.67174 25.1254 9.73026C21.1989 14.5338 19.6561 20.7823 20.8923 26.8724C21.0286 27.545 20.5138 28.172 19.8304 28.172H19.3962C10.434 28.172 3.14195 35.464 3.14195 44.4262C3.14195 53.3884 10.434 60.6804 19.3962 60.6804H25.8978C26.4961 60.6804 26.9814 61.1657 26.9814 61.764C26.9814 62.3624 26.4961 62.8477 25.8978 62.8477H19.3962C9.23875 62.8477 0.974609 54.5835 0.974609 44.4261C0.974609 34.5536 8.78122 26.4698 18.5455 26.024C17.6283 19.7056 19.3822 13.3324 23.4473 8.35872C33.4266 -3.84973 52.5512 -2.48133 60.6356 11.132C63.2147 9.51507 66.1659 8.66684 69.2427 8.66684C78.6532 8.66684 86.11 16.6764 85.4575 26.0341C95.1319 26.5767 102.835 34.6178 102.835 44.4253C102.835 54.5835 94.5707 62.8469 84.4133 62.8469L84.4138 62.8468Z" fill="#57EBB7" />
                                <path d="M24.4468 61.1532C24.4468 76.2138 36.6992 88.4661 51.7597 88.4661C66.8203 88.4661 79.0725 76.2136 79.0725 61.1532C79.0725 46.0926 66.8203 33.8404 51.7597 33.8404C36.699 33.8404 24.4468 46.0928 24.4468 61.1532ZM27.0588 61.1532C27.0588 47.5336 38.1398 36.4524 51.7597 36.4524C65.3793 36.4524 76.4605 47.5334 76.4605 61.1532C76.4605 74.7729 65.3793 85.8541 51.7597 85.8541C38.14 85.8541 27.0588 74.7731 27.0588 61.1532Z" fill="#57EBB7" stroke="#F9FFF9" strokeWidth="0.444268" />
                                <path d="M51.2427 72.0568C51.2427 72.6175 51.6975 73.0723 52.2582 73.0723C52.8188 73.0723 53.2736 72.6182 53.2736 72.0568V51.4301C53.2736 50.8693 52.8189 50.4146 52.2582 50.4146C51.6975 50.4146 51.2427 50.8693 51.2427 51.4301V72.0568Z" fill="#57EBB7" stroke="#B2CFF1" strokeWidth="0.444268" />
                                <path d="M52.2563 52.8663L46.6279 58.4947C46.2316 58.8917 45.5882 58.8915 45.1916 58.4948C44.7949 58.0981 44.7949 57.4554 45.1916 57.0587L51.5381 50.7123C51.9343 50.3153 52.5777 50.3155 52.9743 50.7121L59.3209 57.0587C59.7175 57.4553 59.7176 58.0978 59.3212 58.4945C59.1228 58.6937 58.8619 58.7922 58.6029 58.7922L52.2563 52.8663ZM52.2563 52.8663L57.8848 58.4948C58.0829 58.6929 58.3435 58.7922 58.6028 58.7922L52.2563 52.8663Z" fill="#57EBB7" stroke="#B2CFF1" strokeWidth="0.444268" />
                            </svg>

                            <div>Drag & drop files or Browse</div>
                            <div>Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT</div>
                            <input
                                type="file"
                                id="file-upload"
                                style={{ display: 'none' }}
                                onChange={handleFileSelect}
                                multiple
                            />
                            <Box sx={{display: 'flex', flexDirection: 'row', marginTop: '30px'}}>
                                <input type="radio" name="fileUpload" />
                                <label htmlFor="fileUpload" style={{marginRight: '50px'}}>Ready to Send for a review</label>

                                <input type="radio" name="fileUpload" />
                                <label htmlFor="fileUpload">Ready for deliver</label>
                            </Box>
                            <Button component="span" sx={{backgroundColor: '#2D2D2E', padding: '10px 50px', marginTop: '40px'}}>Upload Project</Button>
                        </label>
                    </div>
                    {selectedFiles && (
                        <ul>
                            {Array.from(selectedFiles).map((file, index) => (
                                <li key={index}>{file.name}</li>
                            ))}
                        </ul>
                    )}
                </Grid>
            </Grid>
            <ProjectFooter />
        </>

    )
}

FinalReview.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default FinalReview