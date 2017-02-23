import React from 'react';
import axios from 'axios';

class Tweed extends React.Component {
  constructor(){
    super();
    this.state= {
      edit:false
    }
  }
  eventDelete(key) {
    axios.delete(`https://mustlistn.firebaseio.com/${key}.json`)
    .then((res) => {this.props.getTweeds();
                   this.props.addEvent();
                 })
  }

  eventEdit(key) {
    this.setState({edit: !this.state.edit})
    axios.patch(`https://mustlistn.firebaseio.com/${key}.json`, {
      song:this.editsong.value,
      artist:this.editartist.value
    })
    .then((res) => {
      this.props.getTweeds();
      this.props.addEvent();
    })
  }

  editShow() {
    const { tweeds } =this.props;
    return (
      <div>
      <textarea className="edit-field" ref={(text)=>this.editsong=text} defaultValue={tweeds[this.props.toShow].song} /><br/>
      <textarea className="edit-field" ref={(text)=>this.editartist=text} defaultValue={tweeds[this.props.toShow].artist} />
      <br/>
      <button type="submit" onClick={() => this.eventEdit(this.props.toShow)} className="flat">
        Save
      </button>
      <button type="submit" className="flat" onClick={()=> this.setState({edit:!this.state.edit})}>
          Cancel
        </button>
      </div>

    )
  }

  normalShow() {
    const { tweeds } = this.props;
    return (
    <li className="eachLi">
      Song: {tweeds[this.props.toShow].song}
      <br/>

       Artist: {tweeds[this.props.toShow].artist}
      <br/>
      <br/>
    <div className="buttons">
      <button type="submit" className="flat" onClick={() => this.eventEdit(this.props.toShow)} className="flat">Edit</button>
      <button type="submit" className="flat" onClick={() => this.eventDelete(this.props.toShow)} className="flat">Delete</button>
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


export default Tweed;
