import type { AxiosResponse } from "axios";

export abstract class ApiResponseAdapter<T> {
  abstract adapt(response: AxiosResponse<T>): T;
}

export class XmlResponseAdapter<T> extends ApiResponseAdapter<T> {
  adapt(response: AxiosResponse<T>): T {
    // Use an XML parsing library to parse response.data
    // and return the result.
    return response.data;
  }
}
