import { createStore } from "redux";
import reducer from '../reducers'

export const initialState = { tech: "React" };
export const store = createStore(reducer, initialState);  