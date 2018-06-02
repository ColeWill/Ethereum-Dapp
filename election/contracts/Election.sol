pragma solidity ^0.4.11;

contract Election {
    // Model a Candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }
    // Store a Candidate
    mapping(uint => Candidate) public candidates;
    // Store Candidates Count
    uint public candidatesCount;
     
    function Election() public{
        //run whenever our contract is migrated and deployed
        addCandidate('Candidate1');
        addCandidate('Candidate2');
    }

    function addCandidate (string _name) private {
        candidatesCount ++; // increments the candidatesCount
        // mapping[key] = instantiate a candidate (id, name, inital vote count of 0);
        candidates[candidatesCount] = Candidate(candidatesCount, _name,0);
    }
}

