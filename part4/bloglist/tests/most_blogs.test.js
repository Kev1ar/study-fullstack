const { test, describe } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')

const blogs = require('./blogs_data').manyBlogs;

describe('most blogs for author', () => {
    test('when list is empty, return null', () => {
        const result = listHelper.mostBlogs([])
        assert.strictEqual(result, null)
    })

    test('large list, return author with the most blogs', () => {
        const result = listHelper.mostBlogs(blogs)
        const correct = {
            author: "Robert C. Martin",
            blogs: 3
        }
        console.log(result)
        assert.deepStrictEqual(result, correct)
    })

})