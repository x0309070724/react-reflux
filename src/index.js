import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';
import './index.css';

var statusUpdate = Reflux.createAction();

// statusUpdate(true)

class StatusStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {flag: 'OFFLINE'}; // <- set store's default state much like in React
    this.listenTo(statusUpdate, this.onStatusUpdate); // listen to the statusUpdate action
  }

  onStatusUpdate(status) {
    console.log(status)
    var newFlag = status ? 'ONLINE' : 'OFFLINE';
    this.setState({flag: newFlag});
  }
}

class MyComponent extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {}; // our store will add its own state to the component's
    this.store = StatusStore; // <- just assign the store class itself
  }

  render() {
    var flag = this.state.flag; // <- flag is mixed in from the StatusStore
    return <div>User is {flag}</div>
  }
}

ReactDOM.render(<MyComponent/>, document.getElementById('root'));
