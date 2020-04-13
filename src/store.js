import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import notReducer from "./reducers/notificationReducer"
import { composeWithDevTools } from "redux-devtools-extension"

const store = createStore(
  notReducer,
  composeWithDevTools(applyMiddleware(thunk))
)
store.subscribe(() => console.log(store.getState()))
export default store
