// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract FlappybirdStake {
    uint256 public currentGame;
    address public owner;
    event Staked(address indexed user, uint256 amount, uint256 id, uint256 timestamp);

    modifier onlyOwner() {
        require(owner == msg.sender, "Caller is not the owner");
        _;
    }

    struct IGame {
        uint256 id;
        bool hasStaked;
        uint256 amount;
        uint256 betScore;
        uint256 score;
        bool isWinner;
        bool hasPaid; // if user  winner has paid
        address creator;
        uint256 timestamp;
    }

    mapping(uint256 => IGame) public games;

    constructor() payable {
        currentGame = 0;
        owner = msg.sender;
    }

    function stakeFIL(uint256 _betScore) public payable returns (uint256 _gameid) {
        currentGame += 1;
        require(msg.value > 0.01 ether, "please stake more than 0.01");
        require(_betScore >= 2, "Bet score must be > 2");

        IGame memory game = IGame({
            id: currentGame,
            hasStaked: true,
            amount: msg.value,
            isWinner: false,
            hasPaid: true,
            creator: msg.sender,
            timestamp: block.timestamp,
            betScore: _betScore,
            score: 0
        });
        games[currentGame] = game;
        return _gameid;
    }

    // call by owner
    function setScore(uint256 _gameid, uint256 _score) external onlyOwner {
        IGame storage game = games[_gameid];
        game.score = _score;
    }

    // call by user after calling setScore by owner
    function checkStatus(uint256 _gameId, uint256 _score) public returns (bool isWinner) {
        IGame memory game = games[_gameId];

        if (hasUserWinned(_gameId, _score)) {
            address payable _user = payable(game.creator);
            uint256 _percentage = 5;
            _user.transfer((game.amount * _percentage) / 100);
            return true;
        }

        return false;
    }

    function hasUserWinned(uint256 _gameid, uint256 _score) public view returns (bool winner) {
        return games[_gameid].betScore >= _score;
    }

    function withdraw() public onlyOwner {
        address payable _owner = payable(owner);
        _owner.transfer(address(this).balance);
    }
}
