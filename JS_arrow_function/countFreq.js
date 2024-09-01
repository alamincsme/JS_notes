function countFrequency(words) {
    const frequencyMap = new Map();

    words.forEach(word => {
        if (frequencyMap.has(word)) {
            frequencyMap.set(word, frequencyMap.get(word) + 1);
        } else {
            frequencyMap.set(word, 1);
        }
    });

    return frequencyMap;
}

const words = ["Hello", "World", "Bangladesh", "Dhaka", "Hello", "java", "Lambda"];
const wordFrequency = countFrequency(words);

wordFrequency.forEach((value, key) => {
    console.log(`${key} ${value}`);
});
