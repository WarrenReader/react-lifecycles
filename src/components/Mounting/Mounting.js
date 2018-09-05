import React from 'react';
import { BlueBox, MountSection, ButtonContainer, StyledButton } from './StyledComponents';

export default class Mount extends React.Component {
  constructor(props) {
        console.log('======constructor() Fires======={');
    super(props);
    this.state = {
      name: props.name,
      color: 'blue',
      number: 0
    }
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
        console.log(`The value of this.state.name in constructor() is ${this.state.name}. This is the value passed as a prop.`)
        console.log('}======constructor() End=======');
        console.log('');
  }

  componentWillMount() {
        console.log('======componentWillMount() Fires======={');
    if(this.state.name === 'Warren') {
      this.setState({ name: 'Jack' });
    }
        console.log(`The value of this.state.name in componentWillMount() is ${this.state.name}. However, a call to this.setState has been made to change this.state.name from Warren to Jack`);
        console.log(`Can access blue box through document.getElementById: ${document.getElementById('big-blue-box') || false}`);
        console.log('}======componentWillMount() End=======');
        console.log('');
  }

  componentDidMount() {
        console.log('======componentDidMount() Fires======={');
        console.log(`The value of this.state.name in componentDidMount() is ${this.state.name}.`);
        console.log(`Can access blue box through getElementById: ${document.getElementById('big-blue-box') && true}`);
  }

  increment() {
    this.setState((prevState) => ({
      number: ++prevState.number
    }));
  }

  decrement() {
    this.setState((prevState) => ({
      number: --prevState.number
    }));
  }

  render() {
    console.log('======Render Fires======');
    console.log('');
    const { name, color, number } = this.state;

    return (
      <MountSection>
        <BlueBox id='big-blue-box'/>
        <div>Name: {name}</div>
        <div>Color: {color}</div>
        <div>Number: {number}
          <ButtonContainer>
            <StyledButton onClick={this.increment}>+1</StyledButton>
            <StyledButton onClick={this.decrement}>-1</StyledButton>
          </ButtonContainer>
        </div>
      </MountSection>      
    );
  }
}