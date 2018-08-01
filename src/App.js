import React, { Component } from 'react';
import Header from './componentes/Header';
import Timeline from './componentes/Timeline';
import { timeline } from './reducers/timeline';
import { createStore } from 'redux';

const store = createStore(timeline);

class App extends Component {

	render() {

		return (

			<div id="root">
				<div className="main">
					<Header />
					<Timeline login={this.props.login} store={store} />
				</div>
			</div>
		);
	}
}

export default App;
