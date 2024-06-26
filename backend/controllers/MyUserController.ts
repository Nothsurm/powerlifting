import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from 'bcryptjs';
import createToken from "../utils/createToken";


const createUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        throw new Error('Please fill in all inputs')
    }

    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400).send('User already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new User({ username, email, password: hashedPassword })

    try {
        await newUser.save()
        res.status(200).json(newUser.toObject())
    } catch (error) {
        throw new Error('Something went wrong')
    }
}

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new Error('Please fill in all the inputs.')
    }

    const existingUser = await User.findOne({ email })

    if (!existingUser) {
        throw new Error("Email doesn't exist")
    }

    if (existingUser) {
        const isPasswordValid = await bcrypt.compare(password, existingUser.password)

        if (!isPasswordValid) {
            throw new Error('Password is incorrect')
        } else {
            createToken(res, existingUser._id)

            res.status(201)
            .json({
                _id: existingUser._id, 
                username: existingUser.username, 
                email: existingUser.email, 
                isAdmin: existingUser.isAdmin,
            });
            return;
        }
    }
};

const logoutUser = async (req: Request, res: Response) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    })
    res.status(200).json({ message: 'Logout successfull'})
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body
        const user = await User.findById(req.user)

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        user.username = username
        if (password) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            user.password = hashedPassword
        }
        
        await user.save()
        res.send(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating User' })
    }
}

export default {
    createUser,
    loginUser,
    logoutUser,
    updateUser
}