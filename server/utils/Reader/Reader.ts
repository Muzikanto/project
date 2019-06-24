import * as fs from 'fs';
import {join, resolve} from "path";

class Reader {
    public pathToData = resolve('');

    constructor(props: { pathToData?: string; }) {
        props.pathToData && (this.pathToData = resolve(props.pathToData));
    }

    public write(name: string, data: string): Promise<boolean> {
        const pathToFile = join(this.pathToData, name);

        return new Promise((resolve: (t: boolean) => void) => {
            fs.writeFile(pathToFile, data, (err: Error) => {
                if (err) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
    }

    public read(path: string): string | null {
        const pathToFile = resolve(this.pathToData, path);

        if (!fs.existsSync(pathToFile)) {
            return null;
        } else {
            return fs.readFileSync(pathToFile, 'utf8');
        }
    }
}

export default Reader;
