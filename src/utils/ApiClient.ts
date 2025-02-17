import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";

export const ApiClient = (applyAuth = true): AxiosInstance => {
	const headers = {
		"Content-Type": "application/json",
	};
	const client = axios.create({
		baseURL: process.env.API_URL as string,
		headers,
		timeout: 60000,
		withCredentials: false,
	});

	client.interceptors.request.use((config: any) => {
		const loggedUser = JSON.parse(<string>localStorage.getItem("userData"));

		config.headers = {};
		if (applyAuth) {
			config.headers.Authorization = `Bearer ${loggedUser?.token}`;
		}
		return config;
	});

	client.interceptors.response.use(
		(response: AxiosResponse) => {
			return response;
		},
		(error: AxiosError) => {
			try {
				const { response } = error;
				if (response?.status === 401) {
					localStorage.removeItem("userData");
				}
			} catch (e) {
				console.error(e);
			}
			throw error;
		}
	);

	return client;
};
