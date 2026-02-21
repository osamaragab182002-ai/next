import * as zod from "zod"

export const schema = zod.object({

    name: zod.string().nonempty('name is required').min(3, 'name min 3 char').max(5, 'name max 5 char'),

    email: zod.string().nonempty('ewmail is required').regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        , 'invalid email'),

    password: zod.string()
        .nonempty('password is required')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,32}$/,
            'Password must have 1 uppercase, 1 lowercase, 1 number & 1 special character'
        ),

    rePassword: zod.string().nonempty('repassword is required'),

     phone : zod.string().nonempty('phone is required').regex(/^(\+20|0)?1[0125]\d{8}$/, 'invalid is phone'),
    
}).refine((data) => data.password === data.rePassword, { path: ['rePassword'], message: "Passwords do not match" })