import React from 'react';
// import Tweed from "./Tweed";
// import '../TweederFeed.css';

class TweedrFeed extends React.Component {

  render() {
    const { addEvent }= this.props;
    return (
      // we use Object.keys so we can turn the items in our messages
      // Object into an array that we can then map over
        <ul className="list-of-messages">
            {addEvent()}
        </ul>
      )
  }

}




export default TweedrFeed;
