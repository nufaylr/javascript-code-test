import axios from "axios";
import { z } from "zod";
// Define the schema for the book data
const bookAuthorSchema = z.object({
  id: z.number(),
  title: z.string(),
  author: z.string(),
  isbn: z.string(),
  price: z.number(),
});

type Book = z.infer<typeof bookAuthorSchema>;

// Create Axios instance for author search
const axiosInstance = axios.create({
  baseURL: "https://book-seller.free.beeceptor.com",
});
const authorSearchQuery = `/by-author?authorName=jkr&limit=10&format=json`;
