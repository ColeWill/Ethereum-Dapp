var Election = artifacts.require('./Election.sol');
// pulls in our contract and creates an "artifact" which is an abstraction that truffle creates so we can interact with it
var electionInstance

contract("Election", function(accounts){
    // see that contract was intitialized with the correct number of candidates

    it('initializes with two candidates', function(){
        // fetch an instance of the deployed contract
        return Election.deployed().then(function(instance){
            return instance.candidatesCount();
        }).then(function(count){
            //check to see if value equals 2
            assert.equal(count, 2);
        });
    });

    it("it initializes the candidates with the correct values", function(){
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
});