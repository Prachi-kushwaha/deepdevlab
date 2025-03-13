import prisma from "../config/Database.js"

export const getProfile = async (req, res) => {
  try {
    const allUsers = await prisma.User.findMany();
    console.log("All Users:", allUsers);
    console.log(req.body);
    const { email } = req.body;
    console.log(email);
    if (!email) {
      return res.status(400).json({
        status: 400,
        message: "Email is required to fetch your profile",
      });
    }
    const user = await prisma.User.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    return res
      .status(200)
      .json({ status: 200, message: "Profile fetched successfully", user });
  } catch (error) {
    res.json({ status: 400, message: "not able to fetch your profle", error });
  }
};
