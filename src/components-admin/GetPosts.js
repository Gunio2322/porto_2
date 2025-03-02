import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import DOMPurify from 'dompurify';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function GetPosts() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/getPosts`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <nav className='navbar'>
          {/* <Link to='/home' className='logo'>
            <h2>Posts</h2>
          </Link> */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link to='/admin/create' className='newPostBtn'>
           
              <Button variant="outlined">Nowy post</Button>
            </Link>
          </div>
        </nav>

        <main className='main'>
          {/* <h2 className='heading'>Latest Posts</h2> */}

          <Typography variant="h2" gutterBottom>
          Latest Posts
      </Typography>
          {data?.map((post) => {
            let contentHTML = "";
            if (post.content) {
              try {
                const contentState = convertFromRaw(JSON.parse(post.content));
                const html = stateToHTML(contentState);
                contentHTML = DOMPurify.sanitize(html);
              } catch (error) {
                console.error('Error parsing content:', error);
              }
            }
            return (
              <div className='posts_container' key={post._id}>
                <Link to={`/post/${post.slug}/${post._id}`} >
                  <h2 className='post_title'>{post.title}</h2>
                </Link>
                {/* <div dangerouslySetInnerHTML={{ __html: contentHTML }} /> */}
                <div>
                  <Link to={`/admin/edit/${post._id}`}>
                    <button>Update</button>
                  </Link>
                  &nbsp;
                  
                  <button intent="danger">Delete</button>
                </div>
              </div>
            );
          })}
        </main>
      </div>
    </>
  );
}