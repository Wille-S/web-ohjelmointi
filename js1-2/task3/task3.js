const integer1 = prompt("Enter the first integer:");
const integer2 = prompt("Enter the second integer:");
const integer3 = prompt("Enter the third integer:");

const sum = parseInt(integer1) + parseInt(integer2) + parseInt(integer3);
const product = parseInt(integer1) * parseInt(integer2) * parseInt(integer3);
const average = sum / 3

document.getElementById("sum").textContent = `Sum: ${sum}`;
document.getElementById("product").textContent = `Product: ${product}`;
document.getElementById("average").textContent = `Average: ${average}`;