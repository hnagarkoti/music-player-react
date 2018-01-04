import React, { Component } from 'react';
import MusicList from './MusicList';
import '../App.css';

class HomePage extends React.Component {
  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout(){
    console.log('logut called');
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.location.reload();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome To Music Manager</h1>
        </header>
        <button onClick={this.handleLogout} style={{backgroundColor: 'red'}}>Logout</button>

        <MusicList />
      </div>
    )
  }
}

export default HomePage;
