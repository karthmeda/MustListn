import React, { PropTypes, Component } from 'react';
// import './App.css';
import Input from './Input';
import Tweed from './Tweed';
import TweedrFeed from './TweedrFeed';
// import base from './base';
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
      tweeds: {},
    }

    this.addEvent = this.addEvent.bind(this);
    this.getTweeds=this.getTweeds.bind(this);
  }
  componentDidMount() {
    this.getTweeds();
      // this.getRequest();
    // this.baseRef = base.syncState(
    //   `messageBoard/messages`,
    //   {
    //     context: this,
    //     state: 'messages',
    //   }
    // );
  }

  getTweeds() {
    const url = 'https://mustlistn.firebaseio.com/.json';
    //send `GET` request to the firebase db
    axios.get(url)
    .then((res) => {
      console.log(res.data);
      this.setState({ tweeds: res.data })

        // This line flips the order of the array, so the newest tweed is on top
        // Then we set that flipped array to state
    })

    // .catch is a way for any errors in the db request to be thrown into
    // we console log that error, so as developers we have error code to read/fix
    .catch((error) => {
      console.log(error);
    })
  }

  addEvent() {
    if(this.state.tweeds){
      let feed=Object.keys(this.state.tweeds)
      .reverse()
      .map((key,i) => {
        return (
          <Tweed
            key={key}
            getTweeds={this.getTweeds}
            addEvent={this.addEvent}
            toShow={key}
            tweeds={this.state.tweeds} />
              )
      })
      return feed;
    }
  }



  render() {
    console.log(this.state.tweeds)
    return (
      <div className="App">
        <div className="App-header">
          <h2>MUSTLISTN</h2>
          <h5>Enter Awesome songs you think people should listen to!</h5>
          <Input
            getTweeds={this.getTweeds}
            addEvent={this.addEvent}
             />
        </div>
        <br/>
        <br/>
        <div className="feed-list">
          <br/>
          <br/>
        <TweedrFeed
          id='tweedrfeed'
          addEvent={this.addEvent}
          />
        </div>
      </div>
    );
  }
}


