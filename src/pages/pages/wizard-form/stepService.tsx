/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Card, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'

interface StepServiceProps {
  formData: any
  onChange: (formData: any) => void
  onNext: () => void
  title: string
}
const StepService: React.FC<StepServiceProps> = ({ formData, onChange, onNext, title }) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [hoveredCardTitle, setHoveredCardTitle] = useState<string>('');


  const cardList = [
    {
      id: 1,
      title: (
        <span>
          Select Your <span style={{ color: '#fff', backgroundColor: '#000' }}>{title}</span>
        </span>
      ),
      service: 'Select Your Service',
      cardBgGradient: 'linear-gradient(to top, #C5BBFF, #D7FFF1)',
      imgPath: '/images/cards/fix-up.png'
    },
    {
      id: 2,
      title: (
        <span>
          DES <span style={{ color: '#fff', backgroundColor: '#000' }}>Ign</span>
        </span>
      ),
      service: 'Design',
      cardBgGradient: 'linear-gradient(to top, #D1FDC1, #D5FBEB)',
      imgPath: '/images/cards/design.png'
    },
    {
      id: 3,
      title: (
        <span>
          Consult, <span style={{ color: '#fff', backgroundColor: '#000' }}>Write</span> and Design
        </span>
      ),
      service: 'Consult, write and Design',
      cardBgGradient: 'linear-gradient(to top, #FEBEE1, #E2FDD6)',
      imgPath: '/images/cards/consult.png'
    },
    {
      id: 4,
      title: (
        <span>
          Event, <span style={{ color: '#fff', backgroundColor: '#000' }}>Write</span> and Design
        </span>
      ),
      service: 'Event, Write and Design',
      cardBgGradient: 'linear-gradient(to top, #FDC0C0, #FBF7D6)',
      imgPath: '/images/cards/fix-up.png'
    }
  ]


  const handleMouseEnter = (id: number) => {
    setHoveredCard(id)
    setHoveredCardTitle(title);
  }

  const handleMouseLeave = () => {
    setHoveredCard(null);
    setHoveredCardTitle('');
  }


