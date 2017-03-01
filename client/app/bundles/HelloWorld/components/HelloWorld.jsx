import React, { PropTypes, Component } from 'react';
import Input from './Input';
import Song from './Song';
import SongFeed from './SongFeed';
import axios from 'axios';

export default class HelloWorld extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired, // this is passed from the Rails view
  };

  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */
   constructor() {
    super();
    this.state = {
      songs: {},
    }

    this.addEvent = this.addEvent.bind(this);
    this.getSongs=this.getSongs.bind(this);
  }
  componentDidMount() {
    this.getSongs();

  }

  getSongs() {
    const url = 'https://mustlistn.firebaseio.com/.json';
    //send `GET` request to the firebase db
    axios.get(url)
    .then((res) => {
      console.log(res.data);
      this.setState({ songs: res.data })

    })

    // .catch is a way for any errors in the db request to be thrown into
    // we console log that error, so as developers we have error code to read/fix
    .catch((error) => {
      console.log(error);
    })
  }

  addSong() {
    if(this.state.songs){
      let feed=Object.keys(this.state.songs)
      .reverse()
      .map((key,i) => {
        return (
          <Song
            key={key}
            getSongs={this.getSongs}
            addSong={this.addSong}
            toShow={key}
            songs={this.state.songs} />
              )
      })
      return feed;
    }
  }



  render() {
    console.log(this.state.songs)
    return (
      <div className="App">
        <div className="App-header">
          <h2>MUSTLISTN</h2>
          <h5>Enter Awesome songs you think people should listen to!</h5>
          <Input
            getSongs={this.getSongs}
            addSong={this.addSong}
             />
        </div>
        <br/>
        <br/>
        <div className="feed-list">
          <br/>
          <br/>
        <SongFeed
          id='songfeed'
          addSong={this.addSong}
          />
        </div>
      </div>
    );
  }
}
