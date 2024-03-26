export interface ServiceResponseModel<T> {
  data: T;
  message: string;
  success: boolean;
}
