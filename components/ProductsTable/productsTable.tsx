"use client";

import { useState, useEffect } from "react"
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId } from '@mui/x-data-grid';
import { ProductDTO } from "@/data/dtos/products";
import { deleteProduct, getProducts } from "@/data/api/HttpClient";
import { useAuthStore } from "@/store/authStore";
import { useProductStore } from "@/store/ProductStore";
import ProductForm from "./productForm";
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { toast } from "react-toastify";

function ProductsTable() {
    const token = useAuthStore((state) => state.token);
    const products = useProductStore((state) => state.products);
    const total = useProductStore((state) => state.total);
    const setProducts = useProductStore((state) => state.setProducts);
    const removeProduct = useProductStore((state) => state.removeProduct);

    const [updateProduct, setUpdateProduct] = useState<ProductDTO | null>(null);

    const [open, setOpen] = useState(false);

    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

    useEffect(() => {
        if (!token) return;

        try {
            getProducts(token, paginationModel.page + 1, paginationModel.pageSize).then((res) => {
                setProducts(res.data.data, res?.data.meta.total);
            });
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error('Failed to get products: ' + e.message);
            } else {
                toast.error('Failed to get products: Unknown error');
            }
        }

    }, [token, setProducts, paginationModel]);

    const handleDelete = async (id: GridRowId) => {
        if (token !== null) {
            try {
                deleteProduct(id);
                removeProduct(id);
                toast.success('Product deleted successfully');
            } catch (e: unknown) {
                if (e instanceof Error) {
                    toast.error('Failed to delete: ' + e.message);
                } else {
                    toast.error('Failed to delte: Unknown error');
                }
            }
        }
    };

    const handleEdit = async (data: ProductDTO) => {
        setOpen(true);
        setUpdateProduct(data);
    }

    const columns: GridColDef<ProductDTO>[] = [
        { field: 'title', headerName: 'Title', flex: 1, width: 150 },
        { field: 'description', headerName: 'Description', flex: 2, width: 150 },
        { field: 'status', headerName: 'Status', flex: 3, width: 50 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 150,
            getActions: (params) => [
                <GridActionsCellItem
                    key={params.id}
                    icon={<PencilIcon className="size-5" />}
                    label="Edit"
                    onClick={() => handleEdit(params.row)}
                    showInMenu
                />,
                <GridActionsCellItem
                    key={params.id}
                    icon={<TrashIcon className="size-5" />}
                    label="Delete"
                    onClick={() => handleDelete(params.id)}
                    showInMenu
                />
            ]
        }
    ];

    return (
        <div style={{ width: '100%', maxWidth: 1000, margin: 'auto' }}>
            <DataGrid
                rows={products}
                columns={columns}
                pagination
                paginationMode="server"
                rowCount={total}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[5, 10, 20]}
                getRowId={(row) => row.id}
            />

            {open && <ProductForm isOpen product={updateProduct} onClose={() => setOpen(false)} />}
        </div>
    );
}


export default ProductsTable;