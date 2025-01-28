// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract GrowthPlatformSimple is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    
    // 挑战模板（简化版）
    struct Challenge {
        bytes32 id;
        bytes32 ipfsHash; // 挑战描述存储于IPFS
        bool active;
    }
    
    // 用户提交记录
    struct Submission {
        bytes32 challengeId;
        string tweetUrl;  // 推文链接
        uint256 totalScore;
        uint256 ratingCount;
        address[] raters; // 记录已评分用户（防重复）
    }
    
    // 事件
    event ChallengeCreated(bytes32 indexed challengeId);
    event SubmissionPosted(address indexed user, bytes32 challengeId, string tweetUrl);
    event ChallengeRated(address indexed rater, address indexed target, bytes32 challengeId, uint8 score);

    // 存储结构
    mapping(bytes32 => Challenge) public challenges;
    mapping(address => Submission[]) public userSubmissions;

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    // 管理员创建挑战（无MBTI分类）
    function createChallenge(bytes32 id, bytes32 ipfsHash) external onlyRole(ADMIN_ROLE) {
        require(challenges[id].id == 0, "Challenge exists");
        challenges[id] = Challenge(id, ipfsHash, true);
        emit ChallengeCreated(id);
    }

    // 用户提交挑战证明（直接存储推文链接）
    function submitChallenge(bytes32 challengeId, string calldata tweetUrl) external {
        require(challenges[challengeId].active, "Inactive challenge");
        
        userSubmissions[msg.sender].push(Submission({
            challengeId: challengeId,
            tweetUrl: tweetUrl,
            totalScore: 0,
            ratingCount: 0,
            raters: new address[](0)
        }));
        emit SubmissionPosted(msg.sender, challengeId, tweetUrl);
    }

    // 任意用户评分（1-5分）
    function rateChallenge(address targetUser, uint256 submissionIndex, uint8 score) external {
        require(score >= 1 && score <= 5, "Invalid score");
        Submission storage sub = userSubmissions[targetUser][submissionIndex];
        
        // 防止重复评分
        for (uint256 i = 0; i < sub.raters.length; i++) {
            require(sub.raters[i] != msg.sender, "Already rated");
        }
        
        sub.raters.push(msg.sender);
        sub.totalScore += score;
        sub.ratingCount++;
        emit ChallengeRated(msg.sender, targetUser, sub.challengeId, score);
    }

    // 查询用户平均分
    function getAverageScore(address user, uint256 submissionIndex) public view returns (uint256) {
        Submission storage sub = userSubmissions[user][submissionIndex];
        return sub.ratingCount > 0 ? sub.totalScore / sub.ratingCount : 0;
    }
} 