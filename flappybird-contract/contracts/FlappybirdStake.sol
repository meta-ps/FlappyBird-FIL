// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract FlappybirdStake {
    uint256 public currentGame;

    struct IGame {
        uint256 id;
        bool hasStaked;
        uint256 amount;
        bool isWinner;
        bool hasPaid; // if winner has paid
    }

    constructor() payable {
        currentGame = 0;
    }

    function stakeFIL() public payable returns (uint256 _gameid) {}
}
