import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;
`;

export const FormWrapper = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

export const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
`;

export let Input = styled.input`
  width: 90%;
  padding: 0.75rem;
  margin-top: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

export const Button = styled.button`
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  margin-top: 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
export const ValidationError = styled.div`
    color: #cd0000;
    margin: 0`;

export const LinkText = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #555;

  Link {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
