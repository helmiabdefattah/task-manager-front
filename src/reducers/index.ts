import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { globalReducer } from "./globalReducer";

export const rootReducer = combineReducers({
	user: userReducer,
	payload: globalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
