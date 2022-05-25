import React from 'react';
// import { Link } from "react-router-dom";
import { Card } from 'semantic-ui-react';

function PostCard(post){

  console.log(post);
    return(
        <Card 
        href={`/${post.user.username}`}
        header={post.post.title}
        // Linkto={`/${post.user.username}`}
        // meta='Friend'
        description= {post.post.caption}
      />
    )
}




export default PostCard