const enteredYear = prompt("Enter a year:")

if ( enteredYear % 100 === 0 ? enteredYear % 400 === 0 : enteredYear % 4 === 0) {
    document.getElementById("leap-year").textContent = `${enteredYear} is a leap year.`;
}
else {
    document.getElementById("leap-year").textContent = `${enteredYear} is not a leap year.`
}
