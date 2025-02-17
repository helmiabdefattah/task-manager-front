import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import AuthService from "../services/AuthService";
import {Container, FormWrapper, Title, Input, Button, LinkText, ValidationError} from "../styles";
import React from "react";

const Register :React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [csrfToken, setCsrfToken] = useState("");


    const navigate = useNavigate();

    useEffect(() => {
        AuthService.getCSRF().then((csrfToken:string)=>{
            setCsrfToken(csrfToken);
        })
    }, []); // Log errors whenever it changes

    const validatePassword = (password: string):string => {
        if (!password) {
            return 'Password is required.';
        }
        if (password.length < 6) {
            return 'Password must be at least 6 characters long.';
        }
        return '';
    };

    const validateUsername = (name: string):string => {
        if (!name) {
            return 'Email is required.';
        }
        const displayNameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
        if (!displayNameRegex.test(name)) {
            return 'Display name must be 3-20 characters and contain only letters, numbers, underscores, or dashes.';
        }
        return '';
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        const usernameError = validateUsername(username);
        // const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        if (usernameError || passwordError) {
            setErrors({
                username: usernameError,
                // email: emailError,
                password: passwordError,
            });
            console.log(errors)
            return;
        }

        try {
            await AuthService.register(username, email, password,csrfToken);
            navigate("/dashboard");
            toast.success("User Register Success")
        } catch (error) {
            toast.error("Something went wrong")
            console.log(error)
        }
    };

    return (
        <Container>
            <FormWrapper>
                <Title>Register</Title>
                <form onSubmit={handleRegister}>
                    <Input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    {errors.username && <ValidationError>{errors.username}</ValidationError>}
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <div>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {errors.password && <ValidationError>{errors.password}</ValidationError>}
                    </div>
                    <Button type="submit">Register</Button>
                </form>
                <LinkText>
                    Already have an account? <Link to="/login">Login</Link>
                </LinkText>
            </FormWrapper>
        </Container>
    );
};

export default Register;
