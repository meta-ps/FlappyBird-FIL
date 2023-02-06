import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { setWalletState, setStakeAmount, setBetScore, setStakeStatus, setGamePin } from '../features/app-slice'
import { store } from '../store'
import GameBox from '../GameBox'
import { ABI, contractAddress } from '../../constants/ABI'
import Web3Modal from "web3modal";
import Game from '../Game'



export default function MainPage() {
    const stakeAmount = useSelector((state) => state.stakeAmount)
    const userBetScore = useSelector((state) => state.betScore)
    const isStakeDone = useSelector((state) => state.isStakeDone)
    const hasUserPlayed = useSelector((state) => state.hasUserPlayed)
    const hasWinned = useSelector((state) => state.hasWinned)

    console.log(`Is stake done RR ${isStakeDone}`)


    const isWalletActive = useSelector((state) => state.isWalletConnected)

    async function connectWallet() {
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();

            const provider = new ethers.providers.Web3Provider(connection);

            const signer = provider.getSigner();
            const chainId = (await provider.getNetwork()).chainId;

            const user = await signer.getAddress();
            const address = ethers.utils.getAddress(user)

            store.dispatch(setWalletState(address))


        } catch (error) {
            console.log(error)
        }
    }


    function handeStakeAmount(e) {
        store.dispatch(setStakeAmount(Number(e.target.value)))
    }

    function handleBetScore(e) {
        store.dispatch(setBetScore(Number(e.target.value)))

    }


    async function handleStake() {

        try {
            localStorage.setItem('gamePin', '0')

            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                contractAddress,
                ABI,
                signer
            );


            const options = { value: ethers.utils.parseEther(stakeAmount.toString()) }

            let txn = await contract.stakeFIL(userBetScore, options);
            txn = await txn.wait();
            let presentGame = await contract.currentGame()
            console.log(`present game pin ${presentGame}`)
            store.dispatch(setStakeStatus(true));
            store.dispatch(setGamePin(Number(presentGame.toNumber())))
            console.log(txn)
            alert('TXN successfully completed')
            localStorage.setItem('gamePin', `${presentGame}`)
            localStorage.setItem('isPlayed', 'false')



        } catch (error) {
            console.log(error)
        }

    }





    function handleIsPlayed() {
        localStorage.setItem('isPlayed', 'true')
    }


    return (
        <div style={{ color: "white" }}>

            {!isWalletActive && <button onClick={connectWallet}>Connect to FIL</button>}

            {
                isWalletActive && !isStakeDone &&
                <>
                    Stake Amount must be more than 0.01
                    <input type="number" onChange={handeStakeAmount} />
                    <br />
                    BetScore must be greater than 2:
                    <input type="number" onChange={handleBetScore} />
                    <br />
                    <button onClick={handleStake}>Stake</button>

                </>
            }

            {
                isWalletActive && isStakeDone && hasUserPlayed === 'NOT_PLAYED' &&
                <div style={{ alignItems: "center", justifyContent: "center" }} onClick={handleIsPlayed}>
                    <GameBox />
                </div>
            }
            {
                isWalletActive && hasUserPlayed === 'PLAYED' && hasWinned &&
                <div>
                    Winned Claim the stake
                </div>

            }
            {
                isWalletActive && hasUserPlayed === 'PLAYED' && hasWinned == false &&
                <div>
                    you loose the game please try again
                </div>
            }
        </div>
    )
}
