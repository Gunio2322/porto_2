import * as React from 'react';
import { Helmet } from 'react-helmet';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from '../components/AppAppBar';
import MainContent from '../components-blog/Latest';
import Latest from '../components-blog/Latest';
import Footer from '../components/Footer';
import BoxBasic from '../components-blog/Test';

export default function Blog(props, post) {
  return (
<>
{/* <Helmet>
      <title>{post.title} | My Blog</title>
      <meta name="description" content={post.excerpt} />
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={post.excerpt} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={`https://myblog.com/posts/${post.id}`} />
      <meta property="og:image" content={post.image} />
    </Helmet> */}
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />

      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      ><Latest />
  
        {/* <BoxBasic /> */}
      </Container>
      <Footer />
    </AppTheme>
    </>
  );
}
