export function parseYoutubeId(str: string) {
    const index = str.indexOf('v=');

    return index === -1 ? str : str.slice(str.indexOf('v=') + 2);
}
