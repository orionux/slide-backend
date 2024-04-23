/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Card, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

interface StepCategoryProps {
  formData: any
  onChange: (formData: any) => void
  onNext: () => void
  onBack: () => void
  title: string
}

const StepCategory: React.FC<StepCategoryProps> = ({ formData, onChange, onNext, onBack, title }) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [hoveredCardCategory, setHoveredCardCategory] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [filteredData, setFilteredData] = useState<any[]>([])

  const handleMouseEnter = (id: number) => {
    setHoveredCard(id)
    setHoveredCardCategory(title)
  }

  const handleMouseLeave = () => {
    setHoveredCard(null)
    setHoveredCardCategory('')
  }

  console.log(formData)

  const cardData = [
    {
      id: 1,
      icon: '/images/categories/1.png',
      category: 'Animals & Pets'
    },
    {
      id: 2,
      icon: '/images/categories/2.png',
      category: 'Architecture & Interior Design'
    },
    {
      id: 3,
      icon: '/images/categories/3.png',
      category: 'Art & Design'
    },
    {
      id: 4,
      icon: '/images/categories/4.png',
      category: 'Auto Parts & Accessories'
    },
    {
      id: 5,
      icon: '/images/categories/5.png',
      category: 'Beauty and Cosmetics'
    },
    {
      id: 6,
      icon: '/images/categories/6.png',
      category: 'Business Services & Consulting'
    },
    {
      id: 7,
      icon: '/images/categories/7.png',
      category: 'Education'
    },
    {
      id: 8,
      icon: '/images/categories/8.png',
      category: 'Electronics'
    },
    {
      id: 9,
      icon: '/images/categories/9.png',
      category: 'Environmental'
    },
    {
      id: 10,
      icon: '/images/categories/10.png',
      category: 'Fashion & Accessories'
    },
    {
      id: 11,
      icon: '/images/categories/11.png',
      category: 'Financial & Law'
    },
    {
      id: 12,
      icon: '/images/categories/12.png',
      category: 'Food & Beverages'
    },
    {
      id: 13,
      icon: '/images/categories/13.png',
      category: 'Health & Wellness'
    },
    {
      id: 14,
      icon: '/images/categories/14.png',
      category: 'Home & Garden'
    },
    {
      id: 15,
      icon: '/images/categories/15.png',
      category: 'Lifestyle'
    },
    {
      id: 16,
      icon: '/images/categories/16.png',
      category: 'Marketing & Advertising'
    },
    {
      id: 17,
      icon: '/images/categories/17.png',
      category: 'Media & Entertainment'
    },
    {
      id: 18,
      icon: '/images/categories/18.png',
      category: 'Non-profit'
    },
    {
      id: 19,
      icon: '/images/categories/19.png',
      category: 'Real Estate'
    },
    {
      id: 20,
      icon: '/images/categories/20.png',
      category: 'Service & Maintenance'
    },
    {
      id: 21,
      icon: '/images/categories/21.png',
      category: 'Software & Technology'
    },
    {
      id: 22,
      icon: '/images/categories/22.png',
      category: 'Sports & Recreations'
    },
    {
      id: 23,
      icon: '/images/categories/23.png',
      category: 'Toys & Games'
    },
    {
      id: 24,
      icon: '/images/categories/24.png',
      category: 'Transportations & Automotive'
    },
    {
      id: 25,
      icon: '/images/categories/25.png',
      category: 'Travel & Hospitality'
    },
    {
      id: 26,
      icon: '/images/categories/26.png',
      category: 'Video & Photography'
    },
    {
      id: 27,
      icon: '/images/categories/27.png',
      category: 'Writing & Publishing'
    }
  ]

  const handleNext = () => {
    let dataToUse = hoveredCard !== null ? cardData.find(item => item.id === hoveredCard) : null
    if (searchQuery.trim() !== '') {
      dataToUse = filteredData.find(item => item.id === hoveredCard)
    }

    if (dataToUse) {
      const updatedFormData = { ...formData, category: dataToUse.category }
      onChange(updatedFormData)
    }

    onNext()
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    setSearchQuery(query)

    // Filter the card data based on the search query
    const filtered = cardData.filter(item => item.category.toLowerCase().includes(query.toLowerCase()))
    setFilteredData(filtered)
  }

  return (
    <>
      <Box sx={{ padding: '100px', backgroundColor: '#fff' }}>
        {/* search here */}
        <TextField
          label='Search'
          variant='outlined'
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ marginBottom: '20px', backgroundColor: '#EBEBEB', color: '#535A61',  }}
        />
        <Grid container spacing={5}>
          {(searchQuery.trim() !== '' ? filteredData : cardData).map(item => (
            <Grid
              key={item.id}
              item
              xs={6}
              md={3}
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: '"Syne", sans-serif !important;',
              fontSize: '16px',
              fontWeight: 600,
             }}
            >
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '50px 30px',
                  borderRadius: '20px',
                  minWidth: '220px !important',
                  width: '220px',
                  cursor: 'pointer',
                  '&:hover': {
                    background:
                      hoveredCard === item.id
                        ? 'linear-gradient(to top, #C5BBFF, #D7FFF1)'
                        : 'linear-gradient(to top, #FAFAFA, #FAFAFA)'
                  }
                }}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
                onClick={handleNext}
              >
                <img
                  src={item.icon}
                  alt=''
                  style={{
                    width: 'auto',
                    height: '40px'
                  }}
                />
                <Typography
                  sx={{
                    color: '#030211',
                    marginTop: '10px',
                    fontFamily: '"Syne", sans-serif !important;',
                    fontSize: '16px',
                    fontWeight: 600,
                    minHeight: '50px',
                    textAlign: 'center',
                    transition: 'display 0.5s ease'
                  }}
                >
                  {item.category}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  )
}

export default StepCategory
