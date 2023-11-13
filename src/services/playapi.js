import api from './api'

const playsService = {}

playsService.getRoot = () => api.get('/')
playsService.getPlays = () => api.get(`/plays`)
playsService.getPlayById = (id) => api.get(`/plays/${id}`)
playsService.createPlay = (data) => api.post(`/plays/`, data)
playsService.deletePlay = (id) => api.delete(`/plays/${id}`)
playsService.updatePlay = (id, data) => api.put(`/plays/${id}`, data)
export default playsService
