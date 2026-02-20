const assert = require('node:assert') 
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const helper = require('./test_helper')
const Blog = require('../models/blog')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  const blogs = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('unique identifier property of blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
  blogs.forEach(blog => {
    assert.ok(blog.id)
  })
})


test('blogs can be created', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://test.com',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    assert.strictEqual((await helper.blogsInDb()).length, helper.initialBlogs.length + 1)
})

test('content of new blogs are saved correctly', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://test.com',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)  

  const blogsAtEnd = await helper.blogsInDb()
  const addedBlog = blogsAtEnd.find(b => b.title === 'Test Blog')

  assert.strictEqual(addedBlog.author, newBlog.author)
  assert.strictEqual(addedBlog.url, newBlog.url)
  assert.strictEqual(addedBlog.likes, newBlog.likes)
})



test('new blogs without likes default to 0 likes', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://test.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)  

  const blogsAtEnd = await helper.blogsInDb()
  const addedBlog = blogsAtEnd.find(b => b.title === 'Test Blog')

  assert.strictEqual(addedBlog.likes, 0)
})

test('400 error code when title is missing', async () => {
  const newBlog = {
    author: 'Test Author',
    url: 'http://test.com',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('400 error code when url is missing', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})


test('blog can be deleted', async () => {
  const blogs = await helper.blogsInDb()
  const idToDelete = blogs[0].id

  await api
    .delete(`/api/blogs/${idToDelete}`)
    .expect(204)
})

test('blog can be updated', async () => {
  const blogs = await helper.blogsInDb()
  const idToUpdate = blogs[0].id

  await api
    .put(`/api/blogs/${idToUpdate}`)
    .send({ ...blogs[0], likes: blogs[0].likes + 1 })
    .expect(204)
})

after(async () => {
  await mongoose.connection.close()
})