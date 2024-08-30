import { useState, useEffect } from 'react';
import './blog-list.css';

export default function BlogList({ onEdit, onDelete }) {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/blog');
            const json = await response.json();
            setData(json.data);
        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            {error && <p>{error}</p>}
            <table className="blog-list">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Author</th>
                        <th>Tags</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((blog) => (
                            <tr key={blog.id}>
                                <td>{blog.blogtitle}</td>
                                <td>{blog.description}</td>
                                <td>{blog.author}</td>
                                <td>{blog.tags}</td>
                                <td>
                                    <button className="edit" onClick={() => onEdit(blog)}>
                                        Edit
                                    </button>
                                    <button className="delete" onClick={() => onDelete(blog.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No blogs found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}


