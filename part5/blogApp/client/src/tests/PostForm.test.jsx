import { screen, render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import PostForm from "../components/PostForm";
import userEvent from "@testing-library/user-event";
import blogService from "../services/blogService";

// mocking blogService
vi.mock('../services/blogService')

const input = {title: 'cool title', url: 'www.url.com'}

describe('testing new blog form', () => {
  test('submits form data correctly', async () => {
    const mockSetNotif = vi.fn();
    const mockBlogState = { blogs: [], setBlogs: vi.fn()}
    blogService.postBlog.mockResolvedValue({title: 'mock title'})
    render(<PostForm setNotif={mockSetNotif} blogState={mockBlogState}/>)

    const titleInput = screen.getByLabelText('title:', {selector: 'input'})
    const urlInput = screen.getByLabelText('url:', {selector: 'input'})
    const submitButton = screen.getByRole('button')

    const user = userEvent.setup()
    await user.type(titleInput, input.title)
    await user.type(urlInput, input.url)
    await user.click(submitButton)

    expect(mockSetNotif).toHaveBeenCalled()
    expect(mockBlogState.setBlogs).toHaveBeenCalled()
    expect(blogService.postBlog).toHaveBeenCalledWith(undefined, input.title, input.url)
  })
})
