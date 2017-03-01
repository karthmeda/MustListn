import React from 'react';
import axios from 'axios';

class Song extends React.Component {
  constructor(){
    super();
    this.state= {
      edit:false
    }
  }
  songDelete(key) {
    axios.delete(`https://mustlistn.firebaseio.com/${key}.json`)
    .then((res) => {this.props.getSongs();
                   this.props.addSong();
                 })
  }

  songEdit(key) {
    this.setState({edit: !this.state.edit})
    axios.patch(`https://mustlistn.firebaseio.com/${key}.json`, {
      song:this.editsong.value,
      artist:this.editartist.value
    })
    .then((res) => {
      this.props.getSongs();
      this.props.addSong();
    })
  }

  editShow() {
    const { songs } =this.props;
    return (
      <div>
      <textarea className="edit-field" ref={(text)=>this.editsong=text} defaultValue={songs[this.props.toShow].song} /><br/>
      <textarea className="edit-field" ref={(text)=>this.editartist=text} defaultValue={songs[this.props.toShow].artist} />
      <br/>
      <button type="submit" onClick={() => this.songEdit(this.props.toShow)} className="flat">
        Save
      </button>
      <button type="submit" className="flat" onClick={()=> this.setState({edit:!this.state.edit})}>
          Cancel
        </button>
      </div>

    )
  }

  normalShow() {
    const { songs } = this.props;
    return (
    <li className="eachLi">
      Song: {songs[this.props.toShow].song}
      <br/>

       Artist: {songs[this.props.toShow].artist}
      <br/>
      <br/>
    <div className="buttons">
      <button type="submit" className="flat" onClick={() => this.songEdit(this.props.toShow)} className="flat">Edit</button>
      <button type="submit" className="flat" onClick={() => this.songDelete(this.props.toShow)} className="flat">Delete</button>
    </div>
  </li>
    )
  }
  render() {
    if(!this.state.edit){
      return (this.normalShow());
    }
    else{
      return (this.editShow());
    }
  }
}


export default Song;
