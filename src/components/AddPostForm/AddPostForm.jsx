import React, { useState } from 'react';
// import { Form, Input, TextArea, Button } from "semantic-ui-react";
import { Button, Form, Grid, Segment } from 'semantic-ui-react'


export default function AddPostForm(props){

    const [selectedFile, setSelectedFile] = useState('')
  //, setSelectedFile
    const [state, setState] = useState ({
      title: '',
      caption: ''
    })

    function handleFileInput(e){
      setSelectedFile(e.target.files[0])
    }

    function handleChange(e){
      setState({
        ...state,
        [e.target.name]: e.target.value
      })
    }


    function handleSubmit(e){
      e.preventDefault()
      const formData = new FormData()
      formData.append('photo', selectedFile)
      formData.append('title', state.title)
      formData.append('caption', state.caption)
      console.log(formData, "<---- formData");
      props.handleAddPost(formData);
    }

    return (

      <Grid textAlign='center' style={{ height: '25vh' }} verticalAlign='middle'>
<Grid.Column style={{ maxWidth: 450 }}>
  <Segment>
  
      <Form  autoComplete="off" onSubmit={handleSubmit}>
            Title:
        <Form.Input
            className="form-control"
            name="title"
            value={state.title}
            placeholder="Title"
            onChange={handleChange}
            required
        />   
        Poem:
   <Form.Input
            style={{ height: '200px'}}
            className="form-control"
            name="caption"
            value={state.caption}
            placeholder="What's on your mind"
            onChange={handleChange}
            required
        />  
        <Button
          type="submit"
          className="btn"
        >
          ADD POEM
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














