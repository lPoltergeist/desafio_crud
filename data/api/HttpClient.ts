import api from "../../lib/api";
import { SignupRequestDTO } from "../dtos/createUser";
import { GridRowId } from "@mui/x-data-grid";

export const login = (email: string, password: string) => api.post("/auth/login", { email, password });

export const createUser = (data: SignupRequestDTO) => api.post("/users", data);

export const getProducts = (token: string, page: number, pageSize: number) => {
    return api.get("/products",
        {
            headers: { Authorization: `Bearer ${token}` },
            params: { page, pageSize }
        });
}

export const createProduct = async (title: string, description: string, thumbnail: string, token: string) => {
  const response = await api.post("/products", { title, description, thumbnail }, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};


export const deleteProduct = (id: GridRowId, token: string) => {
    api.delete(`/products/${id}`,
        {
            headers:
            {
                Authorization: `Bearer ${token}`
            }
        })
}

export const updateProduct = (id: GridRowId, title: string, description: string, token: string) => api.put(`/products/${id}`, { title, description },
    {
        headers:
        {
            Authorization: `Bearer ${token}`
        }
    }
);

export const updateThumbnail = (id: GridRowId, thumbnail: string | File, token: string) => {
  console.log('token:', token, 'id', id, 'thumbnail', thumbnail);
  return api.patch(
    `/products/thumbnail/${id}`,
    { thumbnail },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      }
    }
  );
};


