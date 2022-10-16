export const sample = (array, size) => {
    const shuffled = array.slice(0);
    let i = array.length;
    let min = i - size;
    let temp;
    let index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}
