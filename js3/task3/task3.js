const dogs = [];

for (let i = 0; i < 6; i++) {
    const dog = prompt("Enter the name of dog number " + (i + 1) + ":");
    dogs.push(dog);
}

dogs.sort();

dogs.reverse();

for (let i = 0; i < dogs.length; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = dogs[i];
    document.getElementById("dogsList").appendChild(listItem);
}