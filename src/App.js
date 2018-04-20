import React, { Component } from 'react';
import Header from './componentes/Header';
import Timeline from './componentes/Timeline';
import TimelineStore from './logicas/TimelineStore';

const logicaTimeline = new TimelineStore();

class App extends Component {

  render() {

    return (
      
        <div id="root">
            <div className="main">
              <Header />
              <Timeline login={this.props.login} store={logicaTimeline} />
			      </div>
        </div>
    );
  }
}

export default App;
