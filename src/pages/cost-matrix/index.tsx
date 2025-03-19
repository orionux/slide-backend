"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  IconButton,
  Grid,
  Paper,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
  Collapse,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import {
    Delete as DeleteIcon,
    Pencil as EditIcon,
    Check as CheckIcon,
    Close as CloseIcon,
  } from "mdi-material-ui";

  import { CiSquarePlus as AddIcon } from "react-icons/ci";
  import { IoIosArrowDown as ExpandMoreIcon,
    IoIosArrowUp as ExpandLessIcon
   } from "react-icons/io";

//   import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

// Types
interface PriceCard {
  id: string
  name: string
  price: number
  features: string[]
  isPopular?: boolean
}

interface SubService {
  id: string
  name: string
  priceCards: PriceCard[]
}

interface ParentService {
  id: string
  name: string
  subServices: SubService[]
}

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[10],
  },
}))

const PopularCard = styled(StyledCard)(({ theme }) => ({
  border: `2px solid ${theme.palette.primary.main}`,
  position: "relative",
}))

const PopularBadge = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  right: 0,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: "4px 12px",
  borderBottomLeftRadius: theme.shape.borderRadius,
}))

const ServiceSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}))

const SubServiceSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
}))

// Generate unique ID
const generateId = () => Math.random().toString(36).substr(2, 9)

// Default price cards
const getDefaultPriceCards = (): PriceCard[] => [
  {
    id: generateId(),
    name: "Basic",
    price: 9.99,
    features: ["Feature 1", "Feature 2"],
    isPopular: false,
  },
  {
    id: generateId(),
    name: "Standard",
    price: 19.99,
    features: ["Feature 1", "Feature 2", "Feature 3"],
    isPopular: true,
  },
  {
    id: generateId(),
    name: "Premium",
    price: 29.99,
    features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
    isPopular: false,
  },
]

