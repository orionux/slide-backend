import { Avatar, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { FaMessage } from 'react-icons/fa6'
import Box from '@mui/material/Box'
import Link from 'next/link'


const ProjectHeader = () => {
  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={12}>
          <Box
            sx={{
              backgroundColor: '#fff',
              padding: '50px 50px 100px 50px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItem: 'start',
            }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItem: 'center' }}>
              <Avatar sx={{ width: '50px', height: '50px', borderRadius: '100%' }}>
                <img src="/images/admin/Avatar.png" alt="" style={{ width: '80px', height: '80px', borderRadius: '100%' }} />
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItem: 'center', paddingLeft: '10px' }}>
                <Typography sx={{ color: '#011627', fontSize: '20px', fontWeight: 600 }} >Project Name Here</Typography>
                <Typography sx={{ color: '#263238', fontSize: '12px', fontWeight: 400 }} >Order #37689</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItem: 'center', backgroundColor: '#263238', borderRadius: '8px' }}>
              <Link passHref href={'/chat-view'}>
                <Button sx={{ fontSize: '16px', color: '#fff' }}><FaMessage style={{ marginRight: '10px' }} /> Back to chat</Button>
              </Link>
            </Box>
          </Box>
        </Grid>

      </Grid>
    </>
  )
}

export default ProjectHeader