import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { CircleUserRound } from 'lucide-react'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { Link } from 'react-router-dom'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { logout } from '@/redux/features/authSlice'

import { logoutUser } from '@/api/UsersApi';

export default function UsernameMenu() {
    const { userInfo } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    const { logoutUser: logoutUserRequest, isPending } = logoutUser()

    const logoutCurrentUser = async () => {
        dispatch(logout())
        await logoutUserRequest()
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
                <Link to='/' className='font-bold hover:text-blue-500'>
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
                <Button onClick={() => logoutCurrentUser()} disabled={isPending} className='flex flex-1 bg-blue-500'>
                    { isPending ? (
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
