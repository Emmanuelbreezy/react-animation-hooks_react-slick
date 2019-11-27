import React,{useState} from 'react';

import Card from '../UI/Card';
import LoadingIndicator from '../UI/LoadingIndicator';
import classes from './IngredientForm.module.css';

const IngredientForm = React.memo(props => {

  //const [inputState, setInputState] = useState({title:'',amount:''});
  const [inputTitle, setInputTitle] = useState('');
  const [inputAmount, setInputAmount] = useState('');


  const submitHandler = event => {
    event.preventDefault();
    props.onaddIngredient({
      title:inputTitle,
      amount:inputAmount
    });
  };
  return (
    <section className={classes.ingredientForm}>
      <Card>
        <form onSubmit={submitHandler}>
          <div className={classes.formControl}>
            <label htmlFor="title">Name</label>
            <input type="text" id="title" value={inputTitle} 
              onChange={event => setInputTitle(event.target.value)} />
          </div>
          <div className={classes.formControl}>
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" value={inputAmount} 
            onChange={event => setInputAmount(event.target.value) } />
          </div>
          <div className={classes.ingredientForm__actions}>
            <button type="submit">Add Ingredient</button>
            {props.loading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
