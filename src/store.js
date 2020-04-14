import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import notReducer from "./reducers/notificationReducer"
import blogReducer from "./reducers/blogReducer"
import userReducer from "./reducers/userReducer"
import { composeWithDevTools } from "redux-devtools-extension"

const reducer = combineReducers({
  notReducer,
  blogReducer,
  userReducer,
})
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
store.subscribe(() => console.log(store.getState()))
export default store
