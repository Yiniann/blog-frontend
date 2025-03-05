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
    <form onSubmit={addBlog}>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newBlogTitle}
          onChange={({ target }) => setNewBlogTitle(target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Author"
          value={newBlogAuthor}
          onChange={({ target }) => setNewBlogAuthor(target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="URL"
          value={newBlogUrl}
          onChange={({ target }) => setNewBlogUrl(target.value)}
        />
      </div>
      <button type="submit">Add Blog</button>
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
