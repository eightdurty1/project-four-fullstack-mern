import tokenService from './tokenService';
import axios from "axios";
import { CardDescription } from 'semantic-ui-react';

const BASE_URL = '/api/posts';

export function create(post) {
    return fetch(BASE_URL, {
      method: 'POST',
      body: post,
      headers: {
        'Authorization': 'Bearer ' + tokenService.getToken()
      }
    
    }).then(res => {
      if(res.ok) return res.json();
      throw new Error('Bad Credentials! CHECK THE SERVER TERMINAL!')
    })
  }





  //AJAX call, returns fetch call
  export function getAll() {
    return fetch(BASE_URL, {
      headers: {
        'Authorization': 'Bearer ' + tokenService.getToken()
      }
    })
    .then(res => {
      if(res.ok) return res.json();
      throw new Error('Bad Credentials! CHECK THE SERVER TERMINAL!')
    })
  }


  export function deletePost(post, postId) {
    return fetch(BASE_URL + "/" + postId, {
      method: 'DELETE',
      body: '',
      headers: {
        'Authorization': 'Bearer ' + tokenService.getToken()
      }
    
    }).then(res => {
      if(res.ok) return res.json();
      throw new Error('Bad Credentials! CHECK THE SERVER TERMINAL!')
    })
  }

  export function getOne(postId, username){
    return fetch(BASE_URL + "/" + username + "/" + postId, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + tokenService.getToken()
      }
    })
    .then(res => {
      if(res.ok) return res.json();
      throw new Error('Bad Credentials! CHECK THE SERVER TERMINAL!')
    })
  }


  export function update(post, postId, title) {
    console.log(post.get('title'), "<-- post yayayayyyayyayayy")

    return axios({
  
      // Endpoint to send files
      url: BASE_URL + "/" + postId + '/' + post.get('title') + '/' + post.get('caption'),
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + tokenService.getToken()
      },
  
      // Attaching the form data
      // data: formData,
    })
  
      // Handle the response from backend here
      .then((res) => { })
  
      // Catch errors if any
      .catch((err) => { });
  

    // return fetch(BASE_URL + "/" + postId, {
    //   method: 'POST',
    //   body: post,
    //   headers: {
    //     'Authorization': 'Bearer ' + tokenService.getToken()
    //   }
    
  //   }).then(res => {
  //     if(res.ok) return res.json();
  //     throw new Error('Bad Credentials! CHECK THE SERVER TERMINAL!')
  //   })
  }