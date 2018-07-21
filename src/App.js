import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import CardList from './CardList';
import SearchBox from './SearchBox';

import './app.css';
class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchField: ''
    };
  }

  componentDidMount() {
    setTimeout(() => {
      fetch('http://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({ robots: users }));
    }, 2000);
  }
  onSearchChange = event => {
    this.setState({ searchField: event.target.value });
  };

  render() {
    const filteredRobots = this.state.robots.filter(robot =>
      robot.name.toLowerCase().includes(this.state.searchField.toLowerCase())
    );

    if (this.state.robots.length === 0) {
      return (
        <div className="center">
         <h1 className="tc">Loading</h1> 
          <ReactLoading type="cylon" color="444" height={'20%'} width={'20%'} />
        </div>
      );
    } else {
      return (
        <div className="tc">
          <h1 className="f1">RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <CardList robots={filteredRobots} />
        </div>
      );
    }
  }
}

export default App;
