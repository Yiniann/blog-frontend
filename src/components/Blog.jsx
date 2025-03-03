import { useState } from 'react'

const Blog = ({ blog }) => {
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
            Like: {blog.likes} <button>like</button>
          </p>
          <p>{blog.author}</p>
        </>
      )}
    </div>
  )
}

export default Blog
