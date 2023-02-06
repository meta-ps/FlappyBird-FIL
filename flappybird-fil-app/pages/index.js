import { Provider } from 'react-redux'
import {  store } from "../components/store"
import MainPage from '../components/MainPage'

export default function Home() {

  
  
  return (
    <Provider store={store}>
      <MainPage />
    </Provider>
  )
}
