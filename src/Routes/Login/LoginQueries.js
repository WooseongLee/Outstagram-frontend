import { gql } from "apollo-boost";

export const CREATE_ACCOUNT = gql`
  mutation createAccount($name: String!, $email: String!, $password: String!) {
    createAccount(name: $name, email: $email, password: $password)
  }
`;

export const CONFIRM_LOGIN = gql`
  mutation confirmLOGIN($password: String!, $email: String!) {
    confirmLOGIN(password: $password, email: $email)
  }
`;

export const LOCAL_LOG_IN = gql`
  mutation logInUser($logInUser: String!) {
    logInUser(logInUser: $logInUser) @client
  }
`;
