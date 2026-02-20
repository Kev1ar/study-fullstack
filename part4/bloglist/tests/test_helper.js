const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'This is a test blog',
    author: 'Shoyo-Kun',
    url: 'http://www.testblog.com',
    likes: 0
  },
  {
    title: 'Another test blog',
    author: 'Another Author',
    url: 'http://www.anotherblog.com',
    likes: 5
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb,
}