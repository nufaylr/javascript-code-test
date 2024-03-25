# Javascript Code Test

`BookSearchApiClient` is a simple class that makes a call to a http API to retrieve a list of books and return them.

You need to refactor the `BookSearchApiClient` class, and demonstate in `example-client.js` how it would be used. Refactor to what you consider to be production ready code. You can change it in anyway you would like and can use javascript or typescript.

Things you will be asked about:

1. How could you easily add other book seller APIs in the the future
2. How woud you manage differences in response payloads between differnt APIs without needing to make future changes to whatever code you have in example-client.js
3. How would you implement different query types for example: by publisher, by year published etc
4. How your code would be tested

## Getting Started with Development

After cloning the Git repository, follow these steps to run the examples locally:

1. Install the dependencies: Run `npm install` in the root directory of the project.

2. Transform TypeScript files into JavaScript modules by running the build script`npm run build`

3. Run the examples: Run `node example-client.js` in the root directory of the project. This will fetch books by author from the JSON API and the XML API, and log the results to the console.

**Important**: The current API endpoints are set to a mock API via [beeceptor.com](https://app.beeceptor.com/console/books). Before running the examples, please update these endpoints to point to the actual APIs you intend to use. Additionally, ensure that the schema is updated to match the structure of the data returned by your APIs.

## Testing

You can run the tests for the `BookSearchApiClient` by running `npm test` in the root directory of the project.

## Extending the `BookSearchApiClient`

The `BookSearchApiClient` is designed to be easily extensible:

1. **Adding other book seller APIs**: To add other book seller APIs in the future, create a new Axios instance with the base URL of the new API, and use it to create a new `BookSearchApiClient`.

2. **Managing differences in response payloads**: To manage differences in response payloads between different APIs, create a new `ApiResponseAdapter` that transforms the response data into a format that your client code can work with.

For more details on how to extend the `BookSearchApiClient`, please refer to the `example-client.ts` file.

## Validating Data with Zod

The `BookSearchApiClient` uses [zod](https://zod.dev/) to validate the data returned by the APIs. Zod schemas are used to define the shape and content of the data. When the data is received, it is validated against the schema using Zod's `parse` method. If the data does not match the schema, Zod will throw an error.

To validate the data from a new API, you will need to define a new Zod schema that matches the structure of the data. You can then use this schema when creating the `BookSearchApiClient` for the new API.

For more details on how to use Zod for data validation, please refer to the Zod documentation and the `example-client.ts` file.
