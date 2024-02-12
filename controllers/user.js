const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const bcrypt = require('bcrypt');

const { setUser } = require("../service/auth");


async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        name,
        email,
        password: hashedPassword,
      });
      return res.redirect("signin");
    } catch (error) {
      console.error("Error during signup:", error);
      return res.status(500).render("error", {
        error: "Internal Server Error",
      });
    }
  }
async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });


     try {
        const user = await User.findOne({ email });
    
        if (!user || !(await bcrypt.compare(password, user.password))) {
          return res.render("signin", {
            error: "Invalid Username or Password",
          });
        }

  const token = setUser(user);
  res.cookie("uid", token);
  return res.redirect("/url");

} catch (error) {
    console.error("Error during login:", error);
    return res.status(500).render("error", {
      error: "Internal Server Error",
    });

}

}
module.exports = {
  handleUserSignup,
  handleUserLogin,
};