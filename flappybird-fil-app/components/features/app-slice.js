import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isWalletConnected: false,
  walletAddress: "",
  stakeAmount: 0,
  betScore: 0,
  isStakeDone: false,
  gamePin: 0,
  score: 0,
  gameStarted: false,
  isGameOver: false,
  birdPosition: 300,
  pipePosition: 500,
  checkresults: false,
  hasUserPlayed: 'NOT_PLAYED',
  hasWinned: false
}

const Slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    setBetScore: (state, action) => {
      if (action.payload) {
        state.betScore = action.payload
      }
      else {
        state.betScore = 0
      }
    },
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
      console.log()
      // state.gamePin = 0
      // state.isStakeDone = false
      // state.stakeAmount = 0

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
    setGameResult:(state, action) => {
      state.hasWinned = action.payload
      state.hasUserPlayed = 'PLAYED'
    }

    // resetGame: state => state = initialState
  }
})

export const { addScore, startGame, setBirdPosition, gameOver, resetGame, setPipePosition, setGamePin, setStakeStatus, setWalletState, setStakeAmount, setBetScore, setGameResult } = Slice.actions
export default Slice.reducer;