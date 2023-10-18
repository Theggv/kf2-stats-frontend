import { type AxiosResponse, isAxiosError } from 'axios';

type SuccessResponse<T> = {
  type: 'success';
  data: T;
};

type ErrorResponse = {
  type: 'error';
  status: string;
  message: string;
};

type TransformedResponse<T> = SuccessResponse<T> | ErrorResponse;

export async function transformAxiosResponse<T>(
  promise: Promise<AxiosResponse<T, any>>
): Promise<TransformedResponse<T>> {
  try {
    const { data } = await promise;

    return { data: data, type: 'success' };
  } catch (error) {
    if (isAxiosError(error))
      return {
        status: JSON.stringify(error.response?.status),
        message: JSON.stringify(error.response?.data),
        type: 'error',
      };
    return { status: '400', message: JSON.stringify(error), type: 'error' };
  }
}
