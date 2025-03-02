import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Editor } from 'react-draft-wysiwyg';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useParams, useNavigate } from 'react-router-dom';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function EditPost() {
    const [data, setData] = useState({});
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const { _id } = useParams();
    const navigate = useNavigate();
    const { control, handleSubmit, reset, watch } = useForm();

    useEffect(() => {
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
                // console.log(response)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const json = await response.json();

                const contentState = convertFromRaw(JSON.parse(json.title));
                console.log(contentState)
                setEditorState(EditorState.createWithContent(contentState));
                setData(json);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchFilter();
    }, [_id]);

    const handleEditorChange = (state) => {
        setEditorState(state);
    };

    async function onSubmit(data) {
        const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        const editPrevent = { title: data.title || '', content: content, _id: data._id, date: data.date || new Date() };

        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editPrevent)
        };

        try {
            const response = await fetch(`http://localhost:3001/api/putPost/${_id}`, requestOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log(result);
            reset(); // Resetowanie formularza po pomyślnym przesłaniu
            navigate(`/post/${_id}`);
        } catch (err) {
            console.error(err);
            alert("HTTP-Error: " + err.message);
        }
    }

    // Watch for changes in the featuredImageUrl field and update the image preview
    const [imagePreview, setImagePreview] = useState('');
    const featuredImageUrl = watch('featuredImageUrl');
    useEffect(() => {
        setImagePreview(featuredImageUrl);
    }, [featuredImageUrl]);

    return (
        <>
            <h3>Update Record</h3>
            <div>
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
                        rules={{ required: 'Description is required', minLength: { value: 10, message: 'Description must be at least 10 characters' }, maxLength: { value: 100, message: 'Description cannot exceed 100 characters' } }}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Description"
                                variant="outlined"
                                fullWidth
                                margin="normal"
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
        </>
    );
}

export default EditPost;