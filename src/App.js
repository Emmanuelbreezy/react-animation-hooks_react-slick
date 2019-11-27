import React,{useContext, useState} from 'react';
import Transition from 'react-transition-group/Transition';

import ThumbnailSlider from "./components/ThumbnailSlider/ThumbnailSlider";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";
import Ingredients from './components/Ingredients/Ingredients';
import Auth from './components/Auth';
import classes from "./App.module.css";

import {AuthContext} from './Context/authContext';


const App = props => {
  const authContext = useContext(AuthContext);
  console.log(authContext.isAuth);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [showBlock, setshowBlock] = useState(false);

  const showModalHandler = () =>{
       // this.setState({modalIsOpen:true});
     setmodalIsOpen(true);
     }

  const  closeModalHandler = () =>{
        //this.setState({modalIsOpen:false});
      setmodalIsOpen(false);
     }

    return (
      <div className={classes.App}>
        <div className={classes.DIV}>
         <ThumbnailSlider />
          <br />
	        <h1>React Animations</h1>
	        <button className={classes.Button}  
	        onClick={() => setshowBlock(prevState => !prevState)}>Toggle</button>
	        <Transition in={showBlock} 
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
	        <Modal show={modalIsOpen} closed={closeModalHandler}/>
	       {modalIsOpen && <Backdrop show />}
	        <br />
	        <button className={classes.Button} onClick={showModalHandler} >Open Modal</button>
	        <h3>Animating Lists</h3>
	        <List />
			<br />
		</div>
			{authContext.isAuth ? <Ingredients /> : <Auth />}
      </div> 
    );
}

export default App;
