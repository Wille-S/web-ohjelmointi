const answer = confirm("Should I calculate a square root?");

if (answer) {
    const number = prompt("Enter a number:");
    if (number < 0) {
        document.getElementById("text").textContent = "The square root of a negative number is not defined.";
    }
    else {
        const squareRoot = Math.sqrt(number);
        document.getElementById("text").textContent = `The square root of ${number} is ${squareRoot}.`;
    }
}
else {
    document.getElementById("text").textContent = "The square root is not calculated.";
}