import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isWalletConnected: false,
  walletAddress: "",
  stakeAmount: 0,
  isStakeDone: false,
  gamePin: 0,
  score: 0,
  gameStarted: false,
  isGameOver: false,
  birdPosition: 300,
  pipePosition: 500
}

const Slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    setStakeAmount: (state, action) => {
      if (action.payload) {
        state.stakeAmount = action.payload
      }
      else {
        state.stakeAmount = 0
      }
    },
    setStakeStatus: (state, action) => {
      if (action.payload) {
        state.isStakeDone = true
      }
      else {
        state.isStakeDone = false
      }
    },
    setGamePin: (state, action) => {
      if (action.payload) {
        state.gamePin = action.payload
      }
      else {
        state.gamePin = 0
      }
    },
    setWalletState: (state, action) => {
      if (action.payload) {
        state.isWalletConnected = true
        state.walletAddress = action.payload
      }
      else {
        state.isWalletConnected = false
        state.walletAddress = ""
      }
    },
    addScore: state => {
      state.score += 1
    },
    startGame: state => {
      state.gameStarted = true
    },
    gameOver: state => {
      state.gameStarted = false
      state.isGameOver = true
      state.gamePin = 0
      state.isStakeDone = false
      state.stakeAmount = 0

    },
    setBirdPosition: (state, action) => {
      if (action.payload === 0) state.birdPosition = 0
      else state.birdPosition += action.payload
      // console.log(state.birdPosition);
    },
    setPipePosition: (state, action) => {
      state.pipePosition = action.payload
      // console.log(state.birdPosition);
    },
    resetGame: state => state = initialState
  }
})

export const { addScore, startGame, setBirdPosition, gameOver, resetGame, setPipePosition, setGamePin, setStakeStatus, setWalletState, setStakeAmount } = Slice.actions
export default Slice.reducer;