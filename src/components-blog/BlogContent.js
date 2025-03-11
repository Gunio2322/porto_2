import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import DOMPurify from 'dompurify';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';



const SyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: (theme.vars || theme).palette.background.paper,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
}));

const SyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

// function Author({ authors }) {
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'row',
//         gap: 2,
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         padding: '16px',
//       }}
//     >
//       <Box
//         sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
//       >
//         <AvatarGroup max={3}>
//           {/* {authors.map((author, index) => (
//             <Avatar
//               key={index}
//               alt={author.name}
//               src={author.avatar}
//               sx={{ width: 24, height: 24 }}
//             />
//           ))} */}
//         </AvatarGroup>
//         <Typography variant="caption">
//           {/* {authors.map((author) => author.name).join(', ')} */}
//         </Typography>
//       </Box>
//       <Typography variant="caption">July 14, 2021</Typography>
//     </Box>
//   );
// }

// Author.propTypes = {
//   authors: PropTypes.arrayOf(
//     PropTypes.shape({
//       avatar: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//     }),
//   ).isRequired,
// };

export function Search() {
  return (
    <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: 'text.primary' }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search',
        }}
      />
    </FormControl>
  );
}

export default function BlogContent() {

  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);

  const handleFocus = (index) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const handleClick = (post) => {
    navigate(`/post/${post.slug}/${post._id}`);
  };

  const truncateDescription = (description, maxLength) => {
    if (!description) return ''; // Sprawdzenie, czy description jest zdefiniowane
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '... czytaj więcej...';
    }
    return description;
  };



  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/getPosts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // const sortedPosts = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        // setPosts(sortedPosts.slice(0, 3));
        setPosts(data)
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);



  return (


    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>





      <Grid container spacing={6} columns={12}>
        {posts?.map((post) =>
  





          <Grid onClick={() => handleClick(post)}  size={{ xs: 12, md: 4 }}>
            {/* <Link to={`/post/${post._id}`} > */}
            {/* <div key={post.slug}></div> */}
              <SyledCard
                variant="outlined"
                onFocus={() => handleFocus(5)}
                onBlur={handleBlur}
                tabIndex={0}
                className={focusedCardIndex === 5 ? 'Mui-focused' : ''}
                sx={{ height: '100%' }}
              >
                <CardMedia
                  component="img"
                  alt="green iguana"
                  src={post.featuredImageUrl}
                  sx={{
                    height: { sm: 'auto', md: '50%' },
                    aspectRatio: { sm: '16 / 9', md: '' },
                  }}
                />
                <SyledCardContent>
                  <Typography gutterBottom variant="caption" component="div">
                    {post.date}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    {post.title}
                  </Typography>
                  <Typography
                  gutterBottom variant="span" component="div" >                   {truncateDescription(post.description, 100)}

                  </Typography>
                  <StyledTypography  variant="body2" color="text.secondary" gutterBottom>

                  </StyledTypography>
                </SyledCardContent>
                {/* <Author author={post.author} /> */}
              </SyledCard>
            {/* </Link> */}
          </Grid>

        )}

      </Grid>


    </Box>
  );
}
