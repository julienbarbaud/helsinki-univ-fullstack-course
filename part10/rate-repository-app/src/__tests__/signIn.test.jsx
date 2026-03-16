import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { LoginViewContainer } from "../components/LoginView";

jest.mock("@react-native-async-storage/async-storage", () => {});

describe("Login view", () => {
  it("calls submit function properly", async () => {
    const mockSubmit = jest.fn();
    const mockUser = { username: "Odin", password: "4llf4ther" };

    render(<LoginViewContainer handleSubmit={mockSubmit} />);
    fireEvent(
      screen.getByPlaceholderText("username"),
      "changeText",
      mockUser.username,
    );
    fireEvent(
      screen.getByPlaceholderText("password"),
      "changeText",
      mockUser.password,
    );
    fireEvent(screen.getByText("Log in"), "press");

    await waitFor(() => expect(mockSubmit).toHaveBeenCalled());
    expect(mockSubmit.mock.calls[0][0]).toEqual(mockUser);
  });
});
