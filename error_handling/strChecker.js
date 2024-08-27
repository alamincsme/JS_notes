class EmptyStringException extends Error {
    constructor(message) {
        super(message);
    }
}

function stringChecker(s) {
    try {
        if (s.trim() === "") {  
            throw new EmptyStringException("This string is empty.");
        }
        console.log("This String: " + s);
    } catch (e) {
        if (e instanceof EmptyStringException) {
            console.error(e.name + ": " + e.message);
        } else {
            console.error(e);
        }
    }
}

function main() {
    stringChecker("Al Amin");
}

main() ; 