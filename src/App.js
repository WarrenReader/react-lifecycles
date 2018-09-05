import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Mount from './components/Mounting/Mounting';
import styled from 'styled-components';
import { Code, CodeBold, Container, H1, H2, H3, P, Section, Warning } from './styles/StyledComponents';


const Button = styled.button`
  background: ${props => props.status === 'Unmount' ? '#FF6666' : '#7BBF6A'};
  border: none;
  border-radius: 3px;
  color: white;
  cursor: pointer;
  font-size: 14px;
  outline: none;
  padding: 8px;
  width: 100px;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    background: ${props => props.unmount ? '#FF6666' : '#7BBF6A'} !important;
    opacity: 1;
  }
`;

const ButtonContainer = styled.div`
  box-sizing: border-box;
  padding: 20px;
  width: 100%;

  button:nth-child(2) {
    margin-left: 15px;
  }
`;

const SubHeading = styled.span`
  display: block;
  margin-bottom: 8px;
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      component1: false
    };
  }

  render() {
    const { component1 } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <H1 className="App-title">React Lifecycles</H1>
        </header>
        <Section>
          <H1>Introduction</H1>
          <P>React applications are made up of individual components which come together to make the UI for websites like Facebook, Instagram, and Yahoo Mail. Every component in a React application has its own lifecycle. Knowing how these lifecycles work and using them correctly can lead to better, more predictable code.</P>
        </Section>
        <Section>
          <H1>Lifecycle Phases In React</H1>
          
          <Container>
          <H2>Phase 1: Mounting (birth)</H2>
          <P>During mounting, a component's props and state are initialized/defined. Also, the component and all of its children are mounted to the DOM. The mounting phase only occurs once during the component's lifecycle. Aside from constructor() and render() being invoked during this phase , there are two lifecycle functions or 'hooks' we can use. They are componentWillMount( ) and componentDidMount( ). It's important to remember that React calls these functions in a specific order. Here are the details regarding these functions and the order they're called in:</P>

          <Code>constructor( )</Code><br/>
          <P>If the component requires its own state (this.state) this is where it's initialized and defined for the first time. If the component is being passed props and they're required within the <CodeBold>constructor( )</CodeBold>, props may be passed as an argument. For example <CodeBold>constructor(props) &#123;...&#125;</CodeBold>.</P>

          <Code>componentWillMount()</Code><br/>
          <P>This method is only called one time, which is just before the initial render to the DOM. Since it's called before render( ), we cannot access the DOM. We also won't have access to refs because they haven't been created yet. componentWillMount() gives us an opportunity to handle configuration and update our state based on props received before our component is rendered to the DOM. Changing state or editing any prop conditions will not cause a re-render as the compoennt hasn't been rendered to the DOM yet.</P>

          <Code>render()</Code><br/>
          <P>This method is the only method that exists across multiple lifecycle phases. It occurs during mounting and growth. We create elements typically through JSX and return them to be added to the DOM. We can access this.props and this.state. When we access this.state, any changes we made during componentWIllMount( ) have already been applied. It's also important to note that the Element we create may also have children elements. Before render completes, the children elements go through their own mounting lifecycle process. 
          </P>

          <P><Warning>Warning:</Warning> Do not use setState( ) or query the DOM within this method as it will cause issues. Using setState( ) will cause an infinite loop. Trying to access the DOM will throw an error as this component hasn't been rendered to the DOM yet.</P>

          <Code>componentDidMount()</Code><br/>
          <P>As the name implies, this method is called immediately after all our children Elements and our Component instances are mounted onto the Native UI. Unlike componentWillMount(), setting state or editing any prop conditions will cause a re-render. We also now have access to the native UI where we can access the DOM and our children refs. This method is called only one time during a Component's lifecycle. You can call this.setState() or forceUpdate() in this method. Keep in mind doing this may cause a re-render, but since this method is only called once, we don't have to worry about this method causing an infinite loop.</P>

          </Container>

          <Container>
          <H2>Phase 2: Growth (update)</H2>
          <P>The growth phase is where a Component spends most of its time. This is where a component receives updates, acts on user or system actions, and provides the overall experience for our application. Changes during the growth phase are triggered in three different ways: changing of props, changing of state, or calling forceUpdate(). The changes made affect how the growth phase is managed.</P>

          <H3>Triggering Update: Changing props</H3>
          <P>When a Component's props update this triggers an update. From the component's instance perspective the passed in props are immutable. In other words, a component which receives props from a parent, cannot change the value of any of its props. If you try this you'll receive an Error in React. Because props are immutable by the receiving component, the parent component must provide new values / updates. When new props are passed in, the update phase starts. Some applications prefer to use a state manager like Redux, at which point the component's state will be passed in through props.</P>

          <P><Warning>Warning:</Warning> You should avoid transferring props into state. This is an anti-pattern.</P>

          <H3>Triggering Update: Changing state</H3>
          <P>When a Component changes its state value using this.setState() this triggers a new Update phase. setState() should be treated as an asynchronous process. When we call setState() this is considered a partial state change. We aren't flushing/replacing the entire state, just updating part(s) of it. React uses a queuing system to apply the partial state change. Because we can set the state multiple times in a method chain, a change queue is constructed to manage all the various updates. When the state change is added to the queue, React makes sure the Component is added to the dirty queue. This dirty queue tracks the Component instances that have changed. This is what tells React which Components need to enter the Update phase later. A common error is to set state in one method and then later in the same synchronous method try to access the state value. This can sometimes cause tricky bugs. this.state should be treated as immutable. There is no guarantee that this.state will be immediately updated, so accessing this.sate after calling this.setState may return the old value.</P>

          <P><Warning>Warning:</Warning> Only a component instance should call setState on itself.</P>

          <H3>Triggering Update: forceUpdate()</H3>
          <P>Every component has a special method available to it called foreceUpdate. This method forces the component into an Update phase.</P>

          <H2>Growth Lifecycle Methods</H2>

          <Code>componentWillReceiveProps(nextProps)</Code><br/>
          <P>The first method available to us during the update phase is componentWillReceiveProps(). This method is called when props are passed to the component instance. This method is passed an argument which contains the new prop value. It's typically called nextProps. For example, componentWillReceiveProps(nextProps) &#123;...&#125;. This allows us to compare the incoming props (nextProps) against our current this.prop. We get our current props by calling this.props and the new value is the nextProps argument passed to this method. This method provides an opportunity for us to react to a prop update before render() is called. Keep in mind this method is not called if an update is trigger by just a state change. It's only triggered when props update.</P>

          <P><Warning>Warning:</Warning> Just because this method was called, does not mean the value of props has changed!</P>
          
          <P>...</P>
          </Container>

          <Container>
          <H2>Phase 3: Unmount (death)</H2>
          <P>...</P>
          </Container>

        </Section>

        <Section>
          <H1>Example #1</H1>
          <SubHeading>Features: constructor(), componentWillMount(), componentDidMount(), render()</SubHeading>
          
          
          <Code>componentDidMount()</Code><br/>
          <p>
            This function is called immediately after the component mounted. Changing state or editing any prop conditions will cause a re-render. The DOM can be accessed here through the DOM API (ex document.getElementById()).
          </p>
        </Section>

        <ButtonContainer>
          <Button status={component1 ? 'Unmount' : 'Mount'} onClick={() => this.setState((prevState) => ({component1: !prevState.component1}))}>
            {component1 ? 'Unmount' : 'Mount'}
          </Button>
        </ButtonContainer>
          { component1 && <Mount name='Warren'/>}
      </div>
    );
  }
}

export default App;
