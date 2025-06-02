export interface ProductDTO {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  status?: boolean;
  updatedAt?: string;
  createdAt?: string; 
}

 interface Meta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export interface ApiData<T> {
  data: T[];
  meta: Meta;
};
