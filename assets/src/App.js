import React from 'react';
import './App.css';

//components
import Header from './components/Header';
import Listpage from './components/List';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      activeHeader: false
    }
  }

  activeButton() {
    this.setState({ activeHeader: true });
  }


  render() {
    return (
      <div className="App">
        <Header />
        <button onClick={() => this.activeButton()}>Active</button>
        {this.state.activeHeader ?
          (<Listpage />)
          :
          null
        }

      </div>
    )
  }
}

export default App;
