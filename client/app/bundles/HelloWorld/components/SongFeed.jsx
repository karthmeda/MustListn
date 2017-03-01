import React from 'react';


class SongFeed extends React.Component {

  render() {
    const { addSong }= this.props;
    return (
      // we use Object.keys so we can turn the items in our messages
      // Object into an array that we can then map over
        <ul className="list-of-songs">
            {addSong()}
        </ul>
      )
  }

}




export default SongFeed;
