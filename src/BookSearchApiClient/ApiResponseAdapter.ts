import type { AxiosResponse } from "axios";

export abstract class ApiResponseAdapter {
  abstract adapt<T>(response: AxiosResponse<T>): T;
}

export class XmlResponseAdapter extends ApiResponseAdapter {
  adapt<T>(response: AxiosResponse<T>): T {
    // Use an XML parsing library to parse response.data
    // and return the result.
    return response.data;
  }
}
