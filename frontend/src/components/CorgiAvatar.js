import React, {Component} from 'react';

class CorgiAvatar extends Component{

  render() {
    const {corgiId, birthdate, nickname, generationId, traits} = this.props.corgi;
    return (
      <div>
        <h1>Your new corgi</h1>
        <h2>{corgiId}</h2>
        <h2>{birthdate}</h2>
        <h2>{nickname}</h2>
        <h2>{generationId}</h2>
        {traits.map(trait=> trait.traitValue).join(', ') }
      </div>
    );
  }
}

export default CorgiAvatar;