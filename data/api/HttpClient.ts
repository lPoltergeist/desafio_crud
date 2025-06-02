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

export const createProduct = async (title: string, description: string, thumbnail: string) => {
  const response = await api.post("/products", { title, description, thumbnail }, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};


export const deleteProduct = (id: GridRowId) => {
    api.delete(`/products/${id}`)
}

export const updateProduct = (id: GridRowId, title: string, description: string) => api.put(`/products/${id}`, 
  { title, description }
);

export const updateThumbnail = (id: GridRowId, thumbnail: string | File) => {
  return api.patch(
    `/products/thumbnail/${id}`,
    { thumbnail },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }
  );
};


