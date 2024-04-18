import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const formSchema = z.object({
    username: z.string().min(5, 'Username must be at least 5 characters'),
    email: z.string().email({
        message: "Invalid email address"
    }),
    password: z.string().min(5, 'Password must be at least 5 characters')
});

export type UserFormData = z.infer<typeof formSchema>


export default function Profile() {
    const { userInfo } = useSelector((state: RootState) => state.auth)
    const [visible, setVisible] = useState(false)

    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: userInfo
    });

    const onSave = async () => {

    }
  return (
    <div className="flex flex-col justify-center">
        <div className="max-w-7xl mx-auto mt-64 bg-gray-50 p-10 rounded-lg shadow-md">
            <h1 className="text-3xl text-center">Profile</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSave)}
                    className="space-y-4 mt-10"
                >
                <div>
                    <FormDescription>
                        View and change your profile information
                    </FormDescription>
                </div>
                <FormField 
                    control={form.control} 
                    name="email" 
                    render={({field}) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input {...field} disabled className='bg-white'/>
                        </FormControl>
                    </FormItem>
                )}/>
                <FormField 
                    control={form.control} 
                    name="username" 
                    render={({field}) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input {...field} className='bg-white'/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
                <FormField 
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Change Password</FormLabel>
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
                <Button type="submit" className='bg-blue-500 hover:bg-blue-600 w-full'>
                    Update
                </Button>
                </form>
            </Form>
        </div>
    </div>
  )
}
