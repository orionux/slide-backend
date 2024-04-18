import React, { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import NormalHeader from 'src/layouts/components/NormalHeader'
import ProjectFooter from 'src/views/projectComponents/projectFooter'
import ProjectHeader from 'src/views/projectComponents/projectHeader'


const UploadProject = () => {
    return (
        <>
            <NormalHeader />
            <ProjectHeader />
            <div>UploadProject</div>
            <ProjectFooter />
        </>

    )
}

UploadProject.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default UploadProject