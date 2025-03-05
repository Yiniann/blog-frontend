import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import Togglabel from './components/Togglabel';
import blogService from './services/blogs';
import loginService from './services/login';
import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState({ message: null, type: '' });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('');
  const [newBlogUrl, setNewBlogUrl] = useState('');
  
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs);
    });
  }, []);

  useEffect(() => {
    const loggedInUserJSON = localStorage.getItem('loggedBlogappUser');
    if (loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON);
      setUser(loggedInUser);
      blogService.setToken(loggedInUser.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      setNotification({ message: 'Login successful', type: 'success' });
    } catch (exception) {
      setNotification({ message: 'Wrong credentials', type: 'error' });
    }
    setTimeout(() => setNotification({ message: null, type: '' }), 5000);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('loggedBlogappUser');
    setNotification({ message: 'Logged out', type: 'success' });
    setTimeout(() => setNotification({ message: null, type: '' }), 5000);
  };

  const addBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      likes: 0
    };

    try {
      const addedBlog = await blogService.create(newBlog);
      setBlogs([...blogs, { ...addedBlog, user }]);
      setNewBlogTitle('');
      setNewBlogAuthor('');
      setNewBlogUrl('');
      setNotification({ message: `Blog "${addedBlog.title}" added!`, type: 'success' });
      blogFormRef.current.toggleVisibility();
    } catch (exception) {
      setNotification({ message: 'Failed to add blog', type: 'error' });
    }
    setTimeout(() => setNotification({ message: null, type: '' }), 5000);
  };

  if (user === null) {
    return (
      <div className="auth-wrapper">
        <div className="login-box">
          <h2>Log in to application</h2>
          <Notification message={notification.message} type={notification.type} />
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>

            <button type="submit" className="login-button">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <h2>Blogs</h2>
      <Notification message={notification.message} type={notification.type} />

      <div className="user-info">
        <p className="welcome-message">Welcome, <span className="username">{user.name}</span>!</p>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>

      <Togglabel buttonLabel="Add a new blog" ref={blogFormRef}>
        <BlogForm
          addBlog={addBlog}
          newBlogTitle={newBlogTitle}
          newBlogAuthor={newBlogAuthor}
          newBlogUrl={newBlogUrl}
          setNewBlogTitle={setNewBlogTitle}
          setNewBlogAuthor={setNewBlogAuthor}
          setNewBlogUrl={setNewBlogUrl}
        />
      </Togglabel>

      <div className="blog-list">
        {blogs.sort((a, b) => b.likes - a.likes).map(blog => 
          <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user={user} />
        )}
      </div>
    </div>
  );
};

export default App;
