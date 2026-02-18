
const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const manyblogs = require('./blogs_data').manyBlogs;

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('empty list', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

 
 test('many blogs', () => {
    const result = listHelper.totalLikes(manyblogs)
    assert.strictEqual(result, 36)
  })


})