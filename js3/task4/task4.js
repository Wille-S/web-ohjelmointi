let numbers = []

while (true) {
    const number = prompt("Enter a number. To stop enter 0.")

    if (number != 0) {
        numbers.push(number)
    }
    else {
        break
    }
}

numbers.sort(function(a,b) {
    return a - b;
});

console.log(numbers)