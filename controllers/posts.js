const Post = require("../models/post");
const S3 = require("aws-sdk/clients/s3");
const { DataBrew } = require("aws-sdk");
// const { v4: uuidv4 } = require('uuid');

const s3 = new S3();

module.exports = {
  create,
  index,
  editPost,
  deletePost,
  getPost,
};

function editPost(req, res, next) {


  console.log(req.body, "<------------body")

  const post = Post.updateOne({ _id: req.params.id },
    { caption: req.params.caption, title: req.params.title }, function (err) {
    if (err) return handleError(err);
  });

 

  console.log(post, "the post ------>>>");







  // console.log(req.body, "<-----REQBODY");
  // console.log(req.params.id, "<<<<<<<<<<<<REQPARAMSID")
  // const post = Post.findOneAndUpdate(

  //   { new: true }
  // );
  // // window.location = '/';
  // console.log(post, "<---- post insie the editPost");

  // res.status(201);





}

// const schema = new mongoose.Schema({ name: String, title: String });
// const CharacterModel = mongoose.model('Character', schema);

// const doc = await CharacterModel.create({
//   name: 'Jon Snow',
//   title: `Lord Commander of the Night's Watch`
// });





// Update the document by setting a property and calling `save()`
// doc.title = 'King in the North';
// await doc.save();

function deletePost(req, res, next) {
  Post.deleteOne({ _id: req.params.id }, function (err) {
    if (err) return handleError(err);
  });
}

function create(req, res, next) {
  console.log(req.file, req.body, "this is create method", req.user);
  try {
    const filePath = "FilePath";
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: filePath,
      Body: "String Holder",
    };
    s3.upload(params, async function (err, data) {
      console.log(err, " from aws");
      const post = await Post.create({
        caption: req.body.caption,
        user: req.user,
        title: req.body.title,
      });
      console.log(req.body, "<<<<req.body in create function")
      // make sure the post we're sending back has the user populated
      await post.populate("user");

      res.status(201).json({ post: post });
    });
  } catch (err) {
    console.log(err);
    res.json({ data: err });
  }
}

function getPost(req, res, next) {
  console.log(req.params.id, "<---- this is req.params.id");

  const post = Post.findOne({ _id: req.params.id }, function (err, data) {
    console.log(data, "<---Post in controllers");
    res.status(201).json({ post: data });
    //   if (err) return handleError(err);
  });
}

// function create(req, res) {
//     try {
//         console.log(req.body, "<-----------REQ.BODY!!!!!!!!!")
//     const post = new Post(req.body);
//     post.save(function (err) {
//       console.log(err, "this err");
//       console.log(post, "<_---- THE POST!!!!");
//       res.status(201).json({post: post})
//     });
// }catch(err){
//     console.log(err)
//     res.json({data: err})

//   }

// // function create(req, res){
// //     console.log(req.file, req.body, 'this is create method', req.user)
// //     try {

// }

async function index(req, res, next) {
  try {
    // this populates the user when you find the posts
    // so you'll have access to the users information
    // when you fetch teh posts
    const posts = await Post.find({}).populate("user").exec();
    res.status(200).json({ posts });
  } catch (err) {}
}

// // const filePath = `${uuidv4()}/${req.file.originalname}`
// const params = {Bucket: process.env.BUCKET_NAME, Key: JSON.stringify(req.body), Body:"The title, The Caption" };
// // req.body
// s3.putObject(params, async function(err, data){
// 	console.log(err, ' from aws')
//     const post = await Post.create({caption: req.body.caption, user: req.user});
//     //, photoUrl: data.Location
//     console.log(post)
// 	// make sure the post we're sending back has the user populated
// 	await post.populate('user');

//     res.status(201).json({post: post})
// })
