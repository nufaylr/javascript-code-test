import type { AxiosInstance, AxiosResponse } from "axios";
import type { ZodSchema } from "zod";
import { ApiResponseAdapter } from "./ApiResponseAdapter";

/**
 * The createBookSearchApiClient function creates an instance of the BookSearchApiClient.
 * @param schema The Zod schema to validate the response data against.
 * @param axiosInstance An instance of Axios to make HTTP requests.
 * @param responseAdapter An optional adapter to transform the response data.
 */
function createBookSearchApiClient(
  schema: ZodSchema,
  axiosInstance: AxiosInstance,
  responseAdapter?: ApiResponseAdapter
) {
  async function getBooksByAuthor<BookAuthorType>(
    searchQuery: string
  ): Promise<BookAuthorType[]> {
    return fetchBooks<BookAuthorType>(searchQuery);
  }

  async function fetchBooks<BookType>(endpoint: string): Promise<BookType[]> {
    try {
      const response: AxiosResponse<BookType[]> = await axiosInstance.get(
        endpoint
      );
      let data = response.data;

      if (responseAdapter instanceof ApiResponseAdapter) {
        data = responseAdapter.adapt(response);
      }
      const validatedData = validateData<BookType>(data);
      return validatedData;
    } catch (error) {
      throw new Error(`Error fetching books: ${error}`);
    }
  }

  function validateData<BookType>(data: BookType[]): BookType[] {
    const validationResult = schema.safeParse(data);
    if (!validationResult.success) {
      throw new Error(
        `Schema validation failed with ${validationResult.error}`
      );
    }
    return data;
  }

  return {
    getBooksByAuthor,
  };
}

export { createBookSearchApiClient };
