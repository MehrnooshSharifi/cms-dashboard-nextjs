/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from "@testing-library/react";
import UsersPage from "../../users/page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";

describe("UsersPage Component", () => {
  const createTestClient = () =>
    new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders user list", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [
          { id: 1, name: "Ali", email: "ali@example.com" },
          { id: 2, name: "Sara", email: "sara@example.com" },
        ],
        total: 2,
        page: 1,
        limit: 10,
      }),
    });

    const client = createTestClient();

    render(
      <QueryClientProvider client={client}>
        <UsersPage />
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.getByText("Ali")).toBeInTheDocument();
      expect(screen.getByText("Sara")).toBeInTheDocument();
    });
  });
});
