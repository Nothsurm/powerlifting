import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from 'bcryptjs';


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

export default {
    createUser
}