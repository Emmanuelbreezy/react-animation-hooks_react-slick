import React, { Component } from "react";
import Transition from 'react-transition-group/Transition';

import classes from "./App.module.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

class App extends Component {
    state = {
        modalIsOpen: false,
        showBlock: false
     }

     showModal = () =>{
        this.setState({modalIsOpen:true});
     }

     closeModal = () =>{
        this.setState({modalIsOpen:false});
     }
  render() {
    return (
      <div className={classes.App}>
        <h1>React Animations</h1>
        <button className={classes.Button}  
        onClick={() => 
            this.setState(prevState => ({showBlock:!prevState.showBlock})) 
        }>Toggle</button>

        <Transition in={this.state.showBlock} 
        timeout={1000}
        mountOnEnter
        unmountOnExit
        onEnter={() => console.log('onEnter')}
        onEntering={() => console.log('onEntering')}
        onEntered={() => console.log('onEntered')}
        onExit={() => console.log('onExit')}
        onExiting={() => console.log('onExiting')}
        onExited={() => console.log('onExited')}
        >
        {state =>(
            <div style={{
                backgroundColor:'red',
                 width:300,
                 height:100, 
                 margin:'auto',
                 padding:'5px',
                 transition: 'opacity 1s ease-out',
                 opacity:state === 'exiting' ? 0 : 1
             }}>
               <h1>GOOOOOOOOOOO</h1>
        </div>
        )}
        </Transition> 
        <br />
        <Modal show={this.state.modalIsOpen} closed={this.closeModal}/>
       {this.state.modalIsOpen ? <Backdrop show /> : null }
        <br />
        <button className={classes.Button} onClick={this.showModal} >Open Modal</button>
        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

export default App;