export default function PriceCardsManager() {
  // State
  const [services, setServices] = useState<ParentService[]>([
    {
      id: generateId(),
      name: "Web Development",
      subServices: [
        {
          id: generateId(),
          name: "Frontend Development",
          priceCards: getDefaultPriceCards(),
        },
      ],
    },
  ])

  const [editingService, setEditingService] = useState<string | null>(null)
  const [editingSubService, setEditingSubService] = useState<string | null>(null)
  const [editingCard, setEditingCard] = useState<string | null>(null)
  const [newServiceName, setNewServiceName] = useState("")
  const [newSubServiceName, setNewSubServiceName] = useState("")
  const [expandedServices, setExpandedServices] = useState<Record<string, boolean>>({})
  const [expandedSubServices, setExpandedSubServices] = useState<Record<string, boolean>>({})
  const [cardDialogOpen, setCardDialogOpen] = useState(false)
  const [currentParentId, setCurrentParentId] = useState<string | null>(null)
  const [currentSubId, setCurrentSubId] = useState<string | null>(null)
  const [currentCard, setCurrentCard] = useState<PriceCard | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Toggle expanded state
  const toggleServiceExpanded = (serviceId: string) => {
    setExpandedServices((prev) => ({
      ...prev,
      [serviceId]: !prev[serviceId],
    }))
  }

  const toggleSubServiceExpanded = (subServiceId: string) => {
    setExpandedSubServices((prev) => ({
      ...prev,
      [subServiceId]: !prev[subServiceId],
    }))
  }

  // Add new parent service
  const addParentService = () => {
    const newService: ParentService = {
      id: generateId(),
      name: "New Service",
      subServices: [],
    }
    setServices([...services, newService])
    setEditingService(newService.id)
    setNewServiceName(newService.name)
    setExpandedServices((prev) => ({
      ...prev,
      [newService.id]: true,
    }))
  }

  // Add new sub service
  const addSubService = (parentId: string) => {
    const newSubService: SubService = {
      id: generateId(),
      name: "New Sub Service",
      priceCards: getDefaultPriceCards(),
    }

    setServices(
      services.map((service) => {
        if (service.id === parentId) {
          return {
            ...service,
            subServices: [...service.subServices, newSubService],
          }
        }
        return service
      }),
    )

    setEditingSubService(newSubService.id)
    setNewSubServiceName(newSubService.name)
    setExpandedSubServices((prev) => ({
      ...prev,
      [newSubService.id]: true,
    }))
  }

  // Save parent service name
  const saveServiceName = (serviceId: string) => {
    if (!newServiceName.trim()) {
      setErrorMessage("Service name cannot be empty")
      return
    }

    setServices(
      services.map((service) => {
        if (service.id === serviceId) {
          return {
            ...service,
            name: newServiceName,
          }
        }
        return service
      }),
    )

    setEditingService(null)
    setErrorMessage(null)
  }

  // Save sub service name
  const saveSubServiceName = (parentId: string, subServiceId: string) => {
    if (!newSubServiceName.trim()) {
      setErrorMessage("Sub-service name cannot be empty")
      return
    }

    setServices(
      services.map((service) => {
        if (service.id === parentId) {
          return {
            ...service,
            subServices: service.subServices.map((subService) => {
              if (subService.id === subServiceId) {
                return {
                  ...subService,
                  name: newSubServiceName,
                }
              }
              return subService
            }),
          }
        }
        return service
      }),
    )

    setEditingSubService(null)
    setErrorMessage(null)
  }

  // Delete parent service
  const deleteParentService = (serviceId: string) => {
    setServices(services.filter((service) => service.id !== serviceId))
  }

  // Delete sub service
  const deleteSubService = (parentId: string, subServiceId: string) => {
    setServices(
      services.map((service) => {
        if (service.id === parentId) {
          return {
            ...service,
            subServices: service.subServices.filter((subService) => subService.id !== subServiceId),
          }
        }
        return service
      }),
    )
  }

  // Open card dialog for editing
  const openCardDialog = (parentId: string, subId: string, card: PriceCard) => {
    setCurrentParentId(parentId)
    setCurrentSubId(subId)
    setCurrentCard({ ...card })
    setCardDialogOpen(true)
  }

  // Open card dialog for adding
  const openAddCardDialog = (parentId: string, subId: string) => {
    const subService = services.find((s) => s.id === parentId)?.subServices.find((sub) => sub.id === subId)

    if (subService && subService.priceCards.length >= 5) {
      setErrorMessage("Maximum of 5 price cards allowed per sub-service")
      return
    }

    setCurrentParentId(parentId)
    setCurrentSubId(subId)
    setCurrentCard({
      id: generateId(),
      name: "",
      price: 0,
      features: [""],
      isPopular: false,
    })
    setCardDialogOpen(true)
    setErrorMessage(null)
  }

  // Save price card
  const saveCard = () => {
    if (!currentCard || !currentParentId || !currentSubId) return

    if (!currentCard.name.trim()) {
      setErrorMessage("Card name cannot be empty")
      return
    }

    setServices(
      services.map((service) => {
        if (service.id === currentParentId) {
          return {
            ...service,
            subServices: service.subServices.map((subService) => {
              if (subService.id === currentSubId) {
                const existingCardIndex = subService.priceCards.findIndex((card) => card.id === currentCard.id)

                if (existingCardIndex >= 0) {
                  // Update existing card
                  const updatedCards = [...subService.priceCards]
                  updatedCards[existingCardIndex] = currentCard
                  return {
                    ...subService,
                    priceCards: updatedCards,
                  }
                } else {
                  // Add new card
                  return {
                    ...subService,
                    priceCards: [...subService.priceCards, currentCard],
                  }
                }
              }
              return subService
            }),
          }
        }
        return service
      }),
    )

    setCardDialogOpen(false)
    setCurrentCard(null)
    setCurrentParentId(null)
    setCurrentSubId(null)
    setErrorMessage(null)
  }

  // Delete price card
  const deleteCard = (parentId: string, subId: string, cardId: string) => {
    setServices(
      services.map((service) => {
        if (service.id === parentId) {
          return {
            ...service,
            subServices: service.subServices.map((subService) => {
              if (subService.id === subId) {
                return {
                  ...subService,
                  priceCards: subService.priceCards.filter((card) => card.id !== cardId),
                }
              }
              return subService
            }),
          }
        }
        return service
      }),
    )
  }

  // Add feature to card
  const addFeature = () => {
    if (!currentCard) return
    setCurrentCard({
      ...currentCard,
      features: [...currentCard.features, ""],
    })
  }

  // Update feature
  const updateFeature = (index: number, value: string) => {
    if (!currentCard) return
    const updatedFeatures = [...currentCard.features]
    updatedFeatures[index] = value
    setCurrentCard({
      ...currentCard,
      features: updatedFeatures,
    })
  }

  // Remove feature
  const removeFeature = (index: number) => {
    if (!currentCard) return
    const updatedFeatures = [...currentCard.features]
    updatedFeatures.splice(index, 1)
    setCurrentCard({
      ...currentCard,
      features: updatedFeatures,
    })
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h4" component="h1">
          Service & Pricing Management
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={addParentService}>
          Add Service
        </Button>
      </Box>

      <Collapse in={!!errorMessage}>
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          action={
            <IconButton aria-label="close" color="inherit" size="small" onClick={() => setErrorMessage(null)}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {errorMessage}
        </Alert>
      </Collapse>

      {services.map((service) => (
        <ServiceSection key={service.id} elevation={3}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            {editingService === service.id ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%" }}>
                <TextField
                  fullWidth
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  placeholder="Service name"
                  size="small"
                  autoFocus
                />
                <IconButton onClick={() => saveServiceName(service.id)} color="primary">
                  <CheckIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setEditingService(null)
                    setErrorMessage(null)
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton onClick={() => toggleServiceExpanded(service.id)} size="small">
                  {expandedServices[service.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
                <Typography variant="h6">{service.name}</Typography>
              </Box>
            )}

            {editingService !== service.id && (
              <Box>
                <IconButton
                  onClick={() => {
                    setEditingService(service.id)
                    setNewServiceName(service.name)
                  }}
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => deleteParentService(service.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
          </Box>

          <Collapse in={expandedServices[service.id]}>
            <Box sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => addSubService(service.id)}
                sx={{ mb: 2 }}
              >
                Add Sub Service
              </Button>

              {service.subServices.map((subService) => (
                <SubServiceSection key={subService.id} elevation={1}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    {editingSubService === subService.id ? (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%" }}>
                        <TextField
                          fullWidth
                          value={newSubServiceName}
                          onChange={(e) => setNewSubServiceName(e.target.value)}
                          placeholder="Sub-service name"
                          size="small"
                          autoFocus
                        />
                        <IconButton onClick={() => saveSubServiceName(service.id, subService.id)} color="primary">
                          <CheckIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setEditingSubService(null)
                            setErrorMessage(null)
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                      </Box>
                    ) : (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <IconButton onClick={() => toggleSubServiceExpanded(subService.id)} size="small">
                          {expandedSubServices[subService.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {subService.name}
                        </Typography>
                      </Box>
                    )}

                    {editingSubService !== subService.id && (
                      <Box>
                        <IconButton
                          onClick={() => {
                            setEditingSubService(subService.id)
                            setNewSubServiceName(subService.name)
                          }}
                          color="primary"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => deleteSubService(service.id, subService.id)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    )}
                  </Box>

                  <Collapse in={expandedSubServices[subService.id]}>
                    <Box sx={{ mt: 2 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Price Cards ({subService.priceCards.length}/5)
                        </Typography>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<AddIcon />}
                          onClick={() => openAddCardDialog(service.id, subService.id)}
                          disabled={subService.priceCards.length >= 5}
                        >
                          Add Price Card
                        </Button>
                      </Box>

                      <Grid container spacing={3}>
                        {subService.priceCards.map((card) => (
                          <Grid item xs={12} sm={6} md={4} key={card.id}>
                            {card.isPopular ? (
                              <PopularCard>
                                <PopularBadge>
                                  <Typography variant="caption" fontWeight="bold">
                                    Popular
                                  </Typography>
                                </PopularBadge>
                                <CardContent sx={{ flexGrow: 1 }}>
                                  <Typography variant="h5" component="div" gutterBottom>
                                    {card.name}
                                  </Typography>
                                  <Typography variant="h4" color="primary" gutterBottom>
                                    ${card.price.toFixed(2)}
                                  </Typography>
                                  <Divider sx={{ my: 2 }} />
                                  {card.features.map((feature, index) => (
                                    <Typography key={index} variant="body2" paragraph>
                                      • {feature}
                                    </Typography>
                                  ))}
                                </CardContent>
                                <Box sx={{ p: 2, pt: 0 }}>
                                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Button
                                      size="small"
                                      onClick={() => openCardDialog(service.id, subService.id, card)}
                                      startIcon={<EditIcon />}
                                    >
                                      Edit
                                    </Button>
                                    <Button
                                      size="small"
                                      color="error"
                                      onClick={() => deleteCard(service.id, subService.id, card.id)}
                                      startIcon={<DeleteIcon />}
                                    >
                                      Delete
                                    </Button>
                                  </Box>
                                </Box>
                              </PopularCard>
                            ) : (
                              <StyledCard>
                                <CardContent sx={{ flexGrow: 1 }}>
                                  <Typography variant="h5" component="div" gutterBottom>
                                    {card.name}
                                  </Typography>
                                  <Typography variant="h4" color="primary" gutterBottom>
                                    ${card.price.toFixed(2)}
                                  </Typography>
                                  <Divider sx={{ my: 2 }} />
                                  {card.features.map((feature, index) => (
                                    <Typography key={index} variant="body2" paragraph>
                                      • {feature}
                                    </Typography>
                                  ))}
                                </CardContent>
                                <Box sx={{ p: 2, pt: 0 }}>
                                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Button
                                      size="small"
                                      onClick={() => openCardDialog(service.id, subService.id, card)}
                                      startIcon={<EditIcon />}
                                    >
                                      Edit
                                    </Button>
                                    <Button
                                      size="small"
                                      color="error"
                                      onClick={() => deleteCard(service.id, subService.id, card.id)}
                                      startIcon={<DeleteIcon />}
                                    >
                                      Delete
                                    </Button>
                                  </Box>
                                </Box>
                              </StyledCard>
                            )}
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Collapse>
                </SubServiceSection>
              ))}
            </Box>
          </Collapse>
        </ServiceSection>
      ))}

      {/* Price Card Dialog */}
      <Dialog
        open={cardDialogOpen}
        onClose={() => {
          setCardDialogOpen(false)
          setErrorMessage(null)
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {currentCard?.id ? (currentCard.name ? `Edit ${currentCard.name}` : "Edit Price Card") : "Add Price Card"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1, display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              label="Card Name"
              fullWidth
              value={currentCard?.name || ""}
              onChange={(e) => setCurrentCard((prev) => (prev ? { ...prev, name: e.target.value } : null))}
              required
            />

            <TextField
              label="Price"
              type="number"
              fullWidth
              value={currentCard?.price || 0}
              onChange={(e) =>
                setCurrentCard((prev) => (prev ? { ...prev, price: Number.parseFloat(e.target.value) || 0 } : null))
              }
              InputProps={{
                startAdornment: "$",
              }}
            />

            <FormControl fullWidth>
              <InputLabel id="popular-label">Popular</InputLabel>
              <Select
                labelId="popular-label"
                value={currentCard?.isPopular ? "yes" : "no"}
                label="Popular"
                onChange={(e) =>
                  setCurrentCard((prev) => (prev ? { ...prev, isPopular: e.target.value === "yes" } : null))
                }
              >
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Select>
            </FormControl>

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Features
              </Typography>

              {currentCard?.features.map((feature, index) => (
                <Box key={index} sx={{ display: "flex", gap: 1, mb: 2 }}>
                  <TextField
                    fullWidth
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    placeholder={`Feature ${index + 1}`}
                    size="small"
                  />
                  <IconButton
                    color="error"
                    onClick={() => removeFeature(index)}
                    disabled={currentCard.features.length <= 1}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}

              <Button startIcon={<AddIcon />} onClick={addFeature} variant="outlined" size="small">
                Add Feature
              </Button>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setCardDialogOpen(false)
              setErrorMessage(null)
            }}
          >
            Cancel
          </Button>
          <Button onClick={saveCard} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

