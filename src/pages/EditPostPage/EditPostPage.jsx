import React from "react";
import PageHeader from "../../components/Header/Header";
import { Grid } from "semantic-ui-react";
import EditPostForm from "../../components/EditPostForm/EditPostForm";



export default function EditPostPage(handleLogout, user, postRefresh, posts, loading){

  function handleEditPost(){

  }
    return (
        <Grid centered>
    <Grid.Row>
      <Grid.Column>
        
        <PageHeader handleLogout={handleLogout} user={user}/>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column style={{ maxWidth: 450 }}>
      //Form Render
        <EditPostForm handleEditPost={handleEditPost} />
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column style={{ maxWidth: 450 }}>
        {/* <PostGallery
        postRefresh={postRefresh}
          posts={posts}
          // numPhotosCol={1}
          isProfile={false}
          loading={loading}
          // addLike={addLike}
          // removeLike={removeLike}
          user={user}
        /> */}
      </Grid.Column>
    </Grid.Row>
  </Grid>

    )
}