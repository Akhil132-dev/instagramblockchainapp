import User from "../model/User.js";
import bcrypt from "bcrypt";

//Registered

const auth = async (req, res) => {
  try {
    //genretes new passward

    const salt = await bcrypt.genSalt(10);
    const hashedPassward = await bcrypt.hash(req.body.passward, salt);
    //create new users
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      passward: hashedPassward,
    });
    //save user and return responsed
    const user = await newUser.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Login

const Login = async (req, res) => {
  try {
    //getting user from the data base using email address
    const user = await User.findOne({
      email: req.body.email,
    });
    //checking if the email is right or wrong
    !user && res.status(404).send("user not found");
    //checking if passward is right or wrong
    const validPassward = await bcrypt.compare(
      req.body.passward,
      user.passward
    );
    // if passward is wrong then is will send the resoponed that passward is wrong
    !validPassward && res.status(400).json("wrong passaward");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export { auth, Login };
