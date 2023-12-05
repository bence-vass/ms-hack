
export const slicingWindows = (arr, size) => {
    const split = arr.split(' ')
    if (size > split.length) {
        return arr;
    }
    let result = [];
    let lastWindow = split.length - size;
    for (let i = 0; i <= lastWindow; i += size) {
        result.push(split.slice(i, i + size).join(' '));
    }
    return result;
};
