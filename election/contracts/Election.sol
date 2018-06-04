pragma solidity ^0.4.11;

contract Election {
    // Model a Candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // store accounts that have voted
    // takes an address and returns a boolean if the account
    // exists in the mapping it returns true, if not it returns false
    mapping(address => bool) public voters;
    // Store Candidates
    // Fetch Candidate
    mapping(uint => Candidate) public candidates;
    // Store Candidates Count
    uint public candidatesCount;

    // voted event triggered when a vote is cast
    event votedEvent (
        uint indexed _candidateId
    );


    
    function Election() public{
        //run whenever our contract is migrated and deployed
        addCandidate('PeanutButter');
        addCandidate('Jelly');
    }

    function addCandidate (string _name) private {
        candidatesCount ++; // increments the candidatesCount
        // mapping[key] = instantiate a candidate (id, name, inital vote count of 0);
        candidates[candidatesCount] = Candidate(candidatesCount, _name,0);
    }
    // "msg" is meta data that solidity allows the app to handle
    // "sender" is the account (stored in the meta data)
    function vote (uint _candidateId) public {
        // require that the acct has not voted before
        // checks the voters mapping to see itf the acct (msg.sender) is NOT already w/in the mapping
        require(!voters[msg.sender]);

        // require a valid candidate is selected (Id# has to exist within the mapping)
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // record that voter has voted, store in 'Voters' mapping on ln14 
        voters[msg.sender] = true;

        // update candidate vote count
        candidates[_candidateId].voteCount ++;

        // trigger voted event
        votedEvent(_candidateId);
    }
}

