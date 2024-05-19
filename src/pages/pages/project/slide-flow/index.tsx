import React, { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import OverviewFlow from 'src/layouts/components/SlideFlow'

const Slides = () => {
  return (
    <>
   <div style={{width: '100vw', height: '100vh'}}>
   <OverviewFlow />
   </div>
    </>
  )
}


Slides.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>


export default Slides