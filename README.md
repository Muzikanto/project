# React SSR-Project

## What's inside?

- [create-react-app](https://github.com/facebook/create-react-app) as base and `react-scripts` without ejecting;
- [express](https://github.com/expressjs/express) as a server;
- [stream rendering](https://reactjs.org/docs/react-dom-server.html#rendertonodestream) because it's fast;
- [react-app-rewired](https://github.com/timarney/react-app-rewired) for improving base `react-scripts`;
- [TypeScript](https://www.typescriptlang.org/) as a main language for client and server;
- [Redux](https://github.com/reduxjs/redux) a predictable state container for JavaScript apps.
- [Socket IO](https://github.com/socketio/socket.io) featuring the fastest and most reliable real-time engine
- [Bem](https://github.com/bem/bem-react) classname, di, core

## For React
- [bit](https://github.com/teambit/bit) Components
- [toolbox](https://github.com/react-toolbox/react-toolbox) Components
- [react-bootstrap](https://github.com/react-bootstrap/react-bootstrap) Components
- [material-ui](https://github.com/mui-org/material-ui) Components
- [storybook](https://github.com/storybooks/storybook) Helper for components
- [material-ui-pickers](https://material-ui-pickers-v2.dmtr-kovalenko.now.sh/api/datepicker) Date and Time Pickers

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
