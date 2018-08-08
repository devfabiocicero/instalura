import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './componentes/Login';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route, Redirect, matchPath} from  'react-router-dom';
import './css/reset.css';
import './css/timeline.css';
import './css/login.css';

import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { timeline } from './reducers/timeline';
import { header } from './reducers/header';

const reducers = combineReducers({ timeline, header });
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

function verificaAutenticacao(nextState, replace) {

    const resultado = matchPath('/timeline', {
        
        path: nextState.match.url,
        exact: true
    });

    const enderecoPrivadoTimeline = resultado !== null;

    if(enderecoPrivadoTimeline && localStorage.getItem('auth-token') === null) {

        return <Redirect to={{
                    pathname: '/'
                }}/>
    } else {

        return <App login={nextState.match.params.login} />
    }
}

function Logout() {

    localStorage.removeItem('auth-token');
        
    return <Redirect to={{
        pathname: '/'
    }}/>
}

ReactDOM.render(
    (
        <Provider store={store}>
            <Router>
                <div>
                    <Route exact path="/" component={Login} />
                    <Route path="/timeline/:login?" render={verificaAutenticacao} />
                    <Route path="/logout" render={Logout} />
                </div>
            </Router>
        </Provider>
    ),
    document.getElementById('root')
);
registerServiceWorker();
