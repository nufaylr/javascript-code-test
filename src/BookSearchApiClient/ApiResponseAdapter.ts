import type { AxiosResponse } from "axios";

export abstract class ApiResponseAdapter {
  abstract adapt<T>(response: AxiosResponse<T>): T;
}
