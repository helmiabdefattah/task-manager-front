import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import {Container, FormWrapper, Title, Input, Button, LinkText, ValidationError} from "../styles";
import { useAuth } from "../context/AuthContext";
import React from "react";
import {toast} from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [csrfToken, setCsrfToken] = useState("");

    const { isAuthenticated, setIsAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
        AuthService.getCSRF().then((csrfToken:string)=>{
            setCsrfToken(csrfToken);
        })

    }, [isAuthenticated, navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Clear previous errors
        setIsLoading(true); // Set loading state

        try {
            await AuthService.login(email, password,csrfToken);
            setIsAuthenticated(true); // Update authentication state
            toast.success('Welcome again')
        } catch (error) {
            setError("Invalid credentials. Please try again."); // Set error message
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    return (
        <Container>
            <FormWrapper>
                <Title>Login</Title>
                <form onSubmit={handleLogin}>
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <ValidationError>{error}</ValidationError>}
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                    </Button>
                </form>
                <LinkText>
                    Don't have an account? <Link to="/register">Register</Link>
                </LinkText>
            </FormWrapper>
        </Container>
    );
};

export default Login;