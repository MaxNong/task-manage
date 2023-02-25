export interface ResponseType {
  data: object;
  code: number;
  message: string;
}

export interface TableResponseType {
  data: {
    current_page: number;
    data: object[];
    page_size: number;
    total: number;
    last_page: number;
  };
  code: number;
  message: string;
}
