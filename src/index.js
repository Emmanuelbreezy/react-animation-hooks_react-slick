import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';
import App from './App';
import AuthContextProvider from './Context/authContext';
//import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<AuthContextProvider>
		<App/>
	</AuthContextProvider>, 
	document.getElementById('root'));
//registerServiceWorker();
