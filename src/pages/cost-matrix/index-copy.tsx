import { Box, Button, Card, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'
import { FaCircleCheck } from 'react-icons/fa6'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
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

    const [editableData, setEditableData] = useState(urgentData?.packages || []);

    const addNewPricePlan = () => {
        if (urgentData && urgentData.packages.length > 0) {
            const nextPackageIndex = displayedPackages.length % urgentData.packages.length;
            const nextPackage = urgentData.packages[nextPackageIndex];
            setDisplayedPackages(prevDisplayedPackages => [...prevDisplayedPackages, nextPackage]);
        }
    };
    
    //edit card activate
    const [activeCardId, setActiveCardId] = useState<string | number | null>(null);


    const toggleEditMode = (cardId: string | number) => {
        setActiveCardId(prevActiveCardId => (prevActiveCardId === cardId ? null : cardId));
    };
    
    //expand bars
    const [expanded, setExpanded] = useState(true);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    //card editing
    type InputChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

    const handleInputChange = (e: InputChangeEvent, packageId: string | number, field: string) => {
        const updatedData = editableData.map(item => {
          if (item.id === packageId) {
            if (field.startsWith('features-')) {
              const featureId = field.split('-')[1];
              const updatedFeatures = item.features.map(f =>
                f.id === featureId ? { ...f, text: e.target.value } : f
              );

              return { ...item, features: updatedFeatures };
            }

            return { ...item, [field]: e.target.value };

          }

          return item;

        });
        setEditableData(updatedData);
      };
      
      const handleDone = (packageId: string | number) => {
        const updatedPackages = displayedPackages.map(item => {
          if (item.id === packageId) {
            const updatedItem = editableData.find(editItem => editItem.id === packageId);
            console.log("Updated Data for Package:", updatedItem);

            return updatedItem || item;

          }
          
          return item;

        });
        setDisplayedPackages(updatedPackages);
        setActiveCardId(null);
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
                            <IconButton onClick={handleExpandClick}>
                                {expanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </IconButton>
                        </InputAdornment>
                    </Box>

                    {expanded && (
                    <Box
                        sx={{ 
                            borderTopLeftRadius: '0',
                            borderTopRightRadius: '0',
                            display: 'flex', 
                            justifyContent: 'flex-start', 
                            gap: '20px', 
                            marginTop: '-10px', 
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
                    <Button
                        sx= {{
                            position: 'absolute',
                            right: '-10px',
                            top: '0px'

                        }}
                        onClick={() => toggleEditMode(packageData.id)} // Pass the card ID to toggle edit mode

                        >
                        <img src='/images/costMatrix/edit.png' width={20} height={20} alt='edit'/>
                    </Button>    
                    
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column' }}>

{activeCardId === packageData.id ? (
                                        <TextField
                                            value={editableData.find(item => item.id === packageData.id)?.type || ''}
                                            onChange={(e) => handleInputChange(e, packageData.id, 'type')}
                                            sx={{ 
                                                input: {
                                                    color: '#000',
                                                    fontSize: '20px',
                                                    textAlign: 'center', 
                                                    fontFamily: '"Syne", sans-serif !important',
                                                    fontWeight: '500',
                                                    width: '100%',
                                                    padding: 0,
                                                },
                                                "& fieldset": {
                                                    border: 'none',
                                                },
                                                "& .MuiInputBase-root": {
                                                    padding: 0,
                                                }

                                             }}
                                        />
                                    ) : (
                                        <Typography sx={{ color: '#000', fontSize: '20px', fontFamily: '"Syne", sans-serif !important;' }}>
                                            {packageData.type}
                                        </Typography>
                                    )}

                                    {activeCardId === packageData.id ? (
                                        <TextField
                                            value={editableData.find(item => item.id === packageData.id)?.price || ''}
                                            onChange={(e) => handleInputChange(e, packageData.id, 'price')}
                                            sx={{ 
                                                
                                            input: {
                                                color: '#000',
                                                fontSize: '60px',
                                                textAlign: 'center', 
                                                fontFamily: '"Syne", sans-serif !important',
                                                fontWeight: '500',
                                                width: '100%',
                                                padding: 1,
                                            },
                                            "& fieldset": {
                                                border: 'none',
                                            },
                                            "& .MuiInputBase-root": {
                                                padding: 0,
                                            }
                                        }}
                                        />
                                    ) : (
                                        <Typography sx={{ color: '#000', fontSize: '60px', fontFamily: '"Syne", sans-serif !important;' }}>
                                            {packageData.price}
                                        </Typography>
                                    )}

                                    {activeCardId === packageData.id ? (
                                        <TextField
                                            value={editableData.find(item => item.id === packageData.id)?.slideCount || ''}
                                            onChange={(e) => handleInputChange(e, packageData.id, 'slideCount')}
                                            sx={{ 
                                                input: {
                                                    color: '#585858',
                                                    fontSize: '20px',
                                                    textAlign: 'center', 
                                                    fontFamily: '"Syne", sans-serif !important',
                                                    fontWeight: '600',
                                                    width: '100%',
                                                    padding: 0,
                                                },
                                                "& fieldset": {
                                                    border: 'none',
                                                },
                                                "& .MuiInputBase-root": {
                                                    padding: 0,
                                                }
                                            }}
                                        />
                                    ) : (
                                        <Typography 
                                            sx={{ color: '#585858', 
                                            fontSize: '24px', 
                                            fontFamily: '"Syne", sans-serif !important;',
                                        
                                        }}>
                                            {packageData.slideCount}
                                        </Typography>
                                    )}

                                    <Typography sx={{ color: '#585858', fontSize: '14px', fontFamily: '"Syne", sans-serif !important;' }}>
                                        SR /Slide
                                    </Typography>

                                    {activeCardId === packageData.id ? (
                                        <TextField
                                            value={editableData.find(item => item.id === packageData.id)?.description || ''}
                                            onChange={(e) => handleInputChange(e, packageData.id, 'description')}
                                            multiline
                                            maxRows={4} 
                                            sx={{ 
                                                input: {
                                                    color: '#585858',
                                                    fontSize: '10px',
                                                    textAlign: 'center', 
                                                    fontFamily: '"Syne", sans-serif !important',
                                                    fontWeight: '600',
                                                    width: '100%',
                                                    padding: 0,
                                                },
                                                "& fieldset": {
                                                    border: 'none',
                                                },
                                                "& .MuiInputBase-root": {
                                                    padding: 0,
                                                }
                                            }}
                                        />
                                    ) : (
                                        <Typography sx={{ mt: 2, color: '#585858', fontSize: '12px', fontFamily: '"Syne", sans-serif !important;' }}>
                                            {packageData.description}
                                        </Typography>
                                    )}
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
                              {activeCardId === packageData.id ? (
                                                    <TextField
                                                        value={editableData.find(item => item.id === packageData.id)?.features.find(f => f.id === feature.id)?.text || ''}
                                                        onChange={(e) => handleInputChange(e, packageData.id, `features-${feature.id}`)}
                                                        sx={{ 
                                                            input: {
                                                                color: '#585858',
                                                                fontSize: '12px',
                                                                textAlign: 'flex-start', 
                                                                fontFamily: '"Syne", sans-serif !important',
                                                                fontWeight: '600',
                                                                width: '100%',
                                                                padding: 0,
                                                            },
                                                            "& fieldset": {
                                                                border: 'none',
                                                            },
                                                            "& .MuiInputBase-root": {
                                                                padding: 0,
                                                            }
                                                        }}
                                                    />
                                                ) : (
                                                    <Typography sx={{ ml: 2, color: '#585858', fontSize: '12px', fontFamily: '"Syne", sans-serif !important;' }}>
                                                        {feature.text}
                                                    </Typography>
                                                )}
                            </Box>
                          </>
                        ))}
                      </Box>
                    </Box>
                    {activeCardId === packageData.id && (

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
                    onClick={() => handleDone(packageData.id)}
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
                    )}
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
                        minWidth: '100px', 
                        fontSize:'10px', 
                        flexWrap: 'wrap',
                        position: 'relative',
                        top: '250px',
                        left: '-10px',
                        marginLeft: '-25px',
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
                    )}
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
