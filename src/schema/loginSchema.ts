import * as zod from "zod"

export const LogineSchema = zod.object({

    email: zod.string().nonempty('ewmail is required').regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        , 'invalid email'),

    password: zod.string()
        .nonempty('password is required')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,32}$/,
            'Password must have 1 uppercase, 1 lowercase, 1 number & 1 special character'
        ),

})