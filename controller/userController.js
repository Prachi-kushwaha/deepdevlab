
import prisma from "../config/Database.js"
import bcrypt from "bcrypt"
import { validatePassword } from "../utils/authUtils.js"
import { generateJWT } from "../utils/authUtils.js"

export const createUser =async (req, res)=>{
  try {
    const {username,email, password, role} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
  const findUser = await prisma.user.findUnique({
   where:{
    email
   }
  })
 

  if(findUser){
   return res.json({status:400, messsage:"this is already in use, please create account with another email"})
  }

  const newUser = await prisma.user.create({
    data:{
      username,
      email,
      password:hashedPassword,
      role
    }
  })

  const token = await generateJWT(newUser.id)

  res.cookie("token", token, {
    expires:new Date(Date.now()+8 * 3600000)
  } )



  return res.json({status:200, message:"user created", newUser})

  } catch (error) {
    res.json({
      status:400,
      message:"not able to create account",
      error
    })
  }
  
}

export const loginUser = async(req, res)=>{

   const {email, password,id} = req.body
   const user = await prisma.user.findUnique({
    where:{
      email
    }
   })
   console.log(user)
   if(!user){
    return res.json({
      status:400, 
      message:"user is not present"
    })
   }

   const isPasswordValid = await validatePassword(password, user.password)
   const token = await generateJWT(user.id);

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    return res.status(200).json({
      status: 200,
      message: "Login successful",
      user,
      token,
    });
}

export const logoutUser = async(req, res)=>{
  res.cookie("token", null,{
    expires:new Date(Date.now())
  })
  res.json({status:200, message:"logout successfully"})
}