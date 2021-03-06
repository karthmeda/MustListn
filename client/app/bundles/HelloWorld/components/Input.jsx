import React, { Component } from 'react';
import axios from 'axios';



class Input extends Component {

  createSong() {
    axios({
      method:'post',
      url: `https://mustlistn.firebaseio.com/.json`,
      data:{
        song:this.song.value,
        artist:this.artist.value

      }

    }).then( () => {
      this.props.getSongs();
      this.props.addSong();
      this.song.value= "";
      this.artist.value="";
    });

    }




  render() {
    return (
      <div>
      <input type="text" ref={(input) => this.song = input} placeholder="Type in a Cool Song" className="focus" /><br/><br/>
      <input type="text" ref={(input) => this.artist = input} id="title" placeholder="Enter the Artist Name" className="focus" />
      <br/>
      <button type="submit" onClick={()=> this.createSong()}  id="button">
       Add a Song
      </button>
    </div>
    )
  }
}

Input.propTypes = {
  addEvent: React.PropTypes.func.isRequired
}

export default Input;
