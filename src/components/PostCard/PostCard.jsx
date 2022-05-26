import React from 'react';
// import { Link } from "react-router-dom";
import { Card } from 'semantic-ui-react';
import SinglePostPage from '../../pages/SinglePostPage/SinglePostPage'

function PostCard(post){

  console.log(post, "<------card");
    return(
      // key={post._id}
        <Card  raised 
        // href={`/post/${post.post.title}`}
        href='Hello'
        // header={post.post.title}
        header='Title'
        // Linkto={`/${post.user.username}`}
        meta={`/${post.user.username}`}
        // description= {post.post.caption}
        description='Blurb'
      />
    )
}




export default PostCard