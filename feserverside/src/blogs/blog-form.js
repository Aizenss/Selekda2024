import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function BlogForm({ onSubmit, blog, onCancel }) {
    const Api = axios.create({
        //set default endpoint API
        baseURL: 'http://localhost:8000'
    })
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        author: "",
        tags: "",
    });

    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const { useEffect } = React;
    useEffect(() => {
        if (blog) {
            setFormData({
                blogtitle: blog.blogtitle,
                description: blog.description,
                author: blog.author,
                tags: blog.tags,
            });
        }
    }, [blog]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = blog ? `http://127.0.0.1:8000/api/blog/${blog.id}` : "http://127.0.0.1:8000/api/blog";
        const method = blog ? "PUT" : "POST";
        await Api.request({ url, method, data: formData })
            .then((res) => {
                onSubmit(res.data);
            })
            .catch(error => {
                setErrors(error.response.data);
            })
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input
                    type="text"
                    name="blogtitle"
                    value={formData.blogtitle}
                    onChange={handleChange}
                    required
                />
                {
                    errors.title && (
                        <div className="alert alert-danger mt-2">
                            {errors.title[0]}
                        </div>
                    )
                }
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
                {
                    errors.description && (
                        <div className="alert alert-danger mt-2">
                            {errors.description[0]}
                        </div>
                    )
                }
            </div>
            <div className="form-group">
                <label>Author</label>
                <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                />
                {
                    errors.author && (
                        <div className="alert alert-danger mt-2">
                            {errors.author[0]}
                        </div>
                    )
                }
            </div>
            <div className="form-group">
                <label>Tags</label>
                <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    required
                />
                {
                    errors.tags && (
                        <div className="alert alert-danger mt-2">
                            {errors.tags[0]}
                        </div>
                    )
                }
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>
                Cancel
            </button>
        </form>
    );
}

