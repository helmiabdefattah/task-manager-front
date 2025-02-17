import { SetFetchDataAction } from "../types";
const routeInitialState = {
	reloadFetch: false,
};
export const globalReducer = (
	state = routeInitialState,
	action: SetFetchDataAction
): any => {
	switch (action.type) {
		case "SET_FETCH_RELOAD_DATA":
			return {
				...state,
				reloadFetch: action.payload,
			};
		default:
			return state;
	}
};
