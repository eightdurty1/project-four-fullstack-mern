const Post = require('../models/post');
const S3 = require('aws-sdk/clients/s3');
// const { v4: uuidv4 } = require('uuid');

const s3 = new S3();

module.exports = {
    create,
    index,
    editPost,
    deletePost
}

function editPost(req, res, next) {
    Post.findOne(
      { "_id": req.params.id },
      function (err, locationDocument) {
        const comment = locationDocument.comments.id(req.params.id);
        // console.log(req, "<-- req user");
        console.log(req.body, "<-- req body");
        comment.comments = req.body.text;
        // console.log(comment, "<---");
        //No error
        locationDocument.save(function (err) {
          if (err) next(err);
          res.redirect(`/locations/${locationDocument._id}`);
        });
      }
    );
  }
  
  
  
  
  function deletePost(req, res, next) {
    Post.deleteOne(
      { "_id": req.params.id },
      function (err) {
        
        if (err) return handleError(err);
      }
    );
  }



function create(req, res){
    console.log(req.file, req.body, 'this is create method', req.user)
    try {
        const filePath = "FilePath"
        const params = {Bucket: process.env.BUCKET_NAME, Key: filePath, Body: "String Holder"};
        s3.upload(params, async function(err, data){
			console.log(err, ' from aws')
            const post = await Post.create({caption: req.body.caption, user: req.user, title: req.body.title});
            console.log(post)
			// make sure the post we're sending back has the user populated
			await post.populate('user');
		
            res.status(201).json({post: post})
        })


    } catch(err){
        console.log(err)
        res.json({data: err})
    }
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


async function index(req, res){
    try {
        // this populates the user when you find the posts
        // so you'll have access to the users information 
        // when you fetch teh posts
        const posts = await Post.find({}).populate('user').exec()
        res.status(200).json({posts})
    } catch(err){

    }
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