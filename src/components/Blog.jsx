import { useState } from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog, setBlogs, user }) => {
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
  
  //删除博客处理
  const handleDelete = async() =>{
    const confirmDelete = window.confirm(`Remove blog"${blog.title}" by ${blog.author}?`)
    if (!confirmDelete) return
    try {
      await blogService.remove(blog.id) // 调用删除 API
      setBlogs(prevBlogs => prevBlogs.filter(b => b.id !== blog.id)) // 更新前端状态
    } catch (error) {
      console.error('Error deleting blog:', error)
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
           {/* 只有当前用户才可以看到删除按钮 */}
          {user && blog.user && user.username === blog.user.username && (
            <button onClick={handleDelete} style={{ background: 'red', color: 'white' }}>
              delete
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default Blog
