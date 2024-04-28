import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content that includes title and author but not URL and likes', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    url: 'www.example.com',
    likes: 5,
    user: {
      name: 'test',
    },
    author: 'test'
  }

  const { container } = render(<Blog blog={blog} />)

  const element = container.querySelector('.blog')
  expect(element).toHaveTextContent('Component testing is done with react-testing-library')
  expect(element).toHaveTextContent('test')

  const details = container.querySelector('.details')
  expect(details).toHaveStyle('display: none')
})

test('clicking the button reveals URL and number of likes', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    url: 'www.example.com',
    likes: 5,
    user: {
      name: 'test',
      username: 'test'
    },
    author: 'Jacob'
  }

  const mockHandler = vi.fn()

  const { container } = render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const details = container.querySelector('.details')
  expect(details).toHaveStyle('display: block')
  expect(details).toHaveTextContent('www.example.com')
  expect(details).toHaveTextContent('5')
})

vi.mock('../services/blogs', () => ({
  default: {
    like: vi.fn(() => Promise.resolve({ status: 200 }))
  }
}))

test('clicking the like button twice calls event handler twice', async () => {

  const mockHandler = vi.fn()

  const blog = {
    title: 'Component testing is done with react-testing-library',
    url: 'www.example.com',
    likes: 5,
    user: {
      name: 'test',
      username: 'test',
      author: 'Jacob'
    }
  }

  // Since the mockHandler is passed as a prop to Blog component, it will not result in a database nor UI update. Therefore, both calls will bring the same result increasing likes from 5 to 6.
  render(<Blog blog={blog} onBlogAdded={mockHandler} />)
  screen.debug()

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler).toHaveBeenCalledTimes(2)
})