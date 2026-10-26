const numberOfCandinates  = prompt("Enter the number of candinates")
let candinates = []
class Candinate {
    constructor(name, votes) {
        this.name = name
        this.votes = votes
    }
}

for (let i = 0; i < numberOfCandinates; i++) {
    const name = prompt("Enter the candinates name")
    const newCandinate = new Candinate(name, 0)
    candinates.push(newCandinate)
}

const numberOfVoters = prompt("Enter the number of voters")

for (let i = 0; i < numberOfVoters; i++) {
    const votedCandinate = prompt("Voter " + (i+1) + " please enter the name of the candinate you want to vote for")
    const candinateVote = candinates.find(c => c.name === votedCandinate)
    if (candinateVote) {
        candinateVote.votes++;
    }
}

candinates.sort(function(a, b) {
    return (b.votes) - (a.votes);
});

console.log("The winner is " + candinates[0].name + " with " + candinates[0].votes + " votes. Results")
for (let i = 0; i < numberOfCandinates; i++)
    console.log(candinates[i].name + ": " + candinates[i].votes + " votes.")
