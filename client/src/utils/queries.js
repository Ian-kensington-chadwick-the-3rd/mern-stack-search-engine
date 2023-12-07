import { gql } from '@apollo/client'

export const GET_ME = gql`
    qeury me {
        me {
            _id
            username
        }
    }
`;

