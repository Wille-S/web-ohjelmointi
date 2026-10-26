function Calculate (int1, int2, operation) {
    if (operation === "add"){
        result = int1 + int2
    } else if (operation === "sub") {
        result = int1 - int2
    } else if (operation === "multi") {
        result = int1 * int2
    } else if (operation === "div") {
        result = int1 / int2
    }
}

function onCalculateClick() {
    const operation = document.getElementById("operation").value
    const firstInt = document.getElementById("num1").value
    const secondInt = document.getElementById("num2").value
    const int1 = Number(firstInt)
    const int2 = Number(secondInt)
    Calculate(int1, int2, operation)
    document.getElementById("result").innerHTML = "Result is " + result
}