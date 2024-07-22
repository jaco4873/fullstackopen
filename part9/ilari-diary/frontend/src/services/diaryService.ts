import axios from 'axios'
import { Entry } from '../types/types'

const baseUrl = 'http://localhost:3000/api/diaries'



export const fetchDiaryEntries = () => {
  return axios
  .get<Entry[]>(baseUrl)
  .then(response => (response.data)
  )
}

export const createDiaryEntry = (newEntry: Entry) => {
  return axios
  .post<Entry>(baseUrl, newEntry)
  .then(response => response.data)
}