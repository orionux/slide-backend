import { Box, Grid, Typography } from '@mui/material'
import React, { ReactNode, useState } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import NormalHeader from 'src/layouts/components/NormalHeader'
import ProjectFooter from 'src/views/projectComponents/projectFooter'
import ProjectHeader from 'src/views/projectComponents/projectHeader'
import { HiOutlineStar, HiMiniStar } from "react-icons/hi2";




interface Rating {
    [key: string]: string | null;
}

const Completed = () => {

    const [selectedRating, setSelectedRating] = useState<Rating>({});

    const handleRatingClick = (question: string, rating: string) => {
        setSelectedRating(prevState => ({
            ...prevState,
            [question]: rating
        }));
        console.log("Selected rating for", question + ":", rating);
    };

    const ratingData = [
        {
            id: 1,
            question: 'Did the quality of design meet your expectations?',
            iconArray: ['VERY BAD', 'POOR', 'AS EXPECTED', 'GREAT', 'EXCELLENT']
        },
        {
            id: 2,
            question: 'How well did we Understand the requirements ?',
            iconArray: ['VERY BAD', 'POOR', 'AS EXPECTED', 'GREAT', 'EXCELLENT']
        },
        {
            id: 3,
            question: 'How well did we adhere to the deadline ?',
            iconArray: ['VERY BAD', 'POOR', 'AS EXPECTED', 'GREAT', 'EXCELLENT']
        },
        {
            id: 4,
            question: 'How well did we pay attention to the details ?',
            iconArray: ['VERY BAD', 'POOR', 'AS EXPECTED', 'GREAT', 'EXCELLENT']
        }
    ];


    return (
        <>
            <NormalHeader />
            <ProjectHeader />
            <Box sx={{ backgroundColor: '#F2F5FF', padding: '50px 100px' }}>
                <Typography sx={{ textTransform: 'uppercase', fontSize: '20px', fontWeight: 500, fontFamily: "'Syne', sans-serif !important;" }}>Completed</Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: 500, fontFamily: 'Inter, sans-serif;' }}>
                    Your Presentation is done visit to the project page . In the meantime, please Leave us some feedback, It helps us improve our service  to you!
                </Typography>

                <Box sx={{ padding: '50px 0px', display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontSize: '16px', fontWeight: 500, fontFamily: 'Inter, sans-serif;', marginBottom: '30px' }}>
                        Your Honest feedback will help our designers improve
                    </Typography>

                    {
                        ratingData.map((item) => (
                            <Box key={item.id} sx={{ display: 'flex', flexDirection: 'column', marginBottom: '30px' }}>
                                <Typography sx={{ fontSize: '14px', fontWeight: 500, fontFamily: 'Inter, sans-serif;' }}>
                                    {item.question}
                                </Typography>
                                <Grid container spacing={10} sx={{ margin: '0px !important' }}>
                                    {
                                        item.iconArray.map((rate, index) => (
                                            <Grid item xs={2} key={index} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                <button onClick={() => handleRatingClick(item.question, rate)} style={{ border: 'none', width: '100px', backgroundColor: 'transparent' }}>
                                                    {
                                                        selectedRating[item.question] === rate ? <HiMiniStar style={{ fontSize: '30px', color: '#FFC107' }} /> : <HiOutlineStar style={{ fontSize: '30px', color: '#455A64' }} />
                                                    }

                                                    <Typography sx={{ fontFamily: 'Inter, sans-serif;', fontSize: '10px', fontWeight: 600, color: selectedRating[item.question] === rate ? '#FFC107' : '#455A64' }}>
                                                        {rate}
                                                    </Typography>
                                                </button>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            </Box>
                        ))
                    }
                </Box>
                <Box sx={{backgroundColor: '#fff', borderRadius: '20px', padding: '30px'}}>
                    <Typography sx={{ fontSize: '16px', fontWeight: 500, fontFamily: 'Inter, sans-serif;', marginBottom: '10px' }}>
                        Presentation feedback
                    </Typography>
                    <Typography sx={{ fontSize: '16px', fontWeight: 500, fontFamily: 'Inter, sans-serif;', marginBottom: '30px' }}>
                        Did the Quality of design meet your expectations?
                    </Typography>
                    <textarea 
                    name="rating_feedback" 
                    id="rating_feedback" 
                    cols="50" 
                    rows="10" 
                    placeholder='What did we do well?'
                    style={{border: 'none',fontSize: '14px', fontWeight: 300, fontFamily: 'Inter, sans-serif;', color: '#C0C0C0', outline: 'none'}}
                    ></textarea>
                </Box>
            </Box>
            <ProjectFooter />
        </>
    )
}


Completed.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default Completed