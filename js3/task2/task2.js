const numberOfParticipants = prompt("Enter the number of participants:");
const participants = [];

for (let i = 0; i < numberOfParticipants; i++) {
    const participant = prompt("Enter the name of participant " + (i + 1) + ":");
    participants.push(participant);
}

participants.sort();

for (let i = 0; i < participants.length; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = participants[i];
    document.getElementById("participantList").appendChild(listItem);
}