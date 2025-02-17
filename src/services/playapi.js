import api from './api'

const playsService = {}

playsService.getRoot = () => api.get('/')
playsService.getPlays = () => api.get(`/plays`)
playsService.getPlayById = (id) => api.get(`/plays/${id}`)
playsService.createPlay = (data) => api.post(`/plays/`, data)
playsService.deletePlay = (id) => api.delete(`/plays/${id}`)
playsService.updatePlay = (id, data) => api.put(`/plays/${id}`, data)
playsService.createShow = (id, data) => api.post(`/shows/${id}`, data)
playsService.deleteShow = (id) => api.delete(`/shows/${id}`)
playsService.getShow = (id) => api.get(`/shows/${id}`)
playsService.getTheaters = () => api.get(`/theater/`)
playsService.getTheaterById = (id) => api.get(`/theater/${id}`)
playsService.createTheater = (data) => api.post(`/theater/`, data)
playsService.deleteTheater = (id) => api.delete(`/theater/${id}`)
playsService.updateTheater = (id, data) => api.put(`/theater/${id}`, data)
export default playsService
