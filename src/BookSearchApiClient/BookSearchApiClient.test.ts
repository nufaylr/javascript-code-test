import axios, { type AxiosResponse, type AxiosHeaders } from "axios";
import { ZodSchema, z } from "zod";

import { createBookSearchApiClient } from "./BookSearchApiClient";
import { XmlResponseAdapter } from "./ApiResponseAdapter";

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

    await expect(
      createBookInstance.getBooksByAuthor(authorSearchQuery)
    ).rejects.toThrow(
      "Error fetching books: Error: Schema validation failed with"
    );
  });

  describe("Response Adapter", () => {
    it("should correctly adapt a xml response", () => {
      const xmlResponseAdapter = new XmlResponseAdapter<Book>();
      const mockResponse: AxiosResponse<Book> = {
        data: "<book><id>1</id><title>Test Book</title><author>Test Author</author><isbn>1234567890</isbn><price>10.99</price></book>",
        status: 200,
        statusText: "OK",
        headers: {} as AxiosHeaders,
        config: {
          headers: {} as AxiosHeaders,
        },
      };
      const adaptedData = xmlResponseAdapter.adapt(mockResponse);

      expect(adaptedData).toEqual(
        "<book><id>1</id><title>Test Book</title><author>Test Author</author><isbn>1234567890</isbn><price>10.99</price></book>"
      );
    });
  });
});
