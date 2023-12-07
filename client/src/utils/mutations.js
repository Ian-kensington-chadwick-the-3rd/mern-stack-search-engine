import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!){
        loginUser(email: $String!, password: $String!){
            token
            user {
                _id
                email
                password
            }
        }
}`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!){
        addUser(username: $String!, email: $String!, password: $String!){
        token
        _id
        username
        }
}`;

export const SAVE_BOOK = gql`
    mutation saveBook($book: BookInput!){
        saveBook(book: $BookInput!){
            _id
            authors
            description
            bookId
            image
            link
            title
        }
}`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!){
        removeBook(bookId: $ID!){
            _id
            savedbooks
        }
    }`