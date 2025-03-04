
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import CreatePost from '../../components-admin/DraftForm';
import AppTheme from '../../shared-theme/AppTheme';
import AppAppBar from '../../components/AppAppBar';
import MainContent from '../../components-blog/Latest';
import Latest from '../../components-blog/Latest111';
import Footer from '../../components/Footer';
import CreateProduct from '../../components-admin-schop/admin-schop';


export default function PanelShopAdmin(props) {
    return (
        <AppTheme {...props}>
          <CssBaseline enableColorScheme />
          <AppAppBar />
          <Container
            maxWidth="lg"
            component="main"
            sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
          >
            <CreateProduct />
          </Container>
          <Footer />
        </AppTheme>
    );
}