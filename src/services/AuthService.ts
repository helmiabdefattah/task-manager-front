import {toast} from "react-toastify";
import axios, {AxiosResponse} from "axios";

const API_URL: string  = process.env.API_URL as string;

export interface AuthResponse {
    token: string;
    user: {
        id: string;
        username: string;
        email: string;
    };
}

const AuthService = {
    /**
     * Register a new user
     * @param username - The username of the user
     * @param email - The email of the user
     * @param password - The password of the user
     * @param csrfToken
     * @returns Promise<AuthResponse>
     */
    async register(username: string, email: string, password: string, _csrf:string): Promise<AuthResponse> {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token":_csrf
            },
            body: JSON.stringify({ username, email, password, _csrf }),
            credentials: "include",
        });
        const data = await response.json();

        if (!response.ok) {
            if (data.error && Array.isArray(data.error)) {
                data.error.forEach((errMsg: string) => toast.error(errMsg)); // Show each validation error
            } else {
                toast.error(data.error || "Registration failed"); // Generic error message
            }
            throw new Error("Registration failed");
        }
        localStorage.setItem("token", data.token); // Store token for future requests
        return data;
    },

    /**
     * Log in an existing user
     * @param email - The user's email
     * @param password - The user's password
     * @param _csrf
     * @returns Promise<AuthResponse>
     */
    async login(email: string, password: string,_csrf:string): Promise<AuthResponse> {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "X-CSRF-Token": _csrf },
            body: JSON.stringify({ email, password }),
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Invalid credentials");
        }

        const data: AuthResponse = await response.json();
        localStorage.setItem("userData", JSON.stringify(data));
        localStorage.setItem("token", JSON.stringify(data.token));
        return data;
    },

    /**
     * Log out the user by removing token from local storage
     */
    async logout():Promise<boolean> {
        const response = await fetch(`${API_URL}/logout`, {
            method: "POST",
            credentials: "include",
        });

        if (!response.ok) {
            false;
        }
        localStorage.removeItem("userData");
        localStorage.removeItem("token");

        return true;
    },

    /**
     * Get the authentication token from local storage
     * @returns string | null
     */
    getToken(): string | null {
        return localStorage.getItem("token");
    },

    /**
     * Check if the user is authenticated (valid token exists)
     * @returns boolean
     */
    isAuthenticated(): boolean {
        return !!localStorage.getItem("token");
    },

    async getCSRF():Promise<string>{
         const response:AxiosResponse = await axios.get(`${API_URL}/csrf-token`, {withCredentials: true});
        return response.data.csrfToken;
    }
};

export default AuthService;
