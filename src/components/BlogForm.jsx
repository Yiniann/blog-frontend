import PropTypes from 'prop-types'

const BlogForm = ({
  addBlog,
  newBlogTitle,
  newBlogAuthor,
  newBlogUrl,
  setNewBlogTitle,
  setNewBlogAuthor,
  setNewBlogUrl
}) => {
  return (
    <form className="blog-form" onSubmit={addBlog}>
      <div className="blog-input-group">
        <label>Title</label>
        <input
          type="text"
          placeholder="Enter blog title"
          value={newBlogTitle}
          onChange={({ target }) => setNewBlogTitle(target.value)}
        />
      </div>
      <div className="blog-input-group">
        <label>Author</label>
        <input
          type="text"
          placeholder="Enter author name"
          value={newBlogAuthor}
          onChange={({ target }) => setNewBlogAuthor(target.value)}
        />
      </div>
      <div className="blog-input-group">
        <label>URL</label>
        <input
          type="text"
          placeholder="Enter blog URL"
          value={newBlogUrl}
          onChange={({ target }) => setNewBlogUrl(target.value)}
        />
      </div>
      <button type="submit" className="blog-button">Add Blog</button>
    </form>
  )
}

BlogForm.propTypes = {
  addBlog : PropTypes.func.isRequired,
  newBlogTitle : PropTypes.string.isRequired,
  newBlogAuthor : PropTypes.string.isRequired,
  newBlogUrl : PropTypes.string.isRequired,
  setNewBlogTitle : PropTypes.func.isRequired,
  setNewBlogAuthor : PropTypes.func.isRequired,
  setNewBlogUrl : PropTypes.func.isRequired
}

export default BlogForm
