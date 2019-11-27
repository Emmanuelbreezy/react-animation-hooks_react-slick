import React, {useState, useEffect, useRef} from 'react';

import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';
import useHttp from '../../hooks/http';
import classes from './Search.module.css';


const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState('');
  const {isLoading,data,error,sendRequest, clear} = useHttp();

  const inputRef = useRef();


  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
          const query = enteredFilter.length  === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`;
          sendRequest('https://react-my-burger-f5421.firebaseio.com/todoIngredients.json' + query,
            'GET');

          // fetch('https://react-my-burger-f5421.firebaseio.com/todoIngredients.json' + query)
          // .then(response => response.json())
          // .then(responseData => {
          //   const loadedIngredients = [];
          //   for(const key in responseData){
          //     loadedIngredients.push({
          //       id:key,
          //       title:responseData[key].title,
          //       amount:responseData[key].amount
          //     });
          //   }
          //   props.onLoadIngredients(loadedIngredients);
          // });
      }
     },500);
     return () => {
      clearTimeout(timer);
     };
  },[enteredFilter,inputRef,sendRequest]);

  useEffect(()=>{
    if(!isLoading && !error && data){
         const loadedIngredients = [];
            for(const key in data){
              loadedIngredients.push({
                id:key,
                title:data[key].title,
                amount:data[key].amount
              });
            }
            onLoadIngredients(loadedIngredients);
    }
  },[data,isLoading,error,onLoadIngredients]);

  return (
    <section className={classes.search}>
     {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className={classes.searchInput}>
          <label>Filter by Title</label>
          {isLoading && <span>Loading...</span>}
          <input ref={inputRef} type="text"  value={enteredFilter} onChange={e => setEnteredFilter(e.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
