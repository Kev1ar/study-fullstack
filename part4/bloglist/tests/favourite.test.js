const { test, describe } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')

const blogs = require('./blogs_data').manyBlogs;

describe('favourite blog', () => {
    test('when list is empty, return null', () => {
        const result = listHelper.favouriteBlog([])
        assert.strictEqual(result, null)
    })

    const correctBlog = {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    }

    const result = listHelper.favouriteBlog(blogs)
    test('of many blogs the ccorrect blog is chosen', () => {
            assert.deepStrictEqual(result, correctBlog)
    })

})