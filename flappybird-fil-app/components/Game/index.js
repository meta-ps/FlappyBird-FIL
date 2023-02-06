import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { setWalletProvider, setWalletState } from '../features/app-slice'
import { store } from '../store'



export default function Game() {

    const isWalletActive = useSelector((state) => state.isWalletConnected)


    


    return (
        <div>


        </div>
    )
}
{/* <GameBox /> */ }
