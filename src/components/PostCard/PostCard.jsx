import React from 'react';
// import { Link } from "react-router-dom";
import { Card, Button } from 'semantic-ui-react';
import SinglePostPage from '../../pages/SinglePostPage/SinglePostPage'
import * as postsAPI from "../../utils/postApi";
import { Link } from 'react-router-dom';

function PostCard(post, user, inUser){

// console.log(postRefresh, "<----postRefresh!!!!!!!!!");
function handleClick(e){
  e.preventDefault()
  console.log(post, "<--- Delete Post");



  try {
    postsAPI.deletePost(post, post.post._id);
    window.location.reload();
  
  // const data = await postsAPI.delete(post);
  // const formData = new FormData()
  // formData.append('title', state.title)
  // formData.append('caption', state.caption)
  // console.log(formData, "<---- formData");
  // props.handleAddPost(formData);
}catch(err) {
  console.log(err);
  // setError(err.message);
}

}

console.log(post, "<--- this is thee post");

  // console.log(post, "<------card");
  // console.log(post.post.user.username, "<----- Post Owner");
  // console.log(inUser, "<------ Logged in User");
  // console.log(user, "<--- USer");
    return(
      // key={post._id}
      
        <Card  raised 
        // href={`/post/${post.post.title}`}
        // href={`/${post.post.user.username}/${post.post._id}`}
        >
        
  <Card style={{}} >
      <Card.Content>
        <Card.Header>{post.post.title}</Card.Header>
        <Card.Meta><Link to={`/${post.post.user.username}`}>{post.post.user.username}</Link></Card.Meta>
        <Card.Description>
          {post.post.caption}
        </Card.Description>
      </Card.Content>

    </Card>
      {/* /:username/:postid */}
    {post.post.user.username == 'tommythepoet' ? <div className='ui two buttons'>
<Button href={`${post.post.user.username}/${post.post._id}`} basic color='yellow'>
  Edit
</Button>
<Button 
basic color='red'
content='Click'
 onClick={handleClick}
 >
  Delete
</Button>

</div> : null}
      
      </Card>
      
    )
}




export default PostCard