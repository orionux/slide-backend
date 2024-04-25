import { Box, Button, Card, Tab, Tabs, Typography } from '@mui/material'
import React, { useState } from 'react'
import { FaCircleCheck } from 'react-icons/fa6'

interface StepDeliveryInfoProps {
  formData: any
  onChange: (formData: any) => void
  onNext: () => void
  onBack: () => void
  title: string
  onPackageSelect: (packageId: string) => void
}

const StepDeliveryInfo: React.FC<StepDeliveryInfoProps> = ({ formData, onPackageSelect, onNext, onChange }) => {
  const [selectedTab, setSelectedTab] = useState(0)
  const [selectedPackageId, setSelectedPackageId] = useState('')

  const timeData = [
    {
      id: 1,
      title: 'Urgent within 48 hours',
      packages: [
        {
          id: 'packageUrgentBasic',
          type: 'Basic',
          price: '$150',
          slideCount: '10',
          description:
            'Designed for smaller businesses or those with simpler presentation needs. This package offers essential slide design services.',
          features: [
            {
              id: 'basic1',
              text: 'Basic formatting'
            },
            {
              id: 'basic2',
              text: 'Stock images and icons'
            },
            {
              id: 'basic3',
              text: 'Simple charts and graphs'
            }
          ]
        },
        {
          id: 'packageUrgentProfessional',
          type: 'Professional',
          price: '$190',
          slideCount: '14',
          description:
            'Targets medium-sized businesses or those requiring more advanced design elements and a higher level of customization.',
          features: [
            {
              id: 'professional1',
              text: 'Advanced formatting and custom design'
            },
            {
              id: 'professional2',
              text: 'Custom charts, graphs, and infographics'
            },
            {
              id: 'professional3',
              text: 'Basic animations and transitions'
            },
            {
              id: 'professional4',
              text: 'Up to 2 rounds of revisions'
            }
          ]
        },
        {
          id: 'packageUrgentPremium',
          type: 'Premium',
          price: '$300',
          slideCount: '18',
          description:
            'Designed for larger businesses, high-stakes presentations, or those requiring a full suite of design services.',
          features: [
            {
              id: 'premium1',
              text: 'Premium formatting and custom design'
            },
            {
              id: 'premium2',
              text: 'Exclusive high-quality images, icons, and illustrations'
            },
            {
              id: 'premium3',
              text: 'Custom charts, graphs, and infographics with advanced data visualization'
            },
            {
              id: 'premium4',
              text: 'Complex animations and transitions'
            },
            {
              id: 'premium5',
              text: 'Up to 3 rounds of revisions'
            },
            {
              id: 'premium6',
              text: 'Dedicated project manager for communication and collaboration'
            }
          ]
        }
      ]
    },
    {
      id: 2,
      title: ' 96 Hours',
      packages: [
        {
          id: 'packageNormalBasic',
          type: 'Basic 1',
          price: '$150',
          slideCount: '10',
          description:
            'Designed for smaller businesses or those with simpler presentation needs. This package offers essential slide design services.',
          features: [
            {
              id: 'basic1',
              text: 'Basic formatting'
            },
            {
              id: 'basic2',
              text: 'Stock images and icons'
            },
            {
              id: 'basic3',
              text: 'Simple charts and graphs'
            }
          ]
        },
        {
          id: 'packageNormalProfessional',
          type: 'Professional 1',
          price: '$190',
          slideCount: '14',
          description:
            'Targets medium-sized businesses or those requiring more advanced design elements and a higher level of customization.',
          features: [
            {
              id: 'professional1',
              text: 'Advanced formatting and custom design'
            },
            {
              id: 'professional2',
              text: 'Custom charts, graphs, and infographics'
            },
            {
              id: 'professional3',
              text: 'Basic animations and transitions'
            },
            {
              id: 'professional4',
              text: 'Up to 2 rounds of revisions'
            }
          ]
        },
        {
          id: 'packageNormalPremium',
          type: 'Premium 1',
          price: '$300',
          slideCount: '18',
          description:
            'Designed for larger businesses, high-stakes presentations, or those requiring a full suite of design services.',
          features: [
            {
              id: 'premium1',
              text: 'Premium formatting and custom design'
            },
            {
              id: 'premium2',
              text: 'Exclusive high-quality images, icons, and illustrations'
            },
            {
              id: 'premium3',
              text: 'Custom charts, graphs, and infographics with advanced data visualization'
            },
            {
              id: 'premium4',
              text: 'Complex animations and transitions'
            },
            {
              id: 'premium5',
              text: 'Up to 3 rounds of revisions'
            },
            {
              id: 'premium6',
              text: 'Dedicated project manager for communication and collaboration'
            }
          ]
        }
      ]
    }
  ]

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)
  }

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackageId(packageId)
    onPackageSelect(packageId)

    // Update form data with selected package ID
    onChange({ ...formData, selectedPackageId: packageId })
  }

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
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
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
              marginBottom: '30px',
              width: '75%'
            }}
          >
            Lorem ipsum dolor sit amet consectetur. Platea ac sit quam dolor enim nibh adipiscing est. Amet malesuada
            sed in mauris urna arcu nibh tellus vitae. Lacus.
          </Typography>{' '}
          <Box sx={{}}>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              indicatorColor='primary'
              textColor='primary'
              variant='fullWidth'
              className='deliveryInfoTabs'
              sx={{
                borderRadius: '50px'
              }}
            >
              {timeData.map(time => (
                <Tab key={time.id} label={time.title} />
              ))}
            </Tabs>

            <Box
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', gap: '20px', marginTop: '30px' }}
            >
              {timeData[selectedTab].packages.map(packageData => (
                <Card
                  key={packageData.id}
                  sx={{
                    minWidth: 275,
                    width: 330,
                    maxWidth: 350,
                    minHeight: 590,
                    padding: '20px',
                    textAlign: 'center',
                    position: 'relative',
                    borderRadius: '20px',
                    boxShadow: '0px 5px 20px 0px rgba(58, 53, 65, 0.21)',
                    backgroundColor: selectedPackageId === packageData.id ? '#2D2D2E' : '#fff'
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ 
                      color: selectedPackageId === packageData.id ? '#fff' : '#000', 
                      fontSize: '20px', 
                      fontFamily: '"Syne", sans-serif !important;' 
                      }}>
                      {packageData.type}
                    </Typography>
                    <Typography sx={{ color: selectedPackageId === packageData.id ? '#fff' : '#000', fontSize: '60px', fontFamily: '"Syne", sans-serif !important;' }}>
                      {packageData.price}
                    </Typography>
                    <Typography
                      sx={{ color: selectedPackageId === packageData.id ? '#fff' : '#585858', fontSize: '24px', fontFamily: '"Syne", sans-serif !important;' }}
                    >
                      {packageData.slideCount}
                    </Typography>
                    <Typography
                      sx={{ color: selectedPackageId === packageData.id ? '#fff' : '#585858', fontSize: '14px', fontFamily: '"Syne", sans-serif !important;' }}
                    >
                      SR /Slide
                    </Typography>
                    <Typography
                      sx={{ mt: 2, color: selectedPackageId === packageData.id ? '#fff' : '#585858', fontSize: '12px', fontFamily: '"Syne", sans-serif !important;' }}
                    >
                      {packageData.description}
                    </Typography>
                    <Box
                      sx={{
                        mt: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'start',
                        alignItems: 'start'
                      }}
                    >
                      {packageData.features.map(feature => (
                        <>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              mt: 2,
                              textAlign: 'start',
                              color: selectedPackageId === packageData.id ? '#fff' : '#585858',
                            }}
                          >
                            <Box style={{ width: '20px' }}>
                              <FaCircleCheck style={{ fontSize: '14px' }} />
                            </Box>
                            <Typography
                              key={feature.id}
                              sx={{
                                color: selectedPackageId === packageData.id ? '#fff' : '#585858',
                                fontSize: '12px',
                                fontFamily: '"Syne", sans-serif !important;',
                                marginLeft: '6px'
                              }}
                            >
                              {feature.text}
                            </Typography>
                          </Box>
                        </>
                      ))}
                    </Box>
                  </Box>
                  <Button
                    sx={{
                      backgroundColor: '#2D2D2E',
                      color: '#fff',
                      fontFamily: '"Syne", sans-serif !important;',
                      fontSize: '16px',
                      fontWeight: 400,
                      marginTop: '30px',
                      position: 'absolute',
                      bottom: '20px',
                      left: '20px',
                      width: '88%',
                      '&:hover': {
                        backgroundColor: '#2D2D2E',
                        color: '#fff'
                      }
                    }}
                    onClick={() => handlePackageSelect(packageData.id)}
                  >
                    {selectedPackageId === packageData.id ? <FaCircleCheck style={{fontSize: '40px'}} /> : 'Choose Plan'}
                  </Button>
                </Card>
              ))}
            </Box>
          </Box>
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
          onClick={onNext}
        >
          Continue
        </Button>
      </Box>
    </>
  )
}

export default StepDeliveryInfo
