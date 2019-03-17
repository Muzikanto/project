export function getRandomColor() {
    const r = Math.floor(Math.random() * 200);
    const g = Math.floor(Math.random() * 200);
    const b = Math.floor(Math.random() * 200);
    const color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    return color;
}