import React, { useState } from 'react'
import blogsService from '../services/blogs'


const CreateForm = ( { setErrorMessage, setSuccessMessage, onBlogAdded } ) => {
    const [createFormVisible, setCreateFormVisible] = useState(false)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const hideWhenVisible = { display: createFormVisible ? 'none' : '' }
    const showWhenVisible = { display: createFormVisible ? '' : 'none' }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const blogData = {
            title: title,
            author: author,
            url: url
        }

        // Logic to refetcb blogs and update UI on new blog creation
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
        <br />
        <div style={hideWhenVisible}>
          <button onClick={() => setCreateFormVisible(true)}>new blog</button>
        </div>
        <div style={showWhenVisible}>
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
            <button onClick={() => setCreateFormVisible(false)}>cancel</button>
        </div>
    </>
    )
}

export default CreateForm
