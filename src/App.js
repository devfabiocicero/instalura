import React, { Component } from 'react';
import Header from './componentes/Header';
import Timeline from './componentes/Timeline';
import { timeline } from './reducers/timeline';
import { header } from './reducers/header';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';

const reducers = combineReducers({ timeline, header });
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

class App extends Component {

	render() {

		return (

			<div id="root">
				<div className="main">
					<Header store={store} />
					<Timeline login={this.props.login} store={store} />
				</div>
			</div>
		);
	}
}

export default App;
