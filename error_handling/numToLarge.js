class NumberTooLargeException extends Error {
    constructor(message) {
        super(message);
        this.name = "NumberTooLargeException";
    }
}

function main() {
    try {
        a = 10000 ;

        if (isNaN(a)) {
            throw new Error("Invalid input. Please enter a valid number.");
        }

        if (a < 100) {
            console.log(`${a} is smaller than 100.`);
        } else {
            throw new NumberTooLargeException("Number too large.");
        }
    } catch (e) {
        if (e instanceof NumberTooLargeException) {
            console.error(e.name + ": " + e.message);
        } else {
            console.error(e);
        }
    }
}

main();
