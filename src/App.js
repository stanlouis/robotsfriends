import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import axios from 'axios';
import CardList from './CardList';
import SearchBox from './SearchBox';
import Scroll from './Scroll';

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
    axios
      .get('http://jsonplaceholder.typicode.com/users')
      .then(users => this.setState({ robots: users.data }));
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
          <Scroll>
            <CardList robots={filteredRobots} />
          </Scroll>
        </div>
      );
    }
  }
}

export default App;
