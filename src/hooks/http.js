import {useReducer, useCallback} from 'react';

const initialState = {
		loading:false,
		error:null,
		data:null,
		extra: null,
		identifier:null
	};
const httpReducer = (state, action) => {
	switch(action.type){
		case "SEND":
			return {loading:true, error:null, data: null, extra:null, identifier:action.identifier};
		case "RESPONSE":
			return { ...state, loading:false, data:action.responseData, extra:action.extra};
		case "ERROR":
			return {loading:false,error: action.errorMessage};
		case "CLEAR":
			return initialState;
		default:
			throw new Error('Should not get there')
	}
}
const useHttp = () => {
	const [httpstate, dispatchHttp] = useReducer(httpReducer,initialState);

	const clear = useCallback(() =>{
				 	dispatchHttp({type:'CLEAR'});
				},[]);

	const sendRequest = useCallback((url,method,body,reqidentifier) => {
		dispatchHttp({type:'SEND', identifier: reqidentifier});
		fetch(url,{
				method:method,
				body:body,
				headers:{
					'Content-Type':'application/json'
				}
			}).then(response => {
				return response.json();
			}).then(responseData => {
				dispatchHttp({type:'RESPONSE',responseData:responseData,extra:reqExtra});
	 		}).catch(error => {
				dispatchHttp({type:'ERROR',errorMessage:'Something went wrong'});
	 		});
	 },[]);
	 return {
	 	isLoading: httpstate.loading,
	 	data:httpstate.data,
	 	error:httpstate.error,
	 	sendRequest: sendRequest,
	 	extra:httpstate.extra,
	 	reqidentifier:httpstate.identifier,
	 	clear:clear
	 };
};
export default useHttp;