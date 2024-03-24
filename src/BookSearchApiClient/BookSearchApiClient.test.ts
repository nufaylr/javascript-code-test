import axios, { type AxiosResponse, type AxiosHeaders } from "axios";
import { ZodSchema, z } from "zod";

import { createBookSearchApiClient } from "./BookSearchApiClient";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const bookAuthorSchema: ZodSchema<unknown> = z.object({
  title: z.string(),
  author: z.string(),
});
type Book = z.infer<typeof bookAuthorSchema>;

describe("BookSearchApiClient", () => {
  it("returns books by author", async () => {
    const authorSearchQuery = `/by-author?authorName=jkr&limit=10&format=json`;
    const createBookInstance = createBookSearchApiClient(
      bookAuthorSchema,
      mockedAxios
    );

    const mockReturnbooks = [
      { title: "Book 1", author: "Author 1" },
      { title: "Book 2", author: "Author 2" },
    ];
    mockedAxios.get.mockResolvedValueOnce({ data: mockReturnbooks });
    const result = await createBookInstance.getBooksByAuthor(authorSearchQuery);

    expect(result).toEqual(mockReturnbooks);
    expect(mockedAxios.get).toHaveBeenCalledWith(authorSearchQuery);
  });
  it("returns empty array when request fails", async () => {
    const createBookInstance = createBookSearchApiClient(
      bookAuthorSchema,
      mockedAxios
    );

    mockedAxios.get.mockRejectedValueOnce(new Error("Network error"));
    const result = await createBookInstance.getBooksByAuthor("no-query");

    expect(result).toEqual([]);
  });
  it("throws error when schema validation fails", async () => {
    const authorSearchQuery = `/any-endpoint`;
    const createBookInstance = createBookSearchApiClient(
      bookAuthorSchema,
      mockedAxios
    );
    const mockReturnWithInvalidSchema = [
      { title: "Book 1", author: "Author 1" },
      { wrongKey: "Book 2", author: 123123123 },
    ];
    mockedAxios.get.mockResolvedValueOnce({
      data: mockReturnWithInvalidSchema,
    });

    const result = await createBookInstance.getBooksByAuthor(authorSearchQuery);
    expect(result).toEqual([]);
  });
});
