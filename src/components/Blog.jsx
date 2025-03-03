import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  //like处理
  const handleLike = async () => {
    try {
      console.log(`Liking blog with ID: ${blog.id}`) // 确保 ID 正确
      const updatedBlog = { ...blog, likes: blog.likes + 1 } // 增加 likes
      const returnedBlog = await blogService.update(blog.id, updatedBlog)
  
      // 更新前端 state
      setBlogs((prevBlogs) =>
        prevBlogs.map((b) => (b.id === blog.id ? returnedBlog : b))
      )
    } catch (error) {
      console.error('Error updating likes:', error)
    }
  }
  
  


  return (
    <div style={blogStyle}>
      <p>
        <strong>{blog.title}</strong> 
        <button onClick={toggleVisibility} style={{ marginLeft: 10 }}>
          {visible ? 'hide' : 'view'}
        </button>
      </p>

      {visible && (
        <>
          <p>{blog.url}</p>
          <p>
            Like: {blog.likes} <button onClick={handleLike}>like</button>
          </p>
          <p>{blog.author}</p>
        </>
      )}
    </div>
  )
}

export default Blog
