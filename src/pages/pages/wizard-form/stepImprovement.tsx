import { Box, Button, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

interface StepImprovementsProps {
  formData: any
  onChange: (formData: any) => void
  onNext: () => void
  onBack: () => void
  title: string
}

const StepImprovements: React.FC<StepImprovementsProps> = ({ formData, onChange, onNext }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({})

  useEffect(() => {
    setSelectedAnswers(formData?.improvements || {})
  }, [formData])

  const handleChange = (questionId: number, answerText: string) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answerText })
  }

  const handleContinue = () => {
    const updatedFormData = { ...formData, improvements: selectedAnswers }
    onChange(updatedFormData)
    onNext()
  }

  console.log(formData)

  const questionsAndA = [
    {
      id: 1,
      question: 'What do you need most to be improved in you slides',
      description: `Users will be asked - "What do you need most to be improved in you slides?" and they can choose from the options below (*You can choose more than one):`,
      answers: [
        {
          answerId: 11,
          answerText: 'Adjust Colors, fonts and text size'
        },
        {
          answerId: 12,
          answerText: 'Adjust alignment of text and elements'
        },
        {
          answerId: 13,
          answerText: 'Insert icons and images'
        }
      ]
    },
    {
      id: 2,
      question: 'What’s the type of your audience',
      description: `Users will be asked - "What’s the type of your audience?" and they can choose from the options below:`,
      answers: [
        {
          answerId: 21,
          answerText: 'Colleagues '
        },
        {
          answerId: 22,
          answerText: 'Executives '
        },
        {
          answerId: 23,
          answerText: 'Customers'
        },
        {
          answerId: 24,
          answerText: 'students'
        },
        {
          answerId: 25,
          answerText: 'Public'
        },
        {
          answerId: 26,
          answerText: 'Investors'
        }
      ]
    },
    {
      id: 3,
      question: 'What’s the goal of your presentation? ',
      description: `Users will be asked - "What’s the goal of your presentation?" and they can choose from the options below:`,
      answers: [
        {
          answerId: 31,
          answerText: 'To inform '
        },
        {
          answerId: 32,
          answerText: 'To educate '
        },
        {
          answerId: 33,
          answerText: 'To persuade or convince'
        },
        {
          answerId: 34,
          answerText: 'To inspire and motivate'
        },
        {
          answerId: 35,
          answerText: 'To entertain'
        }
      ]
    }
  ]

  const renderQuestion = (item: any) => (
    <Box key={item.id} sx={{ marginBottom: '80px', width: '100%' }}>
      <Typography
        sx={{
          color: '#122675',
          fontFamily: '"Syne", sans-serif !important;',
          fontSize: '22px',
          fontWeight: 600
        }}
      >
        {item.question}
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
        {item.description}
      </Typography>
      <RadioGroup
        aria-label={`answers-${item.id}`}
        name={`answers-${item.id}`}
        value={selectedAnswers[item.id] || ''}
        onChange={e => handleChange(item.id, e.target.value)}
      >
        {item.answers.map((answer: { answerId: React.Key | null | undefined; answerText: string }) => (
          <FormControlLabel
            key={answer.answerId}
            value={answer.answerText}
            control={<Radio />}
            label={answer.answerText as string} // Specify the type of answerText as string
            className='radioServiceAnswer'
          />
        ))}
      </RadioGroup>
    </Box>
  )

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#fff',
          padding: '100px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {questionsAndA.map(item => renderQuestion(item))}
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
          onClick={handleContinue}
        >
          Continue
        </Button>
      </Box>
    </>
  )
}

export default StepImprovements
