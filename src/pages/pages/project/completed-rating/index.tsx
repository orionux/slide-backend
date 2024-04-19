import { Typography } from '@mui/material'
import React, { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import NormalHeader from 'src/layouts/components/NormalHeader'
import ProjectFooter from 'src/views/projectComponents/projectFooter'
import ProjectHeader from 'src/views/projectComponents/projectHeader'

const Completed = () => {
    return (
        <>
            <NormalHeader />
            <ProjectHeader />
            <Typography>Completed</Typography>
            <ProjectFooter />
        </>
    )
}


Completed.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default Completed