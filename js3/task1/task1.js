const numbers = [];

for (let i = 0; i < 5; i++) {
    const number = prompt("Enter number " + (i + 1) + ":");
    numbers.push(parseFloat(number));
}

for (let i = 4; i >= 0; i--) {
    console.log(numbers[i]);
}