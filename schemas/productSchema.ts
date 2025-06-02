import {z} from 'zod';

const ProductSchema = z.object({
    title: z.string({required_error: "Title is required"}).min(3, {message: "Title must be at least 3 characters"}),
    description: z.string({required_error: "Description is required"}).min(3, {message: "Description must be at least 3 characters"}),
});

export default ProductSchema;