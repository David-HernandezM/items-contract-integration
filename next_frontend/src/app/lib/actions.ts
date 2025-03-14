'use server';

import axios from 'axios';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { resolve } from 'path';
import { z } from 'zod';
import { Backend_URL } from './Constants';

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
        const response = await axios.post('http://localhost:8000/auth/register', {username, password});
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