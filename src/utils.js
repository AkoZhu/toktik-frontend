const replyToRegex = /^@([a-zA-Z0-9._]+) +(.+)$/;

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

export function extractReply(message) {
    const match = message.match(replyToRegex);
    if (match) {
        return [match[1], match[2]];
    }

    return ["", message];
}

export function getLastManyFromArray(array, count) {
    return array.slice(Math.max(array.length - count, 0))
}

export function randomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
