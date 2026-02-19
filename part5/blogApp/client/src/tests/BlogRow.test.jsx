import BlogRow from "../components/BlogRow";
import { render, screen } from '@testing-library/react'
import { expect, describe, test, beforeEach, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import blogService from "../services/blogService";

// mocking the blogService module
vi.mock('../services/blogService');

const blog = {
  title: 'yodelei',
  url: "www.yodel.com",
  likes: 238,
  author: {
    name: 'yoda',
    username: 'sdvadfvafvaefvefv'
  }
}

const partialSearch = {exact: false}

const openDetails = async () => {
    //click details button:
    const button = screen.getByText("details", partialSearch)
    const user = userEvent.setup()
    await user.click(button)
    return user
}

const mockSetBlog = vi.fn();

describe('Testing BlogRow', () => {
  beforeEach(() => {
    render(<BlogRow blog={blog} setBlog={mockSetBlog}/>)
  })

  test('renders author and title but not url or likes', () => {
    // renders title and author:
    screen.getByText(blog.title, partialSearch)
    screen.getByText(blog.author.name, partialSearch)

    // does not render url and like:
    const url = screen.queryByText(blog.url, partialSearch)
    const likes = screen.queryByText("likes", partialSearch)
    expect(url).toBeNull()
    expect(likes).toBeNull()
  })

  test('renders url and likes when details are shown', async () => {
    await openDetails()
    screen.getByText(blog.url, partialSearch)
    screen.getByText('likes', partialSearch)
  })

  test('like button calls blogService and sets blog', async () => {
    const user = await openDetails();

    const likeButton = screen.getByText('like');
    await user.click(likeButton);
    await user.click(likeButton);
    expect(blogService.likeBlog).toHaveBeenCalledTimes(2);
    expect(mockSetBlog).toHaveBeenCalledTimes(2)
  })
})
