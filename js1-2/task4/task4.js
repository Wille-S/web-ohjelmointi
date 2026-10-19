userName = prompt("What is your name?");

number = Math.floor(Math.random() * 4) + 1;

if (number == 1) {
    house = "Gryffindor";
} else if (number == 2) {
    house = "Hufflepuff";
} else if (number == 3) {
    house = "Ravenclaw";
} else if (number == 4) {
    house = "Slytherin";
}

document.getElementById("house").textContent = `${userName} you are ${house}.`;