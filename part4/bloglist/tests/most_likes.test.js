const { test, describe } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')

const blogs = require('./blogs_data').manyBlogs;

describe('most blogs for author', () => {
    test('when list is empty, return null', () => {
        const result = listHelper.authorWithMostLikes([])
        assert.strictEqual(result, null)
    })

    test('large list, return author with the most blogs', () => {
        const result = listHelper.authorWithMostLikes(blogs)
        const correct = {
            author: "Edsger W. Dijkstra",
            likes: 17
        }
        assert.deepStrictEqual(result, correct)
    })

})