import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { CircleUserRound } from 'lucide-react'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { Link, useNavigate } from 'react-router-dom'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { logout } from '@/redux/features/authSlice'

import { useLogoutMutation } from '@/redux/api/usersApiSlice'
import { useState } from 'react'
import { toast } from 'sonner'

export default function UsernameMenu() {
    const { userInfo } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    //const { logoutUser: logoutUserRequest, isPending } = logoutUser()
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate()

    const [logoutApiCall] = useLogoutMutation()

    const logoutCurrentUser = async () => {
        setLoading(true)
        try {
            dispatch(logout())
            await logoutApiCall().unwrap()
            toast.success('Successfully logged out')
            navigate('/')
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

  return (
    <DropdownMenu>
        <DropdownMenuTrigger className='flex items-center px-3 font-bold hover:text-blue-500 gap-2'>
            <CircleUserRound className='text-blue-500'/>
            {userInfo?.email}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem>
                <Link to='/' className='font-bold hover:text-blue-500'>
                    Dashboard
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Link to='/profile' className='font-bold hover:text-blue-500'>
                    Profile
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Link to='/' className='font-bold hover:text-blue-500'>
                    User Profile
                </Link>
            </DropdownMenuItem>
            <Separator />
            <DropdownMenuItem>
                <Button onClick={() => logoutCurrentUser()} disabled={isLoading} className='flex flex-1 bg-blue-500'>
                    { isLoading ? (
                        <p>Logging out...</p>
                    ) : (
                        <p>Log Out</p>
                    )}
                </Button>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
