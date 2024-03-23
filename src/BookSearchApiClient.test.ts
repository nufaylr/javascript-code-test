import axios from "axios";
import { ZodSchema, z } from "zod";

import { createBookSearchApiClient } from "./BookSearchApiClient";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const bookAuthorSchema: ZodSchema<unknown> = z.object({
  title: z.string(),
  author: z.string(),
});
describe("BookSearchApiClient", () => {
  it("returns books by author", async () => {
  it("returns empty array when request fails", async () => {
  });
  it("throws error when schema validation fails", async () => {
  });
});
