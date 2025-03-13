import prisma from "../config/Database.js"

export const createUser =async (req, res)=>{
  const {username,email, password, role} = req.body
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
      password,
      role
    }
  })
  return res.json({status:200, message:"user created", newUser})

}

