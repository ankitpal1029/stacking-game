import {gql} from "@apollo/client";

export const CREATE_USER = gql`
mutation Register($firstName: String!, $lastName: String!, $email: String!, $password: String!){
  register(
    firstName: $firstName,
    lastName: $lastName,
    email: $email,
    password: $password
){
    id
    firstName
    lastName
    email
  }
}
`

