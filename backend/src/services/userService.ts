// const User = require('../models/userModel');

// class UserService {
//   // Existing method for registering a user
//   async registerUser(userData: any) {
//     try {
//       const newUser = new User(userData);
//       await newUser.save();
//       return newUser;
//     } catch (error) {
//       throw error;
//     }
//   }

//   async findUserByEmail(email: string) {
//     try {
        
//       const user = await User.findOne({ email });
//       console.log("user",user);
//       return user;
//     } catch (error) {
//       throw error;
//     }
//   }
// }

// module.exports = UserService;
const User = require('../models/userModel');

interface User {
    id:number;
    email: string;
    password: string;
}

const users: User[] = [];

class UserService {
    async registerUser(userData: any) {
       
        const newUser = { ...userData };
        console.log("no :of users : ",users);
        users.push(newUser);
        console.log("reg user: ",newUser);
        return newUser;
    }

    async findUserByEmail(email: any, password: any) {
        console.log("no of users : ",users);
        const user = users.find((u) => u.email === email);
     
        if (user && user.password === password ) {

            console.log("login :",user);
            return user;
        }
       
    }
}

module.exports = UserService;
