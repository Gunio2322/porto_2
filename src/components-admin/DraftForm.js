import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { v4 as uuidv4 } from 'uuid';
import slugify from "slugify";
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const CreatePost = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [imagePreview, setImagePreview] = useState('');
  const { control, handleSubmit, reset, watch } = useForm();
  const slug = slugify("")
  const unique_id = uuidv4();


  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const onSubmit = async (data) => {
    const slug = slugify(data.title)
    console.log(slug)
    const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    const postData = { ...data, content, slug: slug, _id: unique_id };

    try {
      const response = await fetch(`http://localhost:3001/api/newPost`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      reset(); // Resetowanie formularza po pomyślnym przesłaniu
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };

  // Watch for changes in the featuredImageUrl field and update the image preview
  const featuredImageUrl = watch('featuredImageUrl');
  useEffect(() => {
    setImagePreview(featuredImageUrl);
  }, [featuredImageUrl]);

  return (
    <div className="App">
      <header className="App-header">
        Create New Post
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>

        <Controller
          name="title"
          control={control}
          defaultValue=""
          rules={{ required: 'Title is required', maxLength: { value: 100, message: 'Title cannot exceed 100 characters' } }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!fieldState.error}
              helperText={fieldState.error ? fieldState.error.message : null}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          defaultValue=""
          // rules={{ required: 'Description is required', minLength: { value: 10, message: 'Description must be at least 10 characters' }, maxLength: { value: 70, message: 'Description cannot exceed 70 characters' } }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Description"


              multiline
              fullWidth
              rows={2}
              defaultValue="Default Value"
              margin="normal"
              variant="filled"
              error={!!fieldState.error}
              helperText={fieldState.error ? fieldState.error.message : null}
            />
          )}
        />

        <Controller
          name="category"
          control={control}
          defaultValue=""
          rules={{ required: 'Category is required' }}
          render={({ field, fieldState }) => (
            <FormControl variant="outlined" fullWidth margin="normal" error={!!fieldState.error}>
              <InputLabel>Category</InputLabel>
              <Select
                {...field}
                label="Category"
              >
                <MenuItem value="Technology">Technology</MenuItem>
                <MenuItem value="Health">Health</MenuItem>
                <MenuItem value="Finance">Finance</MenuItem>
              </Select>
              {fieldState.error && <p>{fieldState.error.message}</p>}
            </FormControl>
          )}
        />

        <Controller
          name="featuredImageUrl"
          control={control}
          defaultValue=""
          rules={{ required: 'Featured Image URL is required', pattern: { value: /^(ftp|http|https):\/\/[^ "]+$/, message: 'Invalid URL format' } }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Featured Image URL"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!fieldState.error}
              helperText={fieldState.error ? fieldState.error.message : null}
            />
          )}
        />

        {imagePreview && (
          <div style={{ margin: '20px 0' }}>
            <img src={imagePreview} alt="Featured Preview" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
        )}

        <div className="editor-wrapper">
          <Editor
            editorState={editorState}
            onEditorStateChange={handleEditorChange}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            placeholder="Write your content here..."
            editorStyle={{ border: '0.3px solid #332f2f', padding: '10px', minHeight: '100px', marginBottom: '30px' }}
            toolbarStyle={{ backgroundColor: '#000', border: '0.5px solid #332f2f', color: '#777 ', marginBottom: '10px', marginTop: '20px' }}
          />
        </div>

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;