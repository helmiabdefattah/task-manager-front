import { UserAction, UserActionTypes, UserState } from "../types/user";

const initialState: UserState = {
	userData: null,
};

export const userReducer = (
	state = initialState,
	action: UserAction
): UserState => {
	switch (action.type) {
		case UserActionTypes.SET_USER_DATA:
			return {
				...state,
				userData: action.payload,
			};
		default:
			return state;
	}
};
