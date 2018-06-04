var Election = artifacts.require('./Election.sol');
// pulls in our contract and creates an "artifact" which is an abstraction that truffle creates so we can interact with it
var electionInstance

contract("Election", function(accounts){
    // see that contract was intitialized with the correct number of candidates

    it('initializes with two candidates ln8', function(){
        // fetch an instance of the deployed contract
        return Election.deployed().then(function(instance){
            return instance.candidatesCount();
        }).then(function(count){
            //check to see if value equals 2
            assert.equal(count, 2);
        });
    });

    it("it initializes the candidates with the correct values ln18", function(){
        return Election.deployed().then(function(instance){
            electionInstance = instance;
            return electionInstance.candidates(1);
        }).then(function(candidate){
            assert.equal(candidate[0], 1, "contains the correct id");
            assert.equal(candidate[1], "Candidate1", "Contains the correct name");
            assert.equal(candidate[2], 0, "contains the correct votes count");
            return electionInstance.candidates(2);
        }).then(function(candidate){
            assert.equal(candidate[0],2,"contains the correct id");
            assert.equal(candidate[1], "Candidate2", "contains the correct name");
            assert.equal(candidate[2], 0, "contains the correct votes count");
        });
    });
    // check to see that vote increments by 1
    // check to make sure the account is added to the voters mapping
    it("allows a voter to cast a vote ln35", function(){
        // gets a copy of deployed contract
        return Election.deployed().then(function(instance){
            electionInstance = instance;
            candidateId = 1;
            // we pass in the app meta data and the candidate id
            return electionInstance.vote(candidateId, {from: accounts[0] });
        }).then(function(receipt){
            // read the voter's mapping and reads the account mapping
            return electionInstance.voters(accounts[0]);
            // returns the boolean value to see if the account has voted
        }).then(function(voted){
            assert(voted, "the voter was marked as voted");
            return electionInstance.candidates(candidateId);
        }).then(function(candidate){
            var voteCount = candidate[2];
            assert.equal(voteCount, 1, "increments the candidate's vote count");
        });
    });

    it("throws an exception for invalid candidates ln55", function(){
        // fetch an instance of our app
        return Election.deployed().then(function(instance){
            electionInstance = instance;
            // vote 1x for candidate 99
            return electionInstance.vote(99, { from: accounts[1] })
            // check for an error and pass it into the callback function 
        }).then(assert.fail).catch(function(error) {
            // checks the error message for the sbstr "revert" --> indexOf is a number for the first char position of "revert" w/in the error message
            assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
            return electionInstance.candidates(1);
        }).then(function(candidate1){
            var voteCount = candidate1[2];
            // assert that vote count is still 1 (we already voted 1x cor cand1 earlier in test)
            assert.equal(voteCount, 1, "candidate 1 did not receive any votes");
            return electionInstance.candidates(2);
        }).then(function(candidate2){
            var voteCount = candidate2[2];
            // assert that cand2 still does not have any votes
            assert.equal(voteCount, 0, "candidate 2 did not receive any votes");
        });
    it("throws an exception for double voting ln74", function(){
        return Election.deployed().then(function(instance){
            electionInstance = instance;
            candidateId = 2;
            // give candidate 2 its first vote
            electionInstance.vote(candidateId, {from: accounts[1] });
            return electionInstance.candidates(candidateId);
        }).then(function(candidate){
            var voteCount = candidate[2];
            assert.equal(voteCount, 1, "accepts first vote");
            // try to cote for candidate 2 again  
            return electionInstance.vote(candidateId, { from: accounts[1] });
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
            return electionInstance.candidates(1);
        }).then(function(candidate1){
            var voteCount = candidate1[2];
            assert.equal(voteCount, 1, "Candidate 1 did not get new votes");
            return electionInstance.canddiates(2);
        }).then(function(candidate2){
            var voteCount = candidate2[2];
            assert.equal(voteCount, 1 , "candidate 2 did not get new votes");
        });
    });   
    });
});