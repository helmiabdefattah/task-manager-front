export interface User {
	_id:string;
	username: string;
	email: string;
	token: string;
	avatar?:string
}

export interface UserState {
	userData: User | null;
}

export enum UserActionTypes {
	SET_USER_DATA = "SET_USER_DATA",
}

interface SetUserDataAction {
	type: UserActionTypes.SET_USER_DATA;
	payload: User;
}

export type UserAction = SetUserDataAction;
