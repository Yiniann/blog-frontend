import { useState, useEffect, useRef} from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification' 
import BlogForm from './components/BlogForm'
import Togglabel from './components/Togglabel'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css';


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({ message: null, type: '' }) //统一管理通知
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  //新博客表单处理
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
      blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
    },[])


  // 检查本地存储中的登录信息
  useEffect(() => {
    const loggedInUserJSON = localStorage.getItem('loggedBlogappUser')
    if (loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON)
      setUser(loggedInUser)
      blogService.setToken(loggedInUser.token)//重新设置token
    }
  }, []) // 该 effect 只在组件挂载时执行

  


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      localStorage.setItem('loggedBlogappUser', JSON.stringify(user)) // 保存用户信息到本地存储
      setNotification({ message: 'Login successful', type: 'success' })//登录成功通知
    } catch (exception) {
      setNotification({ message: 'Wrong credentials', type: 'error' })//登录失败通知
    }
    setTimeout(() => setNotification({ message: null, type: '' }), 5000)//设置通知时间，重置通知栏
    console.log('loggedBlogappUser', username)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('loggedBlogappUser') // 退出时清除本地存储
    setNotification({ message: 'Logged out', type: 'success' })//登出成功提示
    setTimeout(() => setNotification({ message: null, type: '' }), 5000)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      likes: 0
    }

    try {
      const addedBlog = await blogService.create(newBlog)
      const blogWithUser = {...addedBlog, user}
      setBlogs(blogs.concat(blogWithUser)) // 更新博客列表
      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')
      setNotification({ message: `Blog "${addedBlog.title}" added!`, type: 'success' })//成功增加博客
      blogFormRef.current.toggleVisibility()//成功添加博客后隐藏表单
    } catch (exception) {
      setNotification({ message: 'Failed to add blog', type: 'error' })//增加博客失败提示
    }
    setTimeout(() => setNotification({ message: null, type: '' }), 5000)
  }
  //更新博客
  const updateBlog = (updatedBlog) => {
    setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
  }

  // 如果 user 为 null，显示登录表单
  if (user === null) {
    return (
      <div className="auth-wrapper">
        <div className="login-box">
          <h2>Log in to application</h2>
          <Notification message={notification.message} type={notification.type} />
          <div className="login-container">
            <form onSubmit={handleLogin}>
              <div>
                Username
                <input
                  type="text"
                  value={username}
                  name="Username"
                  onChange={({ target }) => setUsername(target.value)}
                />
              </div>
              <div>
                Password
                <input
                  type="password"
                  value={password}
                  name="Password"
                  onChange={({ target }) => setPassword(target.value)}
                />
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="app-container">
      <h2>Blogs</h2>
      <Notification message={notification.message} type={notification.type} />
  
      {/* 欢迎用户和登出按钮 */}
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
  
      {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user={user} />
      )}
    </div>
  )
}

export default App
