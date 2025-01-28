import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from '../components/AppAppBar';
import MainContent from '../components-blog/MainContent';
import Latest from '../components-blog/Latest';
import Footer from '../components/Footer';
import { Link } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
// const theme = createTheme({
//   components: {
//     MuiTypography: {
//       defaultProps: {
//         variantMapping: {
//           h1: 'h2',
//           h2: 'h2',
//           h3: 'h2',
//           h4: 'h2',
//           h5: 'h2',
//           h6: 'h2',
//           subtitle1: 'h2',
//           subtitle2: 'h2',
//           body1: 'span',
//           body2: 'span',
//         },
//       },
//     },
//   },
// });


export default function Post(props) {
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

        <Typography variant="h1" gutterBottom>
          h1. Heading
        </Typography>
        <Typography variant="body1" gutterBottom>
          Data
        </Typography>


        <Box
          component="img"

          sx={{

            height: 500,
            width: 'auto',
            maxHeight: { xs: 200, md: 500 },
            // loading: true
            // maxWidth: { xs: 350, md: 250 },
            lazy: true
          }}
          alt="The house from the offer."
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
        />


        <Typography variant="body1" component="span" sx={{ mt: 1 }}>
          The Typography component uses the variantMapping prop to associate a UI variant with a semantic element. It's important to realize that the style of a typography component is independent from the semantic underlying element.
          <span>
            The Typography component uses the variantMapping prop to associate a UI variant with a semantic element. It's important to realize that the style of a typography component is independent from the semantic underlying element.

          </span>

        </Typography>


      </Container>
      <Footer />
    </AppTheme>
  );
}
