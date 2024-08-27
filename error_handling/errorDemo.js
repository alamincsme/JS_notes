function divide(a, b) {
    return a / b;
}

function main() {
    let a = 1;
    let b = 0;

    let result = 0;

    try {
        result = divide(a, b);
        // if (!isFinite(result)) {
        //     throw new Error("Division by zero");
        // }
    } catch (e) {
        console.log("You can't divide " + a + " by " + b);
    }
}

main();
