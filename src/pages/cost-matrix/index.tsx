import { Box, Button, Card, Grid, IconButton, InputAdornment, Typography } from '@mui/material'
import React, { useState } from 'react'
import { FaCircleCheck } from 'react-icons/fa6'
import { IoIosArrowDown } from 'react-icons/io'
import { CgAddR } from "react-icons/cg";



const CostMatrix = () => {


  
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
      },
      {
        id: 3,
        title: '06 Days',
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
      },
      {
        id: 4,
        title: '10 Days',
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

        // Adding '!' asserts that urgentData will not be undefined
    const urgentData = timeData.find(timeDataItem => timeDataItem.title === 'Urgent within 48 hours')!;

    const initialPackages = urgentData?.packages.slice(0, 2) || [];
    const [displayedPackages, setDisplayedPackages] = useState(initialPackages);

    const addNewPricePlan = () => {
        if (urgentData && urgentData.packages.length > 0) {
            const nextPackageIndex = displayedPackages.length % urgentData.packages.length;
            const nextPackage = urgentData.packages[nextPackageIndex];
            setDisplayedPackages(prevDisplayedPackages => [...prevDisplayedPackages, nextPackage]);
        }
    };
    

    
  return (
    <div>
        <Box
            height="auto"
            width= "100%"
            display="flex"
            alignItems="enter"
            gap={4}
            p={2}
            sx={{ justifyContent:'center'}}
            >
            <Typography variant='h6' component="h6" sx={{fontFamily:'syne', color:'#000'}}>
                Service Prices Management
            </Typography>
        </Box>

        <Grid container justifyContent='' sx={{ marginTop: '20px' }} >
            <Grid item xs={12}>
                <Box
                    height={60}
                    borderRadius={3}
                    alignItems= 'center'
                    justifyContent= 'space-between'
                    display= 'flex'
                        sx={{backgroundColor:'#2A5467'}}
                    >
                    <Typography variant='h6' component="h6" sx={{fontFamily:'syne', color:'#fff', paddingLeft: '20px'}}>
                        Fixup     
                    </Typography>
                    <InputAdornment position="end" sx={{paddingRight: '20px'}}>
                        <IconButton>
                            <IoIosArrowDown color='#fff'/>
                        </IconButton>
                    </InputAdornment>
                </Box>
            </Grid>    
        </Grid>
            <Grid container justifyContent='center' sx={{ marginTop: '20px' }} >
                <Grid item xs={11}>
                    <Box
                        height={60}
                        borderRadius={3}
                        alignItems= 'center'
                        justifyContent= 'space-between'
                        display= 'flex'
                            sx={{backgroundColor:'#f2f2f2'}}
                        >
                        <Typography variant='body1' sx={{fontFamily:'inter', color:'#000', paddingLeft: '20px', fontWeight: '600'}}>
                            Urgent within 48 hours    
                        </Typography>
                        <InputAdornment position="end" sx={{paddingRight: '20px'}}>
                            <IconButton>
                                <IoIosArrowDown />
                            </IconButton>
                        </InputAdornment>
                    </Box>
                </Grid>    
            </Grid>
                 
             <Box
                sx={{ display: 'flex', 
                justifyContent: 'center', 
                gap: '20px', 
                marginTop: '30px', 
                backgroundColor: '#f2f2f2',  
                overflowX: 'auto', 
                width: 'auto',
                padding: '20px',
                '&::-webkit-scrollbar': {
                    height: '8px',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#57EBB7',
                    borderRadius: '4px',
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: '#f2f2f2',
                }
            }}
              >
            {displayedPackages.map(packageData => (

                  <Card
                    key={packageData.id}
                    
                    sx={{
                      minWidth: 275,
                      width: 330,
                      maxWidth: 350,
                      minHeight: 590,
                      padding: '20px',
                      marginTop: '50px',
                      marginBottom: '50px',
                      textAlign: 'center',
                      position: 'relative',
                      borderRadius: '20px',
                      boxShadow: '0px 5px 20px 0px rgba(58, 53, 65, 0.21)',
                      backgroundColor: '#fff'
                    }}
                  >

                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ 
                        color:  '#000', 
                        fontSize: '20px', 
                        fontFamily: '"Syne", sans-serif !important;' 
                        }}>
                        {packageData.type}
                      </Typography>
                      <Typography sx={{ color: '#000', fontSize: '60px', fontFamily: '"Syne", sans-serif !important;' }}>
                        {packageData.price}
                      </Typography>
                      <Typography
                        sx={{ color: '#585858', fontSize: '24px', fontFamily: '"Syne", sans-serif !important;' }}
                      >
                        {packageData.slideCount}
                      </Typography>
                      <Typography
                        sx={{ color: '#585858', fontSize: '14px', fontFamily: '"Syne", sans-serif !important;' }}
                      >
                        SR /Slide
                      </Typography>
                      <Typography
                        sx={{ mt: 2, color: '#585858', fontSize: '12px', fontFamily: '"Syne", sans-serif !important;' }}
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
                                color: '#585858',
                              }}
                            >
                              <Box style={{ width: '20px' }}>
                                <FaCircleCheck style={{ fontSize: '14px' }} />
                              </Box>
                              <Typography
                                key={feature.id}
                                sx={{
                                  color: '#585858',
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
                    <Box
                        display= 'flex'
                        justifyContent= 'space-between'>
                    <Button
                      sx={{
                        backgroundColor: '#f2f2f2',
                        color: '#455A64',
                        fontFamily: '"Syne", sans-serif !important;',
                        fontSize: '16px',
                        fontWeight: 400,
                        marginTop: '30px',
                        position: 'absolute',
                        bottom: '20px',
                        left: '20px',
                        width: '40%',
                        '&:hover': {
                          backgroundColor: '#455A64',
                          color: '#fff'
                        }
                      }}
                      
                    >
                      {'Cancel'}
                    </Button>
                    <Button
                      sx={{
                        backgroundColor: '#455A64',
                        color: '#fff',
                        fontFamily: '"Syne", sans-serif !important;',
                        fontSize: '16px',
                        fontWeight: 400,
                        marginTop: '30px',
                        position: 'absolute',
                        bottom: '20px',
                        right: 10,
                        width: '40%',
                        '&:hover': {
                          backgroundColor: '#455A64',
                          color: '#fff'
                        }
                      }}
                    >
                        {'Done'}
                    </Button>
                    </Box>
                  </Card>
                ))}
                <Button
                    onClick={addNewPricePlan}
                    sx={{
                        display: 'flex',
                        backgroundColor: '#fff', 
                        color: '#455A64', 
                        flexDirection:'column', 
                        height: '140px',
                        width: '100px', 
                        fontSize:'10px', 
                        flexWrap: 'wrap',
                        marginTop: '25%',
                        marginBottom: '25%',
                        border: '1px solid #455A64',
                        borderRadius: '15px',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <CgAddR fontSize={25}/>

                    Add New Price <br/> Plan
                </Button>
              </Box>
            
            <Grid container justifyContent='center' sx={{ marginTop: '20px' }} >
                <Grid item xs={11}>
                    <Box
                        height={60}
                        borderRadius={3}
                        alignItems= 'center'
                        justifyContent= 'space-between'
                        display= 'flex'
                            sx={{backgroundColor:'#f0f0f1'}}
                        >
                        <Typography variant='body1' sx={{fontFamily:'inter', color:'#000', paddingLeft: '20px', fontWeight: '600'}}>
                            96 Hours    
                        </Typography>
                        <InputAdornment position="end" sx={{paddingRight: '20px'}}>
                            <IconButton>
                                <IoIosArrowDown />
                            </IconButton>
                        </InputAdornment>
                    </Box>
                </Grid>    
            </Grid>
            <Grid container justifyContent='center' sx={{ marginTop: '20px' }} >
                <Grid item xs={11}>
                    <Box
                        height={60}
                        borderRadius={3}
                        alignItems= 'center'
                        justifyContent= 'space-between'
                        display= 'flex'
                            sx={{backgroundColor:'#f0f0f1'}}
                        >
                        <Typography variant='body1' sx={{fontFamily:'inter', color:'#000', paddingLeft: '20px', fontWeight: '600'}}>
                            06 Days        
                        </Typography>
                        <InputAdornment position="end"sx={{paddingRight: '20px'}}>
                            <IconButton>
                                <IoIosArrowDown />
                            </IconButton>
                        </InputAdornment>
                    </Box>
                </Grid>    
            </Grid>
            <Grid container justifyContent='center' sx={{ marginTop: '20px' }} >
                <Grid item xs={11}>
                    <Box
                        height={60}
                        borderRadius={3}
                        alignItems= 'center'
                        justifyContent= 'space-between'
                        display= 'flex'
                            sx={{backgroundColor:'#f0f0f1'}}
                        >
                        <Typography variant='body1' sx={{fontFamily:'inter', color:'#000', paddingLeft: '20px', fontWeight: '600'}}>
                            10 Days    
                        </Typography>
                        <InputAdornment position="end" sx={{paddingRight: '20px'}}>
                            <IconButton>
                                <IoIosArrowDown />
                            </IconButton>
                        </InputAdornment>
                    </Box>
                </Grid>    
            </Grid>

        <Grid container justifyContent='' sx={{ marginTop: '20px' }} >
            <Grid item xs={12}>
                <Box
                    height={60}
                    borderRadius={3}
                    alignItems= 'center'
                    justifyContent= 'space-between'
                    display= 'flex'
                        sx={{backgroundColor:'#2A5467'}}
                    >
                    <Typography variant='h6' component="h6" sx={{fontFamily:'syne', color:'#fff', paddingLeft: '20px'}}>
                        Design     
                    </Typography>
                    <InputAdornment position="end"sx={{paddingRight: '20px'}}>
                        <IconButton>
                            <IoIosArrowDown color='#fff'/>
                        </IconButton>
                    </InputAdornment>
                </Box>
            </Grid>    
        </Grid>

        <Grid container justifyContent='' sx={{ marginTop: '20px' }} >
            <Grid item xs={12}>
                <Box
                    height={60}
                    borderRadius={3}
                    alignItems= 'center'
                    justifyContent= 'space-between'
                    display= 'flex'
                        sx={{backgroundColor:'#2A5467'}}
                    >
                    <Typography variant='h6' component="h6" sx={{fontFamily:'syne', color:'#fff', paddingLeft: '20px'}}>
                        Consult, write and design       
                    </Typography>
                    <InputAdornment position="end" sx={{ paddingRight: '20px' }}>
                        <IconButton>
                            <IoIosArrowDown color='#fff'/>
                        </IconButton>
                    </InputAdornment>
                </Box>
            </Grid>    
        </Grid>
        
        <Grid container justifyContent='' sx={{ marginTop: '20px' }} >
            <Grid item xs={12}>
                <Box
                    height={60}
                    borderRadius={3}
                    alignItems= 'center'
                    justifyContent= 'space-between'
                    display= 'flex'
                        sx={{backgroundColor:'#2A5467'}}
                    >
                    <Typography variant='h6' component="h6" sx={{fontFamily:'syne', color:'#fff', paddingLeft: '20px'}}>
                        For Events or conferences       
                    </Typography>
                    <InputAdornment position="end" sx={{ paddingRight: '20px' }}>
                        <IconButton>
                            <IoIosArrowDown color='#fff'/>
                        </IconButton>
                    </InputAdornment>
                </Box>
            </Grid>    
        </Grid>

    </div>
  )
}

export default CostMatrix
