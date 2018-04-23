import React, { Component } from 'react';
import Header from './componentes/Header';
import Timeline from './componentes/Timeline';
import TimelineStore from './logicas/TimelineStore';
import {createStore} from '.redux';

// const logicaTimeline = new TimelineStore([]);

function timeline(state, action) {

    if(action.type === 'LISTAGEM') {

        return state;
    }

    return state;
}

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
