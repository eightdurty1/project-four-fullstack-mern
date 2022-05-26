import React, { useState, useEffect } from "react"
// import PostCard from '../../components/PostCard/PostCard'
import PageHeader from "../../components/Header/Header";
import * as postsAPI from "../../utils/postApi";
import { Card } from 'semantic-ui-react'

export default function SinglePostPage(user, handleLogout){


    console.log(postsAPI, " <-- postsAPI")
  const [posts, setPosts] = useState([]); // <- likes are inside of the each post in the posts array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


     // R read in crud
    async function getPosts() {
        try {
          const data = await postsAPI.getAll();
          console.log(data, " this is data,");
          setPosts([...data.posts]);
          
          setLoading(false);
        } catch (err) {
          console.log(err.message, " this is the error");
          setError(err.message);
        }
      }

      useEffect(() => {
        getPosts();
    
      }, []);



    return (
        <>
        {/* <PageHeader handleLogout={handleLogout} user={user}/>
        {console.log(posts[0], "<--- POSTSSSS")}
        <Card>
            <h1></h1>
            <h2>Name</h2>
            <p>The poem</p>
            </Card> */}
            </>
    )
}

