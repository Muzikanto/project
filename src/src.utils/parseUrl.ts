export function getUrlParams(): { [key: string]: string } {
    const query = location.search.substr(1);
    const result: { [key: string]: any } = {};
    query.split("&").forEach((part) => {
        const item = part.split("=");
        result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
}

export const copyUrl = () => {
    const location = window.location.href.split('?')[0];
    const str = location + '?testParam=' + Math.random();

    const tmp = document.createElement('INPUT') as HTMLInputElement;
    const focus = document.activeElement as any;
    tmp.value = str;
    document.body.appendChild(tmp);
    tmp.select();
    document.execCommand('copy');
    document.body.removeChild(tmp);
    focus.focus();
};