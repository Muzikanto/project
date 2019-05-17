# React SSR-Project

## What's inside?

- [create-react-app](https://github.com/facebook/create-react-app) as base and `react-scripts` without ejecting;
- [express](https://github.com/expressjs/express) as a server;
- [stream rendering](https://reactjs.org/docs/react-dom-server.html#rendertonodestream) because it's fast;
- [react-app-rewired](https://github.com/timarney/react-app-rewired) for improving base `react-scripts`;
- [TypeScript](https://www.typescriptlang.org/) as a main language for client and server;
- [Redux](https://redux.js.org) a predictable state container for JavaScript apps.
- [Socket IO](https://socket.io) featuring the fastest and most reliable real-time engine

## For React
Библиотека с реакт компонентами https://bit.dev
Сторибук с компонентами https://github.com/storybooks/storybook

## Usage

``` bash
❯ npm i
❯ npm start
```

Point your browser to [http://localhost:3000/](http://localhost:3000/). 

## Building

``` bash
❯ npm run build
```

## Production

``` bash
❯ npm run start:production
```

Point your browser to [http://localhost:3000/](http://localhost:3000/).

### License [MIT](LICENSE)


## Other
- connect heroku postgreSql

``` bash
DB settings -> advanced
ssl = true
sslFactory = org.postgresql.ssl.NonValidatingFactory
```

- travis 
gem install travis.
