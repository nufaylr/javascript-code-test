import axios, { type AxiosResponse } from "axios";
import { xml2js } from "xml-js";
import { z } from "zod";
import {
  createBookSearchApiClient,
  ApiResponseAdapter,
} from "./BookSearchApiClient";

/**
 * ==== Example 1 : Fetch books by author rest api ====
 * */

// Define the schema for the book data
const bookAuthorSchema = z.array(
  z.object({
    id: z.number(),
    title: z.string(),
    author: z.string(),
    isbn: z.string(),
    price: z.number(),
  })
);

// Inter the type of the book
type Book = z.infer<typeof bookAuthorSchema>;

// Create Axios instance for author search
const axiosInstance = axios.create({
  baseURL: "https://books.free.beeceptor.com",
});

// Define the search query
const authorSearchQuery = "/author?authorName=jkr&limit=10&format=json";

// Create an instance of the BookSearchApiClient
const bookSearchApiClient = createBookSearchApiClient(
  bookAuthorSchema,
  axiosInstance
);

// Fetch books by author
async function fetchBooksByAuthor() {
  const booksByAuthor = await bookSearchApiClient.getBooksByAuthor<Book>(
    authorSearchQuery
  );
  console.log("resp api output:", booksByAuthor);
}

fetchBooksByAuthor();

/**
 * ==== Example 2 : Fetch books by author api response with xml payload ====
 * */

// Define the schema for the book data
const xmlAuthorSchema = z.any();

// Inter the type of the book
type xmlBook = z.infer<typeof xmlAuthorSchema>;

// Create Axios instance for author search
const xmlAxiosInstance = axios.create({
  baseURL: "https://books.free.beeceptor.com",
});

// Define the search query
const authorLeacyApiSearchQuery = "/author?authorName=jkr&limit=10&format=xml";

// Create an adapter for the XML response
class XmlResponseAdapter extends ApiResponseAdapter {
  adapt<T>(response: AxiosResponse<T>): T {
    const transformToXmltoJs = xml2js(response.data as string) as T;
    return transformToXmltoJs;
  }
}
const xmlResponseAdapter = new XmlResponseAdapter();

// Create an instance of the BookSearchApiClient
const bookSearchXmlApiClient = createBookSearchApiClient(
  xmlAuthorSchema,
  xmlAxiosInstance,
  xmlResponseAdapter
);

// Fetch books by author
async function fetchFromXmlBooksByAuthor() {
  const booksByAuthor = await bookSearchXmlApiClient.getBooksByAuthor<xmlBook>(
    authorLeacyApiSearchQuery
  );
  console.log("xml api output:", booksByAuthor);
}

fetchFromXmlBooksByAuthor();
