'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import axios from 'axios';

const LoginUserForm = z.object({
    username: z.string(),
    password: z.string()
});

export const cancelRegister = async () => {
    revalidatePath('/');
    redirect('/');
}

export const registerUser = async (formData: FormData) => {
    const { username, password } = LoginUserForm.parse({
        username: formData.get('username'),
        password: formData.get('password')
    });

    try {
        const response = await axios.post('http://localhost:8000/auth/register', {username, password});
    } catch (e) {
        console.log(e);
        return {
            message: 'error'
        }
    }

    revalidatePath('/');
    redirect('/');
};

export const loginUser = async (formData: FormData) => {
    const { username, password } = LoginUserForm.parse({
        username: formData.get('username'),
        password: formData.get('password')
    });

    try {
        const response = await axios.post('http://localhost:8000/auth/login', {username, password});
        console.log(response.data);
    } catch (e) {
        console.log(e);
        return {
            message: 'error'
        }
    }

    revalidatePath('/');
    redirect('/');
};