const handleNext = () => {
    if (hoveredCard !== null) {
      const hoveredCardData = cardList.find(item => item.id === hoveredCard);
      if (hoveredCardData) {
        const updatedFormData = { ...formData, package: hoveredCardData.service };

        onChange(updatedFormData);
      }
    }
  
    onNext();
  };

  
  return (
    <>
      <div>
        <Typography
          sx={{
            color: '#000',
            fontFamily: '"Syne", sans-serif !important;',
            fontSize: '50px',
            fontWeight: 600,
            marginTop: '50px',
            marginBottom: '50px',
            textAlign: 'center'
          }}
        >
          Select Your
          <span style={{ color: '#fff', backgroundColor: '#000' }}>{title}</span>
        </Typography>

        {/* cards */}
        <Grid container spacing={5}>
          {cardList.map(item => (
            <>
              <Grid key={item.id} item xs={12} sm={6} lg={3}>
                <Card
                  sx={{
                    background: `${item.cardBgGradient}`,
                    borderRadius: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '20px 20px',
                    position: 'relative',
                    '&:hover': {
                      [`#description${item.id}, #button${item.id}`]: {
                        opacity: 1
                      }
                    }
                  }}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    src={item.imgPath}
                    alt=''
                    style={{
                      width: '100%',
                      height: 'auto',
                      transform: hoveredCard === item.id ? 'rotate(-20deg)' : 'none',
                      transition: hoveredCard === item.id ? 'transform 0.5s ease-in' : 'transform 0.5s ease-in',
                      zIndex: 8
                    }}
                  />

                  <Typography
                    sx={{
                      color: '#000',
                      fontFamily: '"Syne", sans-serif !important;',
                      fontSize: '25px',
                      fontWeight: 600,
                      minHeight: '80px',
                      marginTop: hoveredCard === item.id ? '10px' : '60px',
                      marginBottom: hoveredCard === item.id ? '10px' : '40px',
                      textAlign: 'center'
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    id={`description${item.id}`}
                    sx={{
                      color: '#4E4E4E',
                      fontFamily: '"Nunito", sans-serif;',
                      fontSize: '15px',
                      fontWeight: 400,
                      textAlign: 'center',
                      display: hoveredCard === item.id ? 'block' : 'none',
                      transition: 'display 0.5s ease'
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor id aliquam dignissim risus diam
                    dictum. Lorem ipsum dolor
                  </Typography>
                  <Button
                    id={`button${item.id}`}
                    onClick={handleNext}
                    sx={{
                      backgroundColor: '#000',
                      color: '#fff',
                      fontSize: '15px',
                      textAlign: 'center',
                      lineHeight: '0',
                      height: '46px',
                      fontFamily: '"Syne", sans-serif !important;',
                      borderRadius: '50px',
                      textTransform: 'none',
                      width: 'max-content',
                      padding: '8px 15px',
                      marginTop: '20px',
                      display: hoveredCard === item.id ? 'flex' : 'none',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                      transition: 'display 0.5s ease',
                      '&:hover': {
                        backgroundColor: '#000'
                      }
                    }}
                  >
                    Start Projects
                    <span style={{ width: 'max-content', marginLeft: '10px' }}>
                      <svg width='27' height='26' viewBox='0 0 27 26' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M13.2397 0.853845C13.5775 0.419001 14.2346 0.419001 14.5723 0.853845L15.4062 1.92724C15.6682 2.26446 16.1408 2.35281 16.5069 2.13299L17.6721 1.4333C18.1442 1.14984 18.7569 1.3872 18.9148 1.9147L19.3046 3.21683C19.427 3.62591 19.8358 3.87902 20.2566 3.80629L21.5959 3.5748C22.1385 3.48102 22.6241 3.92367 22.5808 4.4726L22.4738 5.82759C22.4403 6.25329 22.73 6.63697 23.1486 6.72116L24.4812 6.98913C25.021 7.09769 25.3139 7.68585 25.0752 8.18207L24.486 9.40694C24.3009 9.79175 24.4325 10.2542 24.7924 10.4839L25.9382 11.2152C26.4023 11.5114 26.463 12.1656 26.0611 12.5421L25.0693 13.4714C24.7576 13.7634 24.7133 14.2422 24.9659 14.5864L25.7702 15.6822C26.096 16.1261 25.9162 16.758 25.4055 16.9639L24.1449 17.4722C23.7488 17.6319 23.5345 18.0623 23.6458 18.4745L23.9998 19.7868C24.1433 20.3184 23.7473 20.8428 23.1967 20.8503L21.8377 20.8688C21.4107 20.8747 21.0554 21.1986 21.0102 21.6232L20.8663 22.9748C20.808 23.5223 20.2494 23.8682 19.7333 23.6763L18.4592 23.2027C18.059 23.0539 17.6107 23.2275 17.4151 23.6072L16.7927 24.8155C16.5406 25.305 15.8947 25.4257 15.4828 25.0604L14.4659 24.1585C14.1464 23.8751 13.6656 23.8751 13.3462 24.1585L12.3293 25.0604C11.9173 25.4257 11.2715 25.305 11.0193 24.8155L10.3969 23.6072C10.2014 23.2275 9.75306 23.0539 9.3528 23.2027L8.07879 23.6763C7.56268 23.8682 7.00404 23.5223 6.94576 22.9748L6.80188 21.6232C6.75668 21.1986 6.40137 20.8747 5.97439 20.8688L4.6153 20.8503C4.06472 20.8428 3.66876 20.3184 3.81221 19.7868L4.16629 18.4745C4.27753 18.0623 4.06322 17.6319 3.66718 17.4722L2.40658 16.9639C1.89589 16.758 1.71608 16.1261 2.04188 15.6822L2.84611 14.5864C3.09877 14.2422 3.0544 13.7634 2.74279 13.4714L1.75091 12.5421C1.34909 12.1656 1.40972 11.5114 1.87388 11.2152L3.01962 10.4839C3.37958 10.2542 3.51116 9.79175 3.32605 9.40694L2.73687 8.18207C2.49818 7.68585 2.79105 7.09769 3.33088 6.98913L4.66341 6.72116C5.08205 6.63697 5.37179 6.25329 5.3382 5.82759L5.23128 4.4726C5.18796 3.92367 5.67353 3.48102 6.21611 3.5748L7.55547 3.80629C7.97625 3.87902 8.38503 3.62591 8.50748 3.21683L8.89726 1.9147C9.05516 1.3872 9.66784 1.14984 10.1399 1.4333L11.3052 2.13299C11.6713 2.35281 12.1439 2.26446 12.4059 1.92724L13.2397 0.853845Z'
                          fill='white'
                        />
                        <path
                          d='M18.0603 12.7073C18.1367 12.7844 18.1796 12.8886 18.1796 12.9972C18.1796 13.1057 18.1367 13.2099 18.0603 13.2871L14.3984 16.949C14.3203 17.0236 14.2165 17.0655 14.1085 17.066C14.0545 17.0657 14.001 17.0554 13.9508 17.0354C13.8768 17.0043 13.8136 16.952 13.7692 16.885C13.7249 16.818 13.7014 16.7394 13.7016 16.6591V13.404H10.0397C9.93178 13.404 9.82829 13.3612 9.75198 13.2849C9.67568 13.2086 9.63281 13.1051 9.63281 12.9972C9.63281 12.8893 9.67568 12.7858 9.75198 12.7095C9.82829 12.6332 9.93178 12.5903 10.0397 12.5903H13.7016V9.33526C13.7014 9.25493 13.7249 9.17632 13.7692 9.10935C13.8136 9.04237 13.8768 8.99002 13.9508 8.95889C14.026 8.92958 14.1079 8.92214 14.1871 8.93744C14.2663 8.95274 14.3396 8.99016 14.3984 9.04535L18.0603 12.7073Z'
                          fill='black'
                        />
                      </svg>
                    </span>
                  </Button>
                </Card>
              </Grid>
            </>
          ))}
        </Grid>

      </div>
    </>
  )
}

export default StepService
