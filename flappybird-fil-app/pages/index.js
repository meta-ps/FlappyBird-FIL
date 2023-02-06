import { Provider } from 'react-redux'
import GameBox from '../components/GameBox'
import { constants, store } from "../components/store"
import { useSelector } from 'react-redux'
import MainPage from '../components/MainPage'

export default function Home() {

  
  
  return (
    <Provider store={store}>
      {/* <GameBox /> */}
      <MainPage />
    </Provider>
  )
}
