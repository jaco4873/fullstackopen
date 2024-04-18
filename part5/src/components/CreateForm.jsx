import React, { useState } from 'react'
import blogsService from '../services/blogs'


const CreateForm = ( { setErrorMessage, setSuccessMessage, onBlogAdded } ) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        const blogData = {
            title: title,
            author: author,
            url: url
        }

        try {
            const response = await blogsService.create(blogData)
            console.log(response)
            if (response.status === 201) {
                setTitle('')
                setAuthor('')
                setUrl('')
                setSuccessMessage(`A new blog ${title} by ${author} added`)
                setTimeout(() => {
                    setSuccessMessage(null)
                }, 5000)
                onBlogAdded()
            } else {
                throw new Error(`Server responded with status: ${response.status}`)
            }
        } catch (error) {
            setErrorMessage(`Failed to add blog: ${error.message || 'Unknown error'}`)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    return (
    <>
        <h2>create new</h2>
        <form onSubmit={handleSubmit}>
            <div>
            <label>
                title:
                <input
                type="text"
                value={title}
                name="title"
                onChange={({ target }) => setTitle(target.value)}
                />
            </label>
            </div>
            <div>
            <label>
                author:
                <input
                type="text"
                value={author}
                name="author"
                onChange={({ target }) => setAuthor(target.value)}
                />
            </label>
            </div>
            <div>
            <label>
                url:
                <input
                type="url"
                value={url}
                name="url"
                onChange={({ target }) => setUrl(target.value)}
                />
            </label>
            </div>
            <br />
            <button type="submit">create</button>
        </form>
    </>
    )
}

export default CreateForm
