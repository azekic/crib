const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const { transformUser } = require('./merge');
const { AuthenticationError } = require('apollo-server');
module.exports = {

    createUser: async args => {
        try {
            const existingUser = await User.findOne({ email: args.userInput.email })
            
            if (existingUser) {
                throw new AuthenticationError("User exists already");
            }
            const hashedPassword = await bcrypt
                .hash(args.userInput.password, 12);
            const user = new User({
                email: args.userInput.email,
                password: hashedPassword,
                firstName: args.userInput.firstName,
                lastName: args.userInput.lastName
            })
            const result = await user.save();
            return { ...result._doc, password: null };
        } catch (err) {
            throw err;
        }
    },
    updateProfilePicture: async (args, req) => {
        if (!req.isAuth) { 
            throw new Error('Unauthenticated!');
        }
        const user = await User.findOneAndUpdate(
            {_id: req.userId},
            {profilePicture: args.updateProfilePictureInput.profilePicture}
        );
        return user;

    },

    login: async ({email, password}) => {
        const fetchedUser = await User.findOne({email: email});
        if (!fetchedUser) {
            throw new AuthenticationError('User does not exist');
        }
        const user = fetchedUser.building == null ? transformUser(fetchedUser) : fetchedUser;
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new AuthenticationError('Password is incorrect')
        }
        const token = jwt.sign({userId: user.id, email: user.email}, 
            'somesupersecretkey', 
            {
                expiresIn: '1h'
            }
        );
        
        return { user: transformUser(user), token: token, tokenExpiration: 1,  };
    }
};