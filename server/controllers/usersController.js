const User = require('../model/userModel');
const bcrypt = require('bcrypt');

module.exports.signup = async (req, res, next) => {
    try {
        // Extract data from request body
        const { username, emailId, password } = req.body;

        // Check if the username is already taken
        const checkUsername = await User.findOne({ username });
        if (checkUsername) {
            return res.json({ msg: 'Username not available', status: false });
        }

        // Check if the email is already in use
        const checkEmailId = await User.findOne({ emailId });
        if (checkEmailId) {
            return res.json({ msg: 'Email-Id already used', status: false });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 12);

        // Create a new user in the database
        const user = await User.create({
            emailId,
            username,
            password: hashPassword,
        });

        // Remove the password field from the user object before sending the response
        user.password = undefined;

        // Send a JSON response with the status and user information
        return res.json({ status: true, user });
    } catch (ex) {
        // Pass any errors to the next middleware
        next(ex);
    }
};

module.exports.firebaseSignin = async(req,res,next) =>{
    try{

        const {emailId} = req.body;
        if(emailId){
            const user= await User.findOne({emailId});
            if(user){

                user.password=undefined;
                return res.json({status:true,user})
            }
            else
            {
                return res.json({status:false,msg:'Welcome to VConvo!!!'})
            }
        }

    }
    catch(ex){

        next(ex);

    }
}

module.exports.signin = async (req, res, next) => {
    try {
        // Extract data from request body
        const { username, password } = req.body;

        // Check if the username is already taken
        const user = await User.findOne({ username });
        if (!user) {
            return res.json({ msg: 'Incorrect username or password', status: false });
        }

        // Check if the email is already in use
        const isPassword = await bcrypt.compare(password,user.password);
        if (!isPassword) {
            return res.json({ msg: 'Incorrect username or password', status: false });
        }

        user.password=undefined;
        // Send a JSON response with the status and user information
        return res.json({ status: true, user });
    } catch (ex) {
        // Pass any errors to the next middleware
        next(ex);
    }
};

module.exports.avatar = async (req, res, next) => {
    try{

        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId,{
            isAvatar:true,
            avatarImage,},
            {new:true}
        );
        return res.json({isSet:userData.isAvatar,image:userData.avatarImage,})

    }catch(ex)
    {
        next(ex);
    }
}

module.exports.allusers= async (req, res, next) => {
    try{
        const users = await User.find({_id:{$ne:req.params.id}}).select([
            "emailId","username","avatarImage","_id",
        ])
        return res.json(users);
    }catch(ex){
        next(ex);
    }
}

module.exports.logout = (req, res, next) => {
    try {
      if (!req.params.id) return res.json({ msg: "User id is required " });
      onlineUsers.delete(req.params.id);
      return res.status(200).send();
    } catch (ex) {
      next(ex);
    }
  };