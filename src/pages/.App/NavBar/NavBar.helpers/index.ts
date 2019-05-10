const shortText = (text: string, maxLetters: number): string => {
    return text.length <= maxLetters ?
        text : text.slice(0, maxLetters) + '..';
};

export {
    shortText
};