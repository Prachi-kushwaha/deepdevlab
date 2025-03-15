import prisma from "../config/Database.js"

// export const getProfile = async (req, res) => {
//   try {
//     const allUsers = await prisma.User.findMany();
//     console.log("All Users:", allUsers);
//     console.log(req.body);
//     const { email } = req.body;
//     console.log(email);
//     if (!email) {
//       return res.status(400).json({
//         status: 400,
//         message: "Email is required to fetch your profile",
//       });
//     }
//     const user = await prisma.User.findUnique({
//       where: { email },
//     });
//     if (!user) {
//       return res.status(404).json({ status: 404, message: "User not found" });
//     }

//     return res
//       .status(200)
//       .json({ status: 200, message: "Profile fetched successfully", user });
//   } catch (error) {
//     res.json({ status: 400, message: "not able to fetch your profle", error });
//   }
// };

export const getProfileToken = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: "User not authorized" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error in getProfileToken:", error); // Debugging line

        res.status(400).json({
            status: 400,
            message: "User is not authorized",
            error: error.message || error, // Ensure we return some meaningful error
        });
    }
};

export const profileUpdate = async (req, res) => {
    const userId = req.params.id;
    const { username, email, password } = req.body;
  
    const updateduser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username,
        email,
        password,
      },
    });
  
    return res.json({ status: 200, message: "User updated successfully",updateduser  });
  };
  

