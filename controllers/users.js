const User = require("../models/user");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const { v4: uuidv4 } = require("uuid");
// uuid, helps generate our unique ids
const S3 = require("aws-sdk/clients/s3");
const s3 = new S3(); // initialize the construcotr
// now s3 can crud on our s3 buckets
const Post = require("../models/post");

module.exports = {
  signup,
  login,
  profile
};

async function signup(req, res) {
  console.log('hitting signup router')
  console.log(req.body, ' <- req.body is users signup', req.file, ' this is req.file')

  //////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////

  // FilePath unique name to be saved to our butckt
  const filePath = `${uuidv4()}/${req.file.originalname}`;
  const params = {
    // Bucket: process.env.BUCKET_NAME,
    // 'catcollectorbucket911'
    Bucket: process.env.BUCKET_NAME,
    Key: filePath,
    Body: req.file.buffer,
  };
  //your bucket name goes where collectorcat is
  //////////////////////////////////////////////////////////////////////////////////
  s3.upload(params, async function (err, data) {
    console.log(data, "from aws"); // data.Location is our photoUrl that exists on aws
    const user = new User({ ...req.body, photoUrl: data.Location });
    try {
      await user.save();
      const token = createJWT(user); // user is the payload so this is the object in our jwt
      res.json({ token });
      //res.json
    } catch (err) {
      // Probably a duplicate email
      res.status(400).json(err);
    }
  });
  //////////////////////////////////////////////////////////////////////////////////
}

async function login(req, res) {
  try {
    //configured to find user by their email, login form must send over the email. the key is called email, for password its password
    const user = await User.findOne({ email: req.body.email });
    console.log(user, " this user in login");
    if (!user) return res.status(401).json({ err: "bad credentials" });
    // had to update the password from req.body.pw, to req.body password
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({ token });
      } else {
        return res.status(401).json({ err: "bad credentials" });
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}


async function profile(req, res){
  try {
    // First find the user using the params from the request
    // findOne finds first match, its useful to have unique usernames!
    const user = await User.findOne({username: req.params.username})
    // Then find all the posts that belong to that user
    if(!user) return res.status(404).json({err: 'User not found'})
    console.log(user, "<---user")
    const posts = await Post.find({user: user._id}).populate("user").exec();
    console.log(posts, ' this posts')
    res.status(200).json({posts: posts, user: user})
  } catch(err){
    console.log(err)
    res.status(400).json({err})
  }
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    { user }, // data payload
    SECRET,
    { expiresIn: "24h" }
  );
}
