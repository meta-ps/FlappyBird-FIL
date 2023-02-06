require("hardhat-deploy")
require("hardhat-deploy-ethers")

const { ethers } = require("hardhat")
const { networkConfig } = require("../helper-hardhat-config")


const private_key = network.config.accounts[0]
const wallet = new ethers.Wallet(private_key, ethers.provider)

module.exports = async ({ deployments }) => {
    console.log("Wallet Ethereum Address:", wallet.address)
    const chainId = network.config.chainId


    const FlappybirdStakeContract = await ethers.getContractFactory('FlappybirdStake', wallet);
    console.log('Deploying Flappy Bird...');
    const flappybirdStakeContract = await FlappybirdStakeContract.deploy();
    const initialBalance = ethers.utils.parseEther("1000000000000000000")

    await flappybirdStakeContract.deployed({ value: initialBalance })
    console.log('Flappy Bird deployed to:', flappybirdStakeContract.address);

}
