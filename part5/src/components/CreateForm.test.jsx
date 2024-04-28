import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateForm from './CreateForm'
import blogsService from '../services/blogs'

vi.mock('../services/blogs', () => ({
  default: {
    create: vi.fn(),
  },
}))

describe('CreateForm Component', () => {
  let setErrorMessage, setSuccessMessage, onBlogAdded

  beforeEach(() => {
    setErrorMessage = vi.fn()
    setSuccessMessage = vi.fn()
    onBlogAdded = vi.fn()
  })

  test('should create a new blog with correct values', async () => {
    const newBlog = { title: 'Jacob is testing', author: 'Jacob', url: 'http://jacobsurl.com' }
    blogsService.create.mockResolvedValue({ status: 201 })

    render(<CreateForm setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage} onBlogAdded={onBlogAdded} />)

    // Open the form
    userEvent.click(screen.getByText('new blog'))

    // Fill the form
    await userEvent.type(screen.getByPlaceholderText('write title here'), newBlog.title)
    await userEvent.type(screen.getByPlaceholderText('write author here'), newBlog.author)
    await userEvent.type(screen.getByPlaceholderText('write url here'), newBlog.url)

    // Submit the form
    userEvent.click(screen.getByText('create'))

    // Await for the form submission
    await waitFor(() => {
      expect(blogsService.create).toHaveBeenCalledWith(newBlog)
      expect(setSuccessMessage).toHaveBeenCalledWith(`A new blog ${newBlog.title} by ${newBlog.author} added`)
      expect(onBlogAdded).toHaveBeenCalled(1)
    })
  })
})
