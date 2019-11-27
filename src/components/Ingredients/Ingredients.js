import React, {useReducer, useEffect, useCallback,useContext, useMemo} from 'react';
import {AuthContext} from '../../Context/authContext';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';
import useHttp from '../../hooks/http';

const ingredientReducer = (state, action) => {
	switch(action.type){
		case "SET":
			return action.ingredients;
		case "ADD":
			return [...state, action.ingredient];
		case "DELETE":
			return state.filter(ing => ing.id !== action.id);
		default:
		throw new Error('Should not get there')
	}
}


 
function Ingredients() {
	const authContext = useContext(AuthContext);
	console.log('[AuthContext]',AuthContext);
	console.log('[authContext]',authContext);

	const [userIngredients, dispatch] = useReducer(ingredientReducer,[]);
	const {isLoading,data,error,sendRequest, reqExtra, reqidentifier, clear} = useHttp();

	//const [userIngredients, setUserIngredients] = useState([]);
	//const [isLoading, setisLoading] = useState(false);
	//const [error, setError] = useState();
	// useEffect(() =>{
	// 	fetch('https://react-my-burger-f5421.firebaseio.com/todoIngredients.json')
	// 	.then(response => response.json())
	// 	.then(responseData => {
	// 	  const loadedIngredients = [];
	// 	  for(const key in responseData){
	// 	  	loadedIngredients.push({
	// 	  		id:key,
	// 	  		title:responseData[key].title,
	// 	  		amount:responseData[key].amount
	// 	  	});
	// 	  }
	// 	  setUserIngredients(loadedIngredients);
	// 	});
	// }, []);
	const logoutHandler = () => {
 		authContext.logout();
 	}

	useEffect(()=>{
		if (!isLoading && !error && reqidentifier === 'REMOVE_INGREDIENT') {
			dispatch({type:'DELETE', id: reqExtra});
		}else if(!isLoading && !error && reqidentifier === 'ADD_INGREDIENT'){
			dispatch({type:'ADD', ingredient: {id:data.name, ...reqExtra}});
		}
	},[data,reqExtra,reqidentifier,isLoading,error]);


	const filterIngredientsHandler = useCallback((filteredIngredient) =>{
		//setUserIngredients(filteredIngredient);
		dispatch({type:'SET', ingredients: filteredIngredient});
	}, []);

	const addIngredientHandler = useCallback(ingredient =>{
		sendRequest(`https://react-my-burger-f5421.firebaseio.com/todoIngredients.json`,
 				'POST',
 				JSON.stringify(ingredient),
 				ingredient,
 				'ADD_INGREDIENT');
		// dispatchHttp({type:'SEND'});
		// fetch('https://react-my-burger-f5421.firebaseio.com/todoIngredients.json',{
		// 	method:'POST',
		// 	body:JSON.stringify(ingredient),
		// 	headers:{'Content-Type':'application/json'}
		// }).then(response => {
		// 	//setisLoading(false);
		// 	dispatchHttp({type:'RESPONSE'});
		// 	return response.json();
		// }).then(responseData => {
		// 	//setUserIngredients(prevIngredients => [...prevIngredients, 
		// 	//{id:responseData.name, ...ingredient}
	 //       //]);
		// 	dispatch({type:'ADD', ingredient: {id:responseData.name, ...ingredient}});

  // 	}).catch(error => {
 	// 	//setError('Something went wrong');
 	// 	//setisLoading(false);
		// dispatchHttp({type:'ERROR',errorMessage:'Something went wrong'});
 	// });
  },[sendRequest]);

 const removeIngredientHandler = useCallback(ingredientId => {
 	sendRequest(`https://react-my-burger-f5421.firebaseio.com/todoIngredients/${ingredientId}.json`,
 				'DELETE',
 				null,
 				ingredientId,
 				REMOVE_INGREDIENT);
    //dispatchHttp({type:'SEND'});
 	// fetch(`https://react-my-burger-f5421.firebaseio.com/todoIngredients/${ingredientId}.json`,{
		// 	method:'DELETE'
		// }).then(responseData => {
		// 	//setisLoading(false);
 	// 		//setUserIngredients(prevIngredients => 
 	// 			//prevIngredients.filter(ingredient => ingredient.id !== ingredientId));
		// 	dispatch({type:'DELETE', id: ingredientId});

 	// }).catch(error => {
 	// 	//setError('Something went wrong');
 	// 	//setisLoading(false);
		// dispatchHttp({type:'ERROR',errorMessage:'Something went wrong'});
 	// });
 },[sendRequest]);

 

 const ingredientList = useMemo(() => {
 	return (
 		<IngredientList ingredients={userIngredients}   
 		onRemoveItem={removeIngredientHandler} />
 	);
 },[userIngredients, removeIngredientHandler]);

  return (
    <div className="App">
     {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}

      <IngredientForm  onaddIngredient={addIngredientHandler} loading={isLoading} />

      <section>
        <Search onLoadIngredients={filterIngredientsHandler}/>
        <br />
        {userIngredients.length > 0 ? 
        	{ingredientList}
      	: <h4 style={{textAlign:'center'}}>No result</h4>
        }
      </section>
      <section>
         <div style={{textAlign:'center'}}>
            <button onClick={logoutHandler}>Logout</button>
          </div>      
       </section>
    </div>
  );
}

export default Ingredients;
