import { Chat } from "@pushprotocol/uiweb";
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { setWalletState, setStakeAmount, setBetScore, setStakeStatus, setGamePin } from '../features/app-slice'
import { store } from '../store'
import GameBox from '../GameBox'
import { ABI, contractAddress } from '../../constants/ABI'
import Web3Modal from "web3modal";
import Image from 'next/image'




export default function MainPage() {
    const stakeAmount = useSelector((state) => state.stakeAmount)
    const userBetScore = useSelector((state) => state.betScore)
    const isStakeDone = useSelector((state) => state.isStakeDone)
    const hasUserPlayed = useSelector((state) => state.hasUserPlayed)
    const hasWinned = useSelector((state) => state.hasWinned)
    const gameId = useSelector((state) => state.gamePin)
    const walletAddress = useSelector(state => state.walletAddress)
    const [loading, setLoading] = useState(false);

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

    async function handleClaimStake() {
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                contractAddress,
                ABI,
                signer
            );



            let txn = await contract.checkStatus(gameId, 10);
            txn = await txn.wait();
            console.log(txn)
            alert('TXN successfully completed please check your wallet')

        } catch (error) {
            console.log(error)
        }
    }

    async function handleStake() {
        setLoading(true)
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
        < >
            {!isWalletActive && <div>



                <div>

                    <header className="shadow-sm">
                        <div className="max-w-screen-xl p-4 mx-auto">
                            <div className="flex items-center justify-between space-x-4 lg:space-x-10">
                                <div className="flex lg:w-0 lg:flex-1">
                                    <span className="w-20 h-10 text-3xl font-black leading-none text-gray-900 select-none">FlappyFIL<span
                                        className="text-yellow-400">.</span></span>
                                </div>


                                <div className="items-center justify-end flex-1 hidden space-x-4 sm:flex">
                                    <button onClick={connectWallet}
                                        className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-yellow-500 border border-transparent rounded-md shadow-sm hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                                        id="connect-wallet"><b>Login With Metamask(FIL)🦊</b></button>
                                </div>
                            </div>
                        </div>
                    </header>



                </div>

                <div>
                    <div className="flex h-screen">
                        <div className="m-auto">
                            <h3></h3>
                            <img src="https://e1.pxfuel.com/desktop-wallpaper/843/524/desktop-wallpaper-5-flappy-bird-game-flappy-bird.jpg" />
                        </div>
                    </div>

                </div>

            </div>}

            {
                isWalletActive && !isStakeDone &&
                <div>

                    <Chat
                        account={walletAddress} //users walletAddress
                        supportAddress="0x6B4c696B623FA9A2A6D5b6E9101Ef19CD973bc3C" //support address
                        apiKey="jVPMCRom1B.iDRMswdehJG7NpHDiECIHwYMMv6k2KzkPJscFIDyW8TtSnk4blYnGa8DIkfuacU0"
                        env="staging"
                        greetingMsg="Send /intro to start :)"
                    />


                    <div>

                        <section className="py-20 bg-gray-50">
                            <div className="container items-center max-w-6xl px-4 px-10 mx-auto sm:px-20 md:px-32 lg:px-16">
                                <div className="flex flex-wrap items-center -mx-3">
                                    <div className="order-1 w-full px-3 lg:w-1/2 lg:order-0">
                                        <div className="w-full lg:max-w-md">
                                            <h2 className="mb-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl font-heading"> Hello!</h2>
                                            <p className="mb-4 font-medium tracking-tight text-gray-400 xl:mb-6">Play and win 5% on your Stake🏛️</p>
                                            <ul>
                                                <li className="flex items-center py-2 space-x-4 xl:py-3">
                                                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                                                    <span className="font-medium text-gray-500">{walletAddress}</span>
                                                </li>
                                                <li className="flex items-center py-2 space-x-4 xl:py-3">
                                                    <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>
                                                    <span className="font-medium text-gray-500">
                                                        <input type="number" placeholder="Stake Amount > 0.02" onChange={handeStakeAmount} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />

                                                    </span>
                                                </li>
                                                <li className="flex items-center py-2 space-x-4 xl:py-3">
                                                    <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                                                    <span className="font-medium text-gray-500">

                                                        <input type="number" placeholder='Bet score > 2' className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" onChange={handleBetScore} />

                                                    </span>
                                                </li>

                                                <li className="flex items-center py-2 space-x-4 xl:py-3">
                                                    <div>

                                                        &nbsp;
                                                        &nbsp;
                                                        &nbsp;
                                                        &nbsp;
                                                        &nbsp;
                                                        &nbsp;
                                                        &nbsp;
                                                        &nbsp;
                                                        &nbsp;
                                                        &nbsp;
                                                        {!loading && <button className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={handleStake}>Stake</button>}

                                                        {
                                                            loading &&

                                                            <div className="flex items-center">
                                                                Please Wait..
                                                                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full m-12" >
                                                                    <span className="visually-hidden">.</span>
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                    <div className="w-full px-3 mb-12 lg:w-1/2 order-0 lg:order-1 lg:mb-0">
                                        <div >

                                        </div>

                                        <Image layout="responsive" objectFit="contain" width="100" height="80" className="mx-auto sm:max-w-sm lg:max-w-full" src="https://cdn.devdojo.com/images/november2020/feature-graphic.png" alt="feature image" unoptimized /></div>
                                </div>
                            </div>
                            <div>

                            </div>
                        </section>


                    </div>

                </div>
            }

            {
                isWalletActive && isStakeDone && hasUserPlayed === 'NOT_PLAYED' &&
                <div style={{ alignItems: "center", justifyContent: "center" }} onClick={handleIsPlayed}>
                    <GameBox />
                </div>
            }
            {
                isWalletActive && hasUserPlayed === 'PLAYED' && hasWinned === true &&
                <div>

                    <div>
                        <div>
                            <div className="flex flex-col xl:flex-row h-screen">
                                <div className="w-full xl:w-1/2 my-4 h-screen flex items-center justify-center">
                                    <div className="w-4/6">
                                        <h3 className="tracking-tight font-light text-gray-500 text-4xl ">You Won !!!</h3>
                                        <h1 className="text-6xl md:text-8xl tracking-tight leading-none font-extrabold text-cyan-500">tFIL</h1>
                                        <p className="text-lg text-gray-500 mt-2">Claim with 5% on your Stake !<br />Winned Claim the stake {stakeAmount / 100}
                                        </p>
                                        <button className="inline-block bg-cyan-500 hover:bg-pink-600 mt-3 px-6 py-3 rounded-md text-white" onClick={handleClaimStake}>Claim </button>
                                    </div>
                                </div>
                                <div className="w-full xl:w-1/2 h-screen">
                                    <img className="object-cover w-full h-screen" src="https://pixelprowess.com/i/bots/i/group.svg" alt="Robot Group" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            }

            {
                isWalletActive && hasUserPlayed === 'PLAYED' && hasWinned === false &&
                <div>
                    <div className="h-full flex items-center px-6 lg:px-32 text-white">
                        <section className="w-full md:w-9/12 xl:w-8/12">
                            <h1 className="text-3xl lg:text-5xl font-bold text-pink-500">
                                You<br /> lost THE GAME!
                            </h1>
                        </section>
                    </div>

                </div>
            }
        </>
    )
}
