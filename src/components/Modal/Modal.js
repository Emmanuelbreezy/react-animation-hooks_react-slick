import React from 'react';
//import Transition from 'react-transition-group/Transition';
import CSSTransition from 'react-transition-group/CSSTransition';

import classes from './Modal.module.css';

const modal = (props) => {
 	const animTiming = {
 		enter:400,
 		exit:1000
 	}
 	return(
 		<CSSTransition 
 			mountOnEnter
	        unmountOnExit
 			in={props.show}
	        timeout={animTiming}
	        classNames={{
	        	enter:'',
	        	enterActive:classes.ModalOpen,
	        	exit:'',
	        	exitActive: classes.ModalClosed
	        }}>
			   	<div className={classes.Modal}>
			     <h1>A Modal</h1>
			     <button className={classes.Button} onClick={props.closed}>Dismiss</button>
			    </div>
		  </CSSTransition>
  );

}

export default modal; 


/////Transition

////<Transition 
//  			mountOnEnter
// 	        unmountOnExit
//  			in={props.show}
// 	        timeout={animTiming}>
// 	        {state => {
// 				const cssClasses = [
// 				classes.Modal, 
// 				state === 'entering'
// 				? classes.ModalOpen
// 				: state === 'exiting' 
// 				? classes.ModalClosed 
// 				:null
// 				]
// 	        	return(
// 			   	<div className={cssClasses.join(' ')}>
// 			        <h1>A Modal</h1>
// 			        <button className={classes.Button} onClick={props.closed}>Dismiss</button>
// 			    </div>
// 			   );
// 		   }}
// 		  </Transition>