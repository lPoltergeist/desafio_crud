import api from "../../lib/api";
import { SignupRequestDTO } from "../dtos/createUser";
import { GridRowId } from "@mui/x-data-grid";

export const login = (email: string, password: string) => api.post("/auth/login", { email, password });

export const createUser = (data: SignupRequestDTO) => api.post("/users", data);

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
};


export const getProducts = (token: string, page: number, pageSize: number) => {
  return api.get("/products",
    {
      headers: { Authorization: `Bearer ${token}` },
      params: { page, pageSize }
    });
}

export const createProduct = async (
  title: string,
  description: string,
  thumbnail: File | string
) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);

  if (thumbnail instanceof File) {
    formData.append("thumbnail", thumbnail);
  } else {
    formData.append("thumbnail", thumbnail);
  }

  const response = await api.post("/products", formData, {
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

export const updateThumbnail = (id: GridRowId, thumbnail: string | File | '') => {
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


