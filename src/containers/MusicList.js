import React, { Component } from 'react';
import API from '../Api/Api';

import MusicRow from './MusicRow'
const playlist = [
  {
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    cover: 'https://www.cleverfiles.com/howto/wp-content/uploads/2016/08/mini.jpg',
    title: 'Despacito',
    artist: [
      'Luis Fonsi',
      'Daddy Yankee'
    ]
  },
  {
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    cover: 'https://image.freepik.com/free-photo/hrc-siberian-tiger-2-jpg_21253111.jpg',
    title: 'Bedtime Stories',
    artist: [
      'Jay Chou'
    ]
  }
]


class MusicList extends Component {
  constructor(props){
    super(props);
    this.state = {
      musicList: [],
      isLoaded: false
    }
  }

  componentDidMount() {
    let that = this;
    that.getAllMusic()
    .then(res => {
      if(res.status == 200 && res.data.success){
        console.log('res:- ', res.data);
        that.setState({
          musicList: res.data.data,
          isLoaded: true
        })
      }
    })
    .catch(err => {
      console.log('Error while fetching music:- ', err);
    })
  }

  getAllMusic(){
    return API.axiosApi.get('music')
    .then((res) => res)
    .catch((err) => err)
  }

  render() {
    let that = this;
    if(this.state.isLoaded){
      console.log('musicList:- ', that.state.musicList);
      return (
        <div>
          {/*<MusicPlayer playlist={that.state.musicList} />*/}
          <MusicRow playlist={that.state.musicList}/>
        </div>
      )
    } else {
      return(
        <div>
          Loading music list...
        </div>
      )
    }
  }
}

export default MusicList;
