const { User } = require('../models')
const { signToken, AuthenticationError} = require('../utils/auth');
// const { AuthenticationError } = require('apollo-server');

const resolvers = {
    Query: {
        me: async ( parent, args, context) => {
            if(context.user){
                return User.findOne({_id: context.user._id}).select('-__v -password');
            }
            throw AuthenticationError;
        },
    },
    Mutation: {
        addUser: async (parent, {username, email, password}) => {
            console.log(username, email)
            const user = await User.create({username, email, password});
            const token = signToken(user);

            return { token, user};
        },
        login: async (parent, {email, password}) => {
            console.log('passthrough-data:', email,password)
            const user = await User.findOne({ email });
            console.log('userdata: ', user)
            if(!user){
                throw AuthenticationError;
            }
                console.log('password')
            const correctPassword = await user.isCorrectPassword(password);
            if(!correctPassword){
                throw AuthenticationError;
            }
            const token = signToken(user);
            return {token, user}
        },
        saveBook: async (parent, book , context) => {
            if (context.user){
                return User.findOneAndUpdate(
                {_id: context.user._id},
                {
                    $addToSet: { savedBooks:{...book}}
                },
                {
                    new: true
                }
            );   
            }
            throw AuthenticationError;
        },
        removeBook: async (parent,  bookId , context) => {
            if(context.user){
                return User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull:  {savedBooks: {bookId: bookId.bookId}}},
                    {new: true}
                )
            }
            throw AuthenticationError;
        },
    },
};

module.exports = resolvers