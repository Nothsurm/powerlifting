import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

import { createUser } from '@/api/UsersApi';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const formSchema = z.object({
    username: z.string().min(5, 'Username must be at least 5 characters'),
    email: z.string().email({
        message: "Invalid email address"
    }),
    password: z.string().min(5, 'Password must be at least 5 characters')
})

export type UserData = z.infer<typeof formSchema>

export default function SignUpForm() {
    const { createUser: createNewUser, isPending } = createUser()
    const [visible, setVisible] = useState(false)

    const form = useForm<UserData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        }
    })
    

    async function onSubmit(values: UserData) {
        await createNewUser({
            username: values.username, 
            email: values.email, 
            password: values.password
        })
    }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 bg-zinc-100 p-10 text-zinc-800 rounded-lg'>
        <Link to='/' className='text-3xl font-bold'>
            <span className='text-blue-500'>POWER</span>LIFTING
        </Link>
        <p className='flex justify-center text-2xl'>Welcome</p>
            <FormField 
                control={form.control}
                name='username'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input 
                                type='text' 
                                placeholder='John Doe' 
                                {...field} 
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}    
            />
            <FormField 
                control={form.control}
                name='email'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input type='email' placeholder='Johndoe@email.com' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}    
            />
            <FormField 
                control={form.control}
                name='password'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <div className="flex items-center gap-2">
                            <Input 
                                type={visible ? 'text' : 'password'}
                                placeholder='*******' 
                                {...field} 
                            />
                            <button type='button' onClick={() => setVisible(!visible)}>
                                { visible ? (
                                    <FaRegEye />
                                ) : (
                                    <FaRegEyeSlash />
                                )}
                            </button>
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}    
            />
            {isPending ? (
                <Button type='submit' disabled={isPending} className='bg-blue-500 hover:bg-blue-600 w-full'>
                    Signing Up...
                </Button>
            ) : (
                <Button type='submit' className='bg-blue-500 hover:bg-blue-600 w-full'>
                    Sign Up
                </Button>
            )}
            <div className="flex gap-2 text-sm">
                <p>Already have an account?</p>
                <Link to='/signin' className='text-blue-500 hover:underline'>
                    Sign In
                </Link>
            </div>
            <Separator />
            <Button className='w-full'>
                Continue with Google
            </Button>
        </form>
    </Form>
  )
}
