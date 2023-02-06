import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { utils } from 'ethers'
import { setWalletProvider, setWalletState } from '../features/app-slice'
import { store } from '../store'
import GameBox from '../GameBox'



export default function MainPage() {
    const provider = useSelector((state) => state.walletProvider)

    const isWalletActive = useSelector((state) => state.isWalletConnected)

    async function connectWallet() {
        try {

            if (window.ethereum != null) {
                const _provider = new ethers.BrowserProvider(window.ethereum)
                const { chainId } = await _provider.getNetwork();
                console.log(`chain id ${chainId}`)

                const allWalletAccounts = await window.ethereum.request({
                    method: 'eth_requestAccounts'
                });
                const address = ethers.getAddress(allWalletAccounts[0])
                store.dispatch(setWalletState(allWalletAccounts[0]))
            }
        } catch (error) {
            console.log(error)
        }
    }




    return (
        <div style={{ color: "white" }}>

            {!isWalletActive && <button onClick={connectWallet}>Connect to FIL</button>}

            {isWalletActive}

        </div>
    )
}
{/* <GameBox /> */}
