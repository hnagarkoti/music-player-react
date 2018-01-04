import React, { Component } from 'react';
import MusicPlayer from 'react-responsive-music-player';

class MusicRow extends Component {
  constructor(props){
    super(props);
    this.state = {
      isMusicPlayed: false
    }
    this.handlePlayList = this.handlePlayList.bind(this);
  }
  handlePlayList(){
    console.log('handlePlayList called');
    let val = this.state.isMusicPlayed;
    this.setState({
      isMusicPlayed: !val
    })
  }
  render(){
    let that = this;
    return(
      <div>
        <h2>Music List</h2>

        {
          that.props.playlist.map(function(item, index){
            return <div>
                Title: <h3>{ item.title}</h3>
                <br></br>
                <img src={item.cover} />
                <br></br>
                Artists: {item.artist.join(', ')}
                <br></br>
                Album: {item.album}
            </div>
          })
        }
        <button onClick={this.handlePlayList}> Play Music </button>
        {
          this.state.isMusicPlayed ? <MusicPlayer autoplay={true} playlist={that.props.playlist} /> : ''
        }
      </div>

    );
  }
}

export default MusicRow;
