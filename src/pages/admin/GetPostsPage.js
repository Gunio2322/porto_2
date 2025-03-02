
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from '../../shared-theme/AppTheme';
import AppAppBar from '../../components/AppAppBar';
import Footer from '../../components/Footer';
import GetPosts from '../../components-admin/GetPosts';


export default function GetPostPage(props) {
    return (
        <AppTheme {...props}>
          <CssBaseline enableColorScheme />
          <AppAppBar />
          <Container
            maxWidth="lg"
            component="main"
            sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
          >
            <GetPosts />
          </Container>
          <Footer />
        </AppTheme>
    );
}