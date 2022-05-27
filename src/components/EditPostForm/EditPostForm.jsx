import React, { useState, useEffect } from 'react';
// import { Form, Input, TextArea, Button } from "semantic-ui-react";
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import * as postsAPI from "../../utils/postApi";
import { useParams } from 'react-router-dom';




export default function EditPostForm(props){

    const [post, setPost] = useState({}); // <- likes are inside of the each post in the posts array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedFile, setSelectedFile] = useState('')
  //, setSelectedFile
    const [state, setState] = useState ({
      title: '',
      caption: ''
    })
    
    const {postid, username} = useParams()

    function handleFileInput(e){
      setSelectedFile(e.target.files[0])
    }

    function handleChange(e){
      setPost({
        ...post,
        [e.target.name]: e.target.value
      })
    }

    async function handleEditPost(post) {

      console.log(post.get('title'), "<---- POST handle edit post");
      
      try {
  
        setLoading(true);
        //putting data into db
        console.log(post.get('title'), "<---- POST set loafing");
        const data = await postsAPI.update(post, postid);
        
        // our server is going to return
        // the created post, that will be inside of data, which is the response from
        // the server, we then want to set it in state
        console.log(data, " this is response from the server, in handleAddPost");
        setPost([data.post, ...post]);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(err.message);
      }
      
  
    }





    function handleSubmit(e){
      e.preventDefault()
      const formData = new FormData()
      formData.append('title', post.title)
      formData.append('caption', post.caption)
      handleEditPost(formData);
    }

    async function getPost(){

        console.log(postid, username, "<---getPost id and username");
        try {

            const data = await postsAPI.getOne(postid, username);
            console.log(data, " this is data,");
            setPost(data.post);
            setLoading(false);
          } catch (err) {
            console.log(err.message, " this is the error");
            setError(err.message);
          } 
    }

    useEffect(() => {
        getPost();
    
      }, []);

    return (

      <Grid textAlign='center' style={{ height: '25vh' }} verticalAlign='middle'>
<Grid.Column style={{ maxWidth: 450 }}>
  <Segment>
  
      <Form  autoComplete="off" onSubmit={handleSubmit}>
            Title:
        <Form.Input
            className="form-control"
            name="title"
            value={post.title}
            placeholder="Title"
            onChange={handleChange}
            required
        />   
        Poem:
   <Form.Input
            className="form-control"
            name="caption"
            value={post.caption}
            placeholder="What's on your mind"
            onChange={handleChange}
            required
        />  
        <Button
          type="submit"
          className="btn"
        >
          Update
        </Button>
      </Form>
    </Segment>
</Grid.Column>
</Grid>























        
            // <Form>
            //   <Form.Group widths="equal">
            //     <Form.Field
            //       id="form-input-control-first-name"
            //       control={Input}
            //       label="Title"
            //       placeholder="Title"
            //     />
            //     {/* <Form.Field
            //       id='form-input-control-last-name'
            //       control={Input}
            //       label='Last name'
            //       placeholder='Last name'
            //     /> */}
            //     {/* <Form.Field
            //       control={Select}
            //       options={genderOptions}
            //       label={{ children: 'Gender', htmlFor: 'form-select-control-gender' }}
            //       placeholder='Gender'
            //       search
            //       searchInput={{ id: 'form-select-control-gender' }}
            //     /> */}
            //   </Form.Group>
            //   <Form.Field
            //     id="form-textarea-control-opinion"
            //     control={TextArea}
            //     label="Writings"
            //     placeholder="Share here.."
            //   />
            //   {/* <Form.Field
            //     id='form-input-control-error-email'
            //     control={Input}
            //     label='Email'
            //     placeholder='joe@schmoe.com'
            //     error={{
            //       content: 'Please enter a valid email address',
            //       pointing: 'below',
            //     }}
            //   /> */}
            //   <Form.Field
            //     id="form-button-control-public"
            //     control={Button}
            //     content="Submit"
            //     label="Publish"
            //   />
            // </Form>









           
          
          
    )
}














