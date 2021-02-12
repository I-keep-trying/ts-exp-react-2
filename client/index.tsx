import * as React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
    render() {
        return <h1>Hi there</h1>;
    }
}

const rootContainer = document.querySelector('#main');
ReactDOM.render(<App />, rootContainer);