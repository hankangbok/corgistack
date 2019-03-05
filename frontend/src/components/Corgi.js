import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import CorgiAvatar from './CorgiAvatar';
// Establish a Default Corgi 
const DEFAULT_CORGI = {
    "corgiId": '',
    "birthdate": "",
    "nickname": "DEFAULT",
    "traits": [],
    "generationId": ''
};
// Also establish any other fallback values? 


class Corgi extends Component {
  // constructor goes up top
  state = { corgi: DEFAULT_CORGI };
  // When component mounts, render a corgi 
  componentDidMount() {
    this.fetchCorgi();
  }

  // Request a new corgi from localhost:3000/corgi/new 
  fetchCorgi = () => {
    fetch('http://localhost:3000/corgi/new')
      .then(response => response.json())
      .then(json => {
        console.log('json', json)
        this.setState({corgi: json.corgi})
      })
      .catch(error => console.log( 'error', error));
  };
  
  render() {
    return (
    <div>
      <Button onClick ={ this.fetchCorgi }>New Corgi</Button>
      <CorgiAvatar corgi={this.state.corgi} />
      
    </div>
    );
  }
}


export default Corgi;