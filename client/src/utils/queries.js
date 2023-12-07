import { gql } from '@apollo/client'

export const GET_ME = gql`
    qeury me {
        user {
            _id
            username
        }
    }
`;

