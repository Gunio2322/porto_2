import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditPost from "../../components-admin/EditPost";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import CreatePost from '../../components-admin/DraftForm';
import AppTheme from '../../shared-theme/AppTheme';
import AppAppBar from '../../components/AppAppBar';
import MainContent from '../../components-blog/Latest';
import Footer from '../../components/Footer';



function EditorDraftPost(props){
    return (
        <>
<AppTheme {...props}>
          <CssBaseline enableColorScheme />
          <AppAppBar />
          <Container
            maxWidth="lg"
            component="main"
            sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
          >

            <EditPost />
          </Container>
          <Footer />
        </AppTheme>
        </>
    )
}

export default EditorDraftPost;