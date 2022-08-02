import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


//bringing uuser model
import User from '../models/userModel.js'

const SECRET = 'Test123'

export const signup = async (req,res,next)=>{
    const {firstName, lastName, email,password} = req.body
    try{
        const oldUser = await User.findOne({email})
        if(oldUser){
            return res.status(400).json({
                message: 'User Already Exist'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await User.create({
            name: `${firstName}  ${lastName}`,
            email,
            password: hashedPassword
        })

        const token = jwt.sign({email: result.email , id: result._id} , SECRET, {expiresIn: '1h'})
        res.status(201).json({
            result, 
            token
        })
    }catch(err){
        res.status(500).json({
            message:'Something Went Wrong'
        })
    }
}


export const signin = async (req,res,next)=>{
    const { email , password} = req.body
    console.log(email)
    console.log(password)
    try{
        const oldUser = await User.findOne({email})
        console.log('this done')

        if(!oldUser){
            return res.status(404).json({
                message: 'User Not Registered'
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)
        console.log('this done 2')

        if(!isPasswordCorrect){
            return res.status(400).json({
                message:' Invalid Credentials '
            })
        }

        const token = jwt.sign({email: oldUser.email, id:oldUser.id}, SECRET, {expiresIn: '1h'})
        console.log('this done 3')
        res.status(200).json({
            message:'User Logged In Successfully',
            result: oldUser,
            token
        })
    }catch(err){
        res.status(500).json({
            message: 'Something Went Wrong'
        })
    }
}