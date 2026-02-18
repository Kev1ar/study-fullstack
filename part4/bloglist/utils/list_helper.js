const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if(blogs.length === 0)
        return 0
    let totalLikes = 0
    blogs.forEach(blog => {
        totalLikes += blog.likes
    })
    return totalLikes
}

const favouriteBlog = (blogs) => {
    if(blogs.length === 0)
        return null
    return blogs.reduce((prev, curr) => curr.likes > prev.likes ? curr : prev)
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null
    
    const authorMap = new Map()
    blogs.forEach(
        (blog) => authorMap.set(blog.author, (authorMap.get(blog.author) || 0 )+ 1)
    )

    let maxAuthor = { author: '', blogs: 0 };
    for (const [name, count] of authorMap) {
        if (count > maxAuthor.blogs) {
            maxAuthor = { author: name, blogs: count };
        }
    }
    return maxAuthor
}

const authorWithMostLikes = (blogs) => {
    if (blogs.length === 0) return null
    
    const authorMap = new Map()
    blogs.forEach(
        (blog) => authorMap.set(blog.author, (authorMap.get(blog.author) || 0 ) + blog.likes)
    )

    let maxAuthor = { author: '', likes: 0 };
    for (const [name, count] of authorMap) {
        if (count > maxAuthor.likes) {
            maxAuthor = { author: name, likes: count };
        }
    }
    return maxAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  authorWithMostLikes
}