const hash: { [key: string]: string } = {
    'name': '[А-яё]{2,30}',
    'email': '([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})',
    'password': '[a-zA-z0-9_]{5,12}',
};

export const getPattern = (name: 'email' | 'name' | 'password'): string => {
    return hash[name];
};