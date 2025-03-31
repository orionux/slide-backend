"use client"

import { useEffect, useState } from "react"
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
  CircularProgress,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import {
  Delete as DeleteIcon,
  Pencil as EditIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from "mdi-material-ui";

import { CiSquarePlus as AddIcon } from "react-icons/ci";
import {
  IoIosArrowDown as ExpandMoreIcon,
  IoIosArrowUp as ExpandLessIcon
} from "react-icons/io";
import { useAuth } from 'src/@core/context/AuthContext'
import { getParentServicesServices } from "src/services/CostMatrixManagementService";
import { enqueueSnackbar } from "notistack";
import { addPriceCard, addService, deleteParentServiceApi, deletePriceCardeApi, getAllParentServices, updateParentServiceApi, updatePriceCard } from "../api/CostMatrixManagement";

//   import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

// Types

interface Attributes {
  id?: string
  card_id?: number | null
  feature: string

}
interface PriceCard {
  id?: string
  service_id: string
  package_name: string
  slide_count: number
  price: number
  description: string
  attributes: Attributes[]
  isPopular?: any
}

interface SubService {
  id: string
  name: string
  parent_service: string
  price_cards: PriceCard[]
}

interface ParentService {
  id: string
  name: string
  sub_services: SubService[]
  parent_service: string

}

interface FormData {
  parent_service: string
  name: string
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
    service_id: "default_service_id", // Provide a default value for service_id
    package_name: "Basic",
    slide_count: 10, // Provide a default value for slide_count
    price: 9.99,
    attributes: [
      {
        id: "2",
        card_id: 2,
        feature: "string",
      },
    ],
    isPopular: false,
    description: "description",
  },
];

