import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { useDispatch } from 'react-redux';

import { loginUser } from '@/api/UsersApi';
import { setCredentials } from '@/redux/features/authSlice';

const formSchema = z.object({
    email: z.string().email({
        message: "Invalid email address"
    }),
    password: z.string().min(5, 'Password must be at least 5 characters')
})

export type UserData = z.infer<typeof formSchema>

export default function SignInForm() {
    const dispatch = useDispatch()
    const { loginUser: loginNewUser, isPending } = loginUser()

    const form = useForm<UserData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    async function onSubmit(values: UserData) {
        await loginNewUser({
            email: values.email,
            password: values.password
        })
        dispatch(setCredentials({...values}))
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
                name='email'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input type='email' placeholder='Johndoe@email.com' {...field} className='text-zinc-800' />
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
                            <Input type='password' placeholder='*******' {...field} className='text-zinc-800' />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}    
            />
            <p className='text-sm text-blue-500 hover:underline'>Forgot Password?</p>
            <Button type='submit' className='bg-blue-500 hover:bg-blue-600 w-full'>
                Sign In
            </Button>
            <div className="flex gap-2 text-sm">
                <p className='text-sm'>Don't have an account?</p>
                <Link to='/signup' className='text-blue-500 hover:underline'>
                    Sign Up
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