const Notification = ({ message, type }) => {
  if (!message) {
    return null
  }

  const notificationStyle = {
    color: type === 'success' ? '#155724' : '#721c24',
    background: type === 'success' ? '#d4edda' : '#f8d7da',
    fontSize: 18,
    border: `2px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
    borderRadius: 8,
    padding: '12px 15px',
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    maxWidth: '500px',
    margin: '0 auto',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  }

  return <div style={notificationStyle}>{message}</div>
}

export default Notification
