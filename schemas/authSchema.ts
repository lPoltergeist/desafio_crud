import {z} from 'zod';

const loginSchema = z.object({
    email: z.string().email({message: "Invalid email"}),
    password: z.string().min(8, {message: "Password must be at least 8 characters"})
});

const registerSchema = z.object({
    name: z.string().min(3, {message: "Name must be at least 3 characters"}), 
    email: z.string().email({message: "Invalid email"}), 
    password: z.string().min(8, {message: "Password must be at least 8 characters"}), 
    verifyPassword: z.string().min(8, {message: "Password must be at least 8 characters"}), 
    phone: z.object({
        country: z.string().min(2, {message: "Country must be at least 2 characters"}), 
        ddd: z.string().min(2, {message: "DDD must be at least 2 characters"}), 
        number: z.string().min(8, {message: "Number must be at least 8 characters"})
    })
}).refine((data) => data.password === data.verifyPassword, {
    message: "Passwords do not match",
    path: ["verifyPassword"]
});

export {loginSchema, registerSchema};