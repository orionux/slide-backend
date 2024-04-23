import { Box, Button, Typography } from '@mui/material'
import React from 'react'

interface StepDeliveryInfoProps {
  formData: any
  onChange: (formData: any) => void
  onNext: () => void
  onBack: () => void
  title: string
}

const StepDeliveryInfo: React.FC<StepDeliveryInfoProps> = ({ formData }) => {
  //     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     onChange({ ...formData, [e.target.name]: e.target.value })
  //   }

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
        <Box sx={{ marginBottom: '80px', width: '100%' }}>
          <Typography
            sx={{
              color: '#122675',
              fontFamily: '"Syne", sans-serif !important;',
              fontSize: '22px',
              fontWeight: 600
            }}
          >
            Time Duration
          </Typography>
          <Typography
            sx={{
              color: '#455A64',
              fontFamily: '"Syne", sans-serif !important;',
              fontSize: '16px',
              fontWeight: 400,
              marginBottom: '30px'
            }}
          >
            Lorem ipsum dolor sit amet consectetur. Platea ac sit quam dolor enim nibh adipiscing est. Amet malesuada
            sed in mauris urna arcu nibh tellus vitae. Lacus.
          </Typography>{' '}
        </Box>
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
        >
          Continue
        </Button>
      </Box>
    </>
  )
}

export default StepDeliveryInfo
