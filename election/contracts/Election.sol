pragma solidity ^0.4.11;

contract Election {
    // Model a Candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // store accounts that have voted
    mapping(address => bool) public voters;
    // Store Candidates
    // Fetch Candidate
    mapping(uint => Candidate) public candidates;
    // Store Candidates Count
    uint public candidatesCount;

    // voted event
    event votedEvent (
        uint indexed _candidateId
    );

    
    
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

    function vote (uint _candidateId) public {
        // require that they have not voted before
        require(!voters[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // record that voter has voted
        voters[msg.sender] = true;

        // update candidate vote count
        candidates[_candidateId].voteCount ++;

        // trigger voted event
        votedEvent(_candidateId);
    }
}

