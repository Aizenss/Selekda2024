import React, { useState } from "react";
import BlogList from "./blog-list";
import BlogForm from "./blog-form";
import Modal from "./modal";
import axios from "axios";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const Api = axios.create({
    baseURL: 'http://localhost:8000'
})
  const openModal = (blog) => {
    setCurrentBlog(blog);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentBlog(null);
    setIsModalOpen(false);
  };

  const handleCreateOrUpdateBlog = (newBlog) => {
    if (currentBlog) {
      // Edit Blog
      setBlogs(
        blogs.map((blog) =>
          blog.id === currentBlog.id ? { ...newBlog, id: currentBlog.id } : blog
        )
      );
    } else {
      // Create Blog
      setBlogs([...blogs, { ...newBlog, id: Date.now() }]);
    }
    closeModal();
  };

  const handleDeleteBlog = async (id) => {
    await Api.delete(`/api/blogs/${id}`)
      .then(() => {
        setBlogs(blogs.filter((blog) => blog.id !== id));
      });
  };
  return (
    <div className="App">
      <h1>Blog Management</h1>
      <button onClick={() => openModal(null)}>Create Blog</button>
      <BlogList blogs={blogs} onEdit={openModal} onDelete={handleDeleteBlog} />
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <BlogForm
            onSubmit={handleCreateOrUpdateBlog}
            blog={currentBlog}
            onCancel={closeModal}
          />
        </Modal>
      )}
    </div>
  );
}

export default Blog;
