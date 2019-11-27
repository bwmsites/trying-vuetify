import axios from 'axios'

export const http = axios.create({
  baseURL: 'http://localhost:3333/',
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjYsImlhdCI6MTU1NjQ3ODAzOH0.75rGqZMJGKPduyL7BUfbm6mI9XFW90XeovXgRi033CA'
  }
})
