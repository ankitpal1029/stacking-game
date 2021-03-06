import {gql} from "@apollo/client"

/*
export const LOGIN_USER = gql`
    mutation{
      login(email:"bob3@mail.com",password:"idk"){
        id
        firstName
        lastName
        name
      }
    }
`
*/
export const LOGIN_USER = gql`
    mutation LoginUser($email: String!, $password: String!){
      login(email:$email ,password:$password){
        id
        firstName
        lastName
        name
      }
    }
`
