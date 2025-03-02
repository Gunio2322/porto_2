
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import DOMPurify from 'dompurify';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from '../components/AppAppBar';
import MainContent from './Latest';
import Latest from './Latest111';
import Footer from '../components/Footer';
import { Link } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider';
import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h2',
          h2: 'h2',
          h3: 'h2',
          h4: 'h2',
          h5: 'h2',
          h6: 'h2',
          subtitle1: 'h2',
          subtitle2: 'h2',
          body1: 'span',
          body2: 'span',
        },
      },
    },
  },
});


export default function Post(props) {

  const [data, setData] = useState([]);
  const { slug } = useParams();
  const { _id } = useParams();
  const [contentHTML, setContentHTML] = useState("");

  const fetchFilter = async () => {
    const paramsOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": "token-value",
      },
    };

    try {
      const response = await fetch(`http://localhost:3001/api/postFilter/${_id}`, paramsOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json();
      setData(json);

      if (json.content) {
        const contentState = convertFromRaw(JSON.parse(json.content));
        const html = stateToHTML(contentState);
        const sanitizedHTML = DOMPurify.sanitize(html);
        setContentHTML(sanitizedHTML);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchFilter();
  }, [_id]);









  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />

      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <Link href="/blog" underline="none" color="lightblue"     >
          {'Back to blog'} 
        </Link>

        <Typography variant="h1"  gutterBottom>
        {data.title} 
        </Typography>
        {/* <Typography variant="body1" gutterBottom>
          Data
        </Typography> */}
        <Divider textAlign="left">DATA</Divider>

        <Box
          component="img"

          sx={{
            // objectFit: 'contain',

          maxHeight: 600,
      // width: 'auto',
      // objectFitit: 'cover',
            // maxHeight: { xs: 250, md: 600 },
            // loading: true,
            maxWidth: { xs: 350, md: 800 },
            marginLeft: 'auto',
            marginRight: 'auto',
            // position: 'center',
            // display: 'block',
            // margin: 'auto', 
            // lazy: true
          }}
          alt=""
          src={data.featuredImageUrl}
        />
  <Divider textAlign="right">Category</Divider>

        <Typography variant="body1" component="span" sx={{ mt: 1 }}>
        <div dangerouslySetInnerHTML={{ __html: contentHTML }} />

        </Typography>
        {/* <Latest /> */}


      </Container>
      <Footer />
    </AppTheme>
  );
}
