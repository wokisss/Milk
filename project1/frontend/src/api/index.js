import axios from 'axios'

const request = axios.create({ baseURL: '/api', timeout: 10000 })

request.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers['Authorization'] = `Bearer ${token}`
  return config
})

request.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

export const login = (data) => request({ url: '/login', method: 'post', data })

export const farmerAPI = {
  getFarmers: () => request({ url: '/farmers', method: 'get' }),
  getFarmer: (id) => request({ url: `/farmers/${id}`, method: 'get' }),
  addFarmer: (data) => request({ url: '/farmers', method: 'post', data }),
  updateFarmer: (id, data) => request({ url: `/farmers/${id}`, method: 'put', data }),
  deleteFarmer: (id) => request({ url: `/farmers/${id}`, method: 'delete' })
}

export const purchaseAPI = {
  getPurchases: () => request({ url: '/purchases', method: 'get' }),
  getPurchase: (id) => request({ url: `/purchases/${id}`, method: 'get' }),
  addPurchase: (data) => request({ url: '/purchases', method: 'post', data }),
  updatePurchase: (id, data) => request({ url: `/purchases/${id}`, method: 'put', data }),
  deletePurchase: (id) => request({ url: `/purchases/${id}`, method: 'delete' })
}

export const userAPI = {
  getUserInfo: () => request({ url: '/user/info', method: 'get' }),
  updateUserInfo: (data) => request({ url: '/user/info', method: 'put', data })
}



