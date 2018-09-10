import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import axios from 'axios';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './app.css';

import { setSearchField } from '../actions';

const mapStateToProps = state => {
  return {
    searchField: state.searchField
  };
};

const mapDispatchToProps = dispatch => ({
  onSearchChange: e => dispatch(setSearchField(e.target.value))
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: []
    };
  }

  componentDidMount() {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(users => this.setState({ robots: users.data }));
  }

  render() {
    const { robots } = this.state;
    const { searchField, onSearchChange } = this.props;
    const filteredRobots = robots.filter(robot =>
      robot.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return !robots.length ? (
      <div className="center">
        <h1 className="tc">Loading</h1>
        <ReactLoading type="cylon" color="444" height={'20%'} width={'20%'} />
      </div>
    ) : (
      <div className="tc">
        <h1 className="f1">RoboFriends</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <CardList robots={filteredRobots} />
        </Scroll>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
