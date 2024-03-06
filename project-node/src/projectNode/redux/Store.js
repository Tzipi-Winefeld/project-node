
import { combineReducers, createStore } from 'redux';
import recipeReducer from './apartmentReducer'
import userReducer from './userReducer'

//combineReducers = שילוב רדיוסרים
//פונקציה מובנית של רידקס 
//שמאפשרת לשלב כמה רדיוסרים לרדיוסר אחד
const reducer = combineReducers({
    recipeReducer,
    userReducer

    // products: productReducer,
    // users: userReducer
})

//יצירת המחסן - מקבל את הרדיוסר
const store = createStore(reducer)
window.store = store;
export default store;