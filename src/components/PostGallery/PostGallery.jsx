import React from "react";
import { Card, Dimmer, Segment, Image  } from 'semantic-ui-react'
import PostCard from '../PostCard/PostCard';
import Loader from '../Loader/Loader';

export default function PostGallery({posts, numPhotosCol, isProfile, loading, addLike, removeLike, user }){
    console.log(posts, "<--- console log posts");
    return (
        <Card.Group itemsPerRow={numPhotosCol} stackable>
        {loading ? (
          <Segment>
            <Dimmer active inverted>
              <Loader size="small">Loading</Loader>
            </Dimmer>
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
          </Segment>
        ) : null}
        {posts.map((post) => {
          console.log(post, "<<_______-------- POST");
          return (
            <PostCard
            //post
              post={post}
              key={post._id}
              isProfile={isProfile}
            //   addLike={addLike}
            //   removeLike={removeLike}
              user={user}
            />
          );
        })}
      </Card.Group>
  
    )
}