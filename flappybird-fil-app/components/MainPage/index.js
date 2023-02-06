import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
// import { store, constants } from './store'


export default function MainPage() {
    const birdPosition = useSelector((state) => state.walletProvider)

    function connectWallet() {

    }

    return (
        <div style={{ color: "white" }}>
            Connect to wallet
            <button onClick={connectWallet}>Connect to FIL</button>
        </div>
    )
}