export default function PriceCardsManager() {

  // State
  const [services, setServices] = useState<ParentService[]>([
    // {
    //   id: generateId(),
    //   name: "Web Development",
    //   subServices: [
    //     {
    //       id: generateId(),
    //       name: "Frontend Development",
    //       priceCards: getDefaultPriceCards(),
    //     },
    //   ],
    // },
  ])

  const [editingService, setEditingService] = useState<string | null>(null)
  const [editingSubService, setEditingSubService] = useState<string | null>(null)
  const [editingCard, setEditingCard] = useState<PriceCard | null>(null)
  const [newServiceName, setNewServiceName] = useState("")
  const [newSubServiceName, setNewSubServiceName] = useState("")
  const [expandedServices, setExpandedServices] = useState<Record<string, boolean>>({})
  const [expandedSubServices, setExpandedSubServices] = useState<Record<string, boolean>>({})
  const [cardDialogOpen, setCardDialogOpen] = useState(false)
  const [currentParentId, setCurrentParentId] = useState<string | null>(null)
  const [currentSubId, setCurrentSubId] = useState<string | null>(null)
  const [currentCard, setCurrentCard] = useState<PriceCard | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)


  const { apiConfig, isAuthenticated } = useAuth()

  // loadings
  const [addLoading, setAddLoading] = useState(false)
  const [updateLoading, setUpdateLoading] = useState<string | boolean>(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [subUpdateLoading, setSubUpdateLoading] = useState<string | boolean>(false)
  const [subAddLoading, setSubAddLoading] = useState<string | boolean>(false)
  const [subDeleteLoading, setSubDeleteLoading] = useState(false)

  //set API data 
  const [parentServices, setParentServices] = useState([])

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
  const addParentService = async () => {
    setAddLoading(true)

    const parentFormData = {
      parent_service: "none",
      name: "New Service"
    }

    const result = await addService(parentFormData, apiConfig)

    if (result.responseType === 'success') {

      // console.log(result)

      // setServices([...services, newService])
      // setEditingService(newService.id)
      // setNewServiceName(newService.name)
      // setExpandedServices((prev) => ({
      //   ...prev,
      //   [newService.id]: true,
      // }))

      // console.log(result?.output?.data);
      // enqueueSnackbar('Sub Admin added successful!', { variant: 'success' });
      fetchParentServices()
      setAddLoading(false)

    } else if (result.responseType === 'fail') {
      setAddLoading(false)
      enqueueSnackbar(result.output.message || 'something went wrong', { variant: 'error' });
    } else if (result.responseType === 'error') {
      setAddLoading(false)
      enqueueSnackbar(result.output.message || 'An error occurred', { variant: 'error' });
    }


    // const newService: ParentService = {
    //   id: generateId(),
    //   name: "New Service",
    //   sub_services: [],
    //   parent_service: "string"
    // }
    // setServices([...services, newService])


    // setEditingService(newService.id)
    // setNewServiceName(newService.name)
    // setExpandedServices((prev) => ({
    //   ...prev,
    //   [newService.id]: true,
    // }))
  }

  // Add new sub service
  const addSubService = async (parentId: string) => {
    setSubAddLoading(parentId)
    // const newSubService: SubService = {
    //   id: generateId(),
    //   name: "New Sub Service",
    //   parent_service : "string",
    //   price_cards: getDefaultPriceCards(),
    // }

    // setServices(
    //   services.map((service) => {
    //     if (service.id === parentId) {
    //       return {
    //         ...service,
    //         sub_services: [...service.sub_services, newSubService],
    //       }
    //     }
    //     return service
    //   }),
    // )

    // setEditingSubService(newSubService.id)
    // setNewSubServiceName(newSubService.name)
    // setExpandedSubServices((prev) => ({
    //   ...prev,
    //   [newSubService.id]: true,
    // }))

    const parentFormData = {
      parent_service: parentId,
      name: "New Sub Service"
    }

    const result = await addService(parentFormData, apiConfig)

    if (result.responseType === 'success') {

      // setServices([...services, newService])
      // setEditingService(newService.id)
      // setNewServiceName(newService.name)
      // setExpandedServices((prev) => ({
      //   ...prev,
      //   [newService.id]: true,
      // }))

      // console.log(result?.output?.data);
      // enqueueSnackbar('Sub Admin added successful!', { variant: 'success' });
      fetchParentServices()
      setSubAddLoading(false)
    } else if (result.responseType === 'fail') {
      setSubAddLoading(false)
      enqueueSnackbar(result.output.message || 'something went wrong', { variant: 'error' });
    } else if (result.responseType === 'error') {
      setSubAddLoading(false)
      enqueueSnackbar(result.output.message || 'An error occurred', { variant: 'error' });
    }
  }

  // Save parent service name
  const saveServiceName = async (serviceId: string) => {

    if (!newServiceName.trim()) {
      setErrorMessage("Service name cannot be empty")
      return
    }

    const updateData = {
      id: serviceId,
      parent_service: "none",
      name: newServiceName
    }

    // handleUpdateService(updateData)

    setUpdateLoading(serviceId)
    const result = await updateParentServiceApi(updateData, apiConfig)

    if (result.responseType === 'success') {

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
      // fetchParentServices()
      // setOpenDialog(false);
      // fetchServices();
      setEditingService(null)
      setErrorMessage(null)
      setUpdateLoading(false)
      enqueueSnackbar('Service updated successful!', { variant: 'success' });
    } else if (result.responseType === 'fail') {
      setUpdateLoading(false)
      enqueueSnackbar(result.output.message || 'something went wrong', { variant: 'error' });
    } else if (result.responseType === 'error') {
      setUpdateLoading(false)
      enqueueSnackbar(result.output.message || 'An error occurred', { variant: 'error' });
    }


  }

  // Save sub service name
  const saveSubServiceName = async (parentId: string, subServiceId: string) => {
    setSubUpdateLoading(subServiceId)
    if (!newSubServiceName.trim()) {
      setErrorMessage("Sub-service name cannot be empty")
      return
    }

    // console.log(parentId, subServiceId)
    const updateData = {
      id: subServiceId,
      parent_service: parentId,
      name: newSubServiceName
    }

    // console.log(updateData)


    const result = await updateParentServiceApi(updateData, apiConfig)

    if (result.responseType === 'success') {
      fetchParentServices()
      enqueueSnackbar('Service updated successful!', { variant: 'success' });
      setServices(
        services.map((service) => {
          if (service.id === parentId) {
            return {
              ...service,
              subServices: service.sub_services.map((subService) => {
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


      // setOpenDialog(false);
      // fetchServices();
    } else if (result.responseType === 'fail') {
      setSubUpdateLoading(false)
      enqueueSnackbar(result.output.message || 'something went wrong', { variant: 'error' });
    } else if (result.responseType === 'error') {
      setSubUpdateLoading(false)
      enqueueSnackbar(result.output.message || 'An error occurred', { variant: 'error' });
    }
  }

  // Delete parent service
  const deleteParentService = async (serviceId: string) => {

    setDeleteLoading(true)
    const result = await deleteParentServiceApi(serviceId, apiConfig)

    if (result.responseType === 'success') {
      enqueueSnackbar('Service Deleted successful!', { variant: 'success' });
      setServices(services.filter((service) => service.id !== serviceId))
      setDeleteLoading(false)
    } else if (result.responseType === 'fail') {
      setDeleteLoading(false)
      enqueueSnackbar(result.output.message || 'something went wrong', { variant: 'error' });
    } else if (result.responseType === 'error') {
      setDeleteLoading(false)
      enqueueSnackbar(result.output.message || 'An error occurred', { variant: 'error' });
    }

  }

  // Delete sub service
  const deleteSubService = async (parentId: string, subServiceId: string) => {
    // setServices(
    //   services.map((service) => {
    //     if (service.id === parentId) {
    //       return {
    //         ...service,
    //         subServices: service.sub_services.filter((subService) => subService.id !== subServiceId),
    //       }
    //     }
    //     return service
    //   }),
    // )
    setSubDeleteLoading(true)
    const result = await deleteParentServiceApi(subServiceId, apiConfig)

    if (result.responseType === 'success') {
      fetchParentServices()
      setSubDeleteLoading(false)
      enqueueSnackbar('Sub Service Deleted successful!', { variant: 'success' });
      // setServices(services.filter((service) => service.id !== serviceId))
      // setServices(
      //     services.map((service) => {
      //       if (service.id === parentId) {
      //         return {
      //           ...service,
      //           subServices: service.sub_services.filter((subService) => subService.id !== subServiceId),
      //         }
      //       }
      //       return service
      //     }),
      //   )
      fetchParentServices()
    } else if (result.responseType === 'fail') {
      setSubDeleteLoading(false)
      enqueueSnackbar(result.output.message || 'something went wrong', { variant: 'error' });
    } else if (result.responseType === 'error') {
      setSubDeleteLoading(false)
      enqueueSnackbar(result.output.message || 'An error occurred', { variant: 'error' });
    }
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
    // console.log(parentId, subId)
    const subService = services.find((s) => s.id === parentId)?.sub_services.find((sub) => sub.id === subId)

    if (subService && subService.price_cards.length >= 5) {
      setErrorMessage("Maximum of 5 price cards allowed per sub-service")
      return
    }

    // console.log(subService)

    setCurrentParentId(parentId)
    setCurrentSubId(subId)
    // setCurrentCard(subService)
    setCurrentCard(
      {
        // id: generateId(),
        service_id: subId,
        package_name: "Basic",
        price: 150,
        slide_count: 10,
        isPopular: false,
        description: "description",
        attributes: [
          {
            // id: "2",
            card_id: Number(subId),
            feature: "",
          },
        ],
      }

      //   {
      //     "id": 1,
      //     "service_id": 1,
      //     "package_name": "Basic",
      //     "price": 150,
      //     "slide_count": "10",
      //     "description": "Designed for smaller businesses or those with simpler presentation needs. This package offers essential slide design services.",
      //     "isPopular": null,
      //     "created_at": "2025-02-06T10:17:30.000000Z",
      //     "updated_at": "2025-02-06T10:17:30.000000Z",
      //     "deleted_at": null,
      //     "attributes": [
      //         {
      //             "id": 1,
      //             "card_id": 1,
      //             "feature": "Basic formatt..|",
      //             "created_at": "2025-02-06T10:29:02.000000Z",
      //             "updated_at": "2025-02-06T10:29:02.000000Z",
      //             "deleted_at": null
      //         }
      //     ]
      // }
    )
    setCardDialogOpen(true)
    setErrorMessage(null)
  }

  // Save price card
  const saveCard = async () => {
    // setAddPriceLoading(true)
    // console.log(currentCard)

    if (editingCard !== null) {



      const result = await updatePriceCard(currentCard, apiConfig)
      if (result.responseType === 'success') {
        fetchParentServices()
        enqueueSnackbar('price card updated successfully!', { variant: 'success' });
        setCardDialogOpen(false)
        setCurrentCard(null)
        setCurrentParentId(null)
        setErrorMessage(null)
        setCurrentSubId(null)
        setEditingCard(null)
      } else if (result.responseType === 'fail') {
        // setAddPriceLoading(false)
        enqueueSnackbar(result.output.message || 'something went wrong', { variant: 'error' });
      } else if (result.responseType === 'error') {
        // setAddPriceLoading(false)
        enqueueSnackbar(result.output.message || 'An error occurred', { variant: 'error' });
      }




    } else {

      const result = await addPriceCard(currentCard, apiConfig)

      if (result.responseType === 'success') {
        fetchParentServices()
        enqueueSnackbar('price card saved successfully!', { variant: 'success' });
        setCardDialogOpen(false)
        setCurrentCard(null)
        setCurrentParentId(null)
        setErrorMessage(null)
        setCurrentSubId(null)
      } else if (result.responseType === 'fail') {
        // setAddPriceLoading(false)
        enqueueSnackbar(result.output.message || 'something went wrong', { variant: 'error' });
      } else if (result.responseType === 'error') {
        // setAddPriceLoading(false)
        enqueueSnackbar(result.output.message || 'An error occurred', { variant: 'error' });
      }

    }



    // if (!currentCard || !currentParentId || !currentSubId) return

    // if (!currentCard.package_name.trim()) {
    //   setErrorMessage("Card name cannot be empty")
    //   return
    // }

    // console.log(currentCard)

    // setServices(
    //   services.map((service) => {
    //     if (service.id === currentParentId) {
    //       return {
    //         ...service,
    //         subServices: service.sub_services.map((subService) => {
    //           if (subService.id === currentSubId) {
    //             const existingCardIndex = subService.price_cards.findIndex((card) => card.id === currentCard.id)

    //             if (existingCardIndex >= 0) {
    //               // Update existing card
    //               const updatedCards = [...subService.price_cards]
    //               updatedCards[existingCardIndex] = currentCard
    //               return {
    //                 ...subService,
    //                 price_cards: updatedCards,
    //               }
    //             } else {
    //               // Add new card
    //               return {
    //                 ...subService,
    //                 price_cards: [...subService.price_cards, currentCard],
    //               }
    //             }
    //           }
    //           return subService
    //         }),
    //       }
    //     }
    //     return service
    //   }),
    // )

    // setCardDialogOpen(false)
    // setCurrentCard(null)
    // setCurrentParentId(null)
    // setErrorMessage(null)
    // setCurrentSubId(null)
  }

  // Delete price card
  const deleteCard = async (parentId: string, subId: string, cardId: string) => {


    const result = await deletePriceCardeApi(cardId, apiConfig)

    if (result.responseType === 'success') {
      // console.log(result?.output?.data)
      fetchParentServices()
    } else if (result.responseType === 'fail') {
      // setLoading(false)
      enqueueSnackbar(result.output.message || 'Retrieving services failed', { variant: 'error' });
    } else if (result.responseType === 'error') {
      // setLoading(false)
      enqueueSnackbar(result.output.message || 'An error occurred', { variant: 'error' });
    }

    // setServices(
    //   services.map((service) => {
    //     if (service.id === parentId) {
    //       return {
    //         ...service,
    //         subServices: service.sub_services.map((subService) => {
    //           if (subService.id === subId) {
    //             return {
    //               ...subService,
    //               priceCards: subService.price_cards.filter((card) => card.id !== cardId),
    //             }
    //           }
    //           return subService
    //         }),
    //       }
    //     }
    //     return service
    //   }),
    // )
  }

  // Add feature to card
  const addFeature = () => {
    if (!currentCard) return
    setCurrentCard({
      ...currentCard,
      attributes: [...currentCard.attributes, {
        card_id: Number(currentSubId),
        feature: "",
      }],
    })
  }

  // Update feature
  const updateFeature = (index: number, value: string) => {
    if (!currentCard) return
    const updatedFeatures = [...currentCard.attributes]
    updatedFeatures[index] = {
      id: currentCard.attributes[index].id,
      card_id: currentCard.attributes[index].card_id,
      feature: value
    }
    setCurrentCard({
      ...currentCard,
      attributes: updatedFeatures,
    })
  }

  // Remove feature
  const removeFeature = (index: number) => {
    if (!currentCard) return
    const updatedFeatures = [...currentCard.attributes]
    updatedFeatures.splice(index, 1)
    setCurrentCard({
      ...currentCard,
      attributes: updatedFeatures,
    })
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchParentServices()
    }
  }, [apiConfig])


  //api handling 

  const handleAddParentService = async (formData: FormData) => {
    // console.log(formData)
    setAddLoading(true)

    const result = await addService(formData, apiConfig)

    if (result.responseType === 'success') {

      // console.log(result)

      // console.log(result?.output?.data);
      // enqueueSnackbar('Sub Admin added successful!', { variant: 'success' });
      fetchParentServices()
      setAddLoading(false)
      // handleCloseSubAdmin();
      // fetchSubAdmins()
    } else if (result.responseType === 'fail') {
      setAddLoading(false)
      enqueueSnackbar(result.output.message || 'something went wrong', { variant: 'error' });
    } else if (result.responseType === 'error') {
      setAddLoading(false)
      enqueueSnackbar(result.output.message || 'An error occurred', { variant: 'error' });
    }

  }


  const fetchParentServices = async () => {
    // setLoading(true)
    // console.log(apiConfig);

    const result = await getAllParentServices(apiConfig)

    if (result.responseType === 'success') {
      setServices(result?.output?.data)
      // console.log(result?.output?.data)
      // setParentServices(result?.output?.data)
      // updateRows(result?.output?.data)
      // setRows(result?.output?.data)
      // setLoading(false)
    } else if (result.responseType === 'fail') {
      // setLoading(false)
      enqueueSnackbar(result.output.message || 'Retrieving services failed', { variant: 'error' });
    } else if (result.responseType === 'error') {
      // setLoading(false)
      enqueueSnackbar(result.output.message || 'An error occurred', { variant: 'error' });
    }
  }

  const handleUpdateService = async (formData: any) => {
    setUpdateLoading(true)
    const result = await updateParentServiceApi(formData, apiConfig)

    if (result.responseType === 'success') {

      enqueueSnackbar('Services updated successful!', { variant: 'success' });
      // setOpenDialog(false);
      // fetchServices();
    } else if (result.responseType === 'fail') {
      setUpdateLoading(false)
      enqueueSnackbar(result.output.message || 'something went wrong', { variant: 'error' });
    } else if (result.responseType === 'error') {
      setUpdateLoading(false)
      enqueueSnackbar(result.output.message || 'An error occurred', { variant: 'error' });
    }

  }


  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h4" component="h1">
          Service & Pricing Management
        </Typography>
        <Button variant="contained" onClick={addParentService}
          disabled={addLoading}
          startIcon={addLoading ? <CircularProgress size={20} color='inherit' /> : <AddIcon />}
        >
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

                  {
                    updateLoading === service.id ?
                      <CircularProgress size={20} color='inherit' />
                      :

                      // <EditIcon />
                      <CheckIcon />
                  }
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
                // startIcon={}
                onClick={() => addSubService(service.id)}
                sx={{ mb: 2 }}
                disabled={subAddLoading === service.id}
                startIcon={subAddLoading === service.id ? <CircularProgress size={20} color='inherit' /> : <AddIcon />}
              >
                Add Sub Service
              </Button>

              {service.sub_services.map((subService) => (
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

                          {
                            subUpdateLoading === subService.id ?
                              <CircularProgress size={20} color='inherit' />
                              :

                              // <EditIcon />
                              <CheckIcon />
                          }
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
                          Price Cards ({subService.price_cards.length}/5)
                        </Typography>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<AddIcon />}
                          onClick={() => openAddCardDialog(service.id, subService.id)}
                          disabled={subService.price_cards.length >= 5}
                        >
                          Add Price Card
                        </Button>
                      </Box>

                      <Grid container spacing={3}>
                        {subService.price_cards.map((card: PriceCard) => (
                          <Grid item xs={12} sm={6} md={4} key={card.id}>
                            {card.isPopular === "true" ?(
                              <PopularCard>
                                <PopularBadge>
                                  <Typography variant="caption" fontWeight="bold">
                                    Popular
                                  </Typography>
                                </PopularBadge>
                                <CardContent sx={{ flexGrow: 1 }}>
                                  <Typography variant="h5" component="div" gutterBottom>
                                    {card.package_name}
                                  </Typography>
                                  <Typography variant="h4" color="primary" gutterBottom>
                                    ${card.price.toFixed(2)}
                                  </Typography>
                                  <Divider sx={{ my: 2 }} />
                                  {card.attributes.map((attribute, index) => (
                                    <Typography key={index} variant="body2" paragraph>
                                      • {attribute.feature}
                                    </Typography>
                                  ))}
                                </CardContent>
                                <Box sx={{ p: 2, pt: 0 }}>
                                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Button
                                      size="small"
                                      onClick={() => {
                                        setEditingCard(card)
                                        // console.log(card)
                                        openCardDialog(service.id, subService.id, card)

                                      }}
                                      startIcon={<EditIcon />}
                                    >
                                      Edit
                                    </Button>
                                    <Button
                                      size="small"
                                      color="error"
                                      onClick={() => deleteCard(service.id, subService.id, card.id || '')}
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
                                    {card.package_name}
                                  </Typography>
                                  <Typography variant="h4" color="primary" gutterBottom>
                                    ${card.price.toFixed(2)}
                                  </Typography>
                                  <Divider sx={{ my: 2 }} />
                                  {card.attributes.map((attribute, index) => (
                                    <Typography key={index} variant="body2" paragraph>
                                      • {attribute.feature}
                                    </Typography>
                                  ))}
                                </CardContent>
                                <Box sx={{ p: 2, pt: 0 }}>
                                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Button
                                      size="small"
                                      onClick={() => {
                                        setEditingCard(card)
                                        openCardDialog(service.id, subService.id, card)
                                      }}
                                      startIcon={<EditIcon />}
                                    >
                                      Edit
                                    </Button>
                                    <Button
                                      size="small"
                                      color="error"
                                      onClick={() => deleteCard(service.id, subService.id, card.id || '')}
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
          {currentCard?.id ? (currentCard.package_name ? `Edit ${currentCard.package_name}` : "Edit Price Card") : "Add Price Card"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1, display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              label="Card Name"
              fullWidth
              value={currentCard?.package_name}
              onChange={(e) => setCurrentCard((prev) => (prev ? { ...prev, package_name: e.target.value } : null))}
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

            <TextField
              label="Slides Count"
              type="number"
              fullWidth
              value={currentCard?.slide_count || 0}
              onChange={(e) =>
                setCurrentCard((prev) => (prev ? { ...prev, slide_count: Number(e.target.value) || 0 } : null))
              }
            // InputProps={{
            //   startAdornment: "$",
            // }}
            />

            <FormControl fullWidth>
              <InputLabel id="popular-label">Popular</InputLabel>
              <Select
                labelId="popular-label"
                defaultValue="No"
                value={currentCard?.isPopular !== "false" ? "No" : "No"}
                label="Popular"
                onChange={(e) =>
                  setCurrentCard((prev) => (prev ? { ...prev, isPopular: e.target.value === "Yes" } : null))
                }
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Features
              </Typography>

              {currentCard?.attributes.map((attribute, index) => (
                <Box key={index} sx={{ display: "flex", gap: 1, mb: 2 }}>
                  <TextField
                    fullWidth
                    value={attribute.feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    placeholder={`Feature ${index + 1}`}
                    size="small"
                  />
                  <IconButton
                    color="error"
                    onClick={() => removeFeature(index)}
                    disabled={currentCard.attributes.length < 1}
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

