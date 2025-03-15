import prisma from "../config/Database.js";
export const uploadBlog = async (req, res) => {
    try {
        const { title, content, imgUrl } = req.body;
        const user = req.user; // Assuming `req.user` contains authenticated user info

        // Validate required fields
        if (!title || !content) {
            return res.status(400).json({ status: 400, message: "Title and content are required" });
        }

        if (!user || !user.id) {
            return res.status(401).json({ status: 401, message: "User not authenticated" });
        }

        if(user.role === "ADMIN"){
            const newBlog = await prisma.blog.create({
                data: {
                    title,
                    content,
                    imageUrl: imgUrl || undefined, // Use the default value if not provided
                    authorId: user.id, // Required field
                },
            });
    
            res.status(200).json({ status: 200, message: "Blog uploaded successfully", newBlog });
        }else{
            res.json({
                status:402,
                message:"you cant create blog as user"
            })
        }
       
    } catch (error) {
        console.error("Error uploading blog:", error);
        res.status(400).json({ status: 400, message: "Not able to upload blog", error: error.message });
    }
};

export const editBlog = async (req, res) => {
    try {
        const { title, content, imageUrl } = req.body; // Use `imageUrl` instead of `imgUrl`
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ status: 400, message: "Blog ID is required" });
        }

        // Check if the blog exists
        const existingBlog = await prisma.blog.findUnique({
            where: { id },
        });

        if (!existingBlog) {
            return res.status(404).json({ status: 404, message: "Blog not found" });
        }

        // Update the blog
        const editedBlog = await prisma.blog.update({
            where: { id },
            data: {
                title: title || existingBlog.title, // Keep existing value if not provided
                content: content || existingBlog.content,
                imageUrl: imageUrl || existingBlog.imageUrl, // Use correct field name
            },
        });

        return res.status(200).json({
            status: 200,
            message: "Blog updated successfully",
            editedBlog,
        });
    } catch (error) {
        console.error("Error updating blog:", error);
        return res.status(500).json({
            status: 500,
            message: "Not able to update blog",
            error: error.message,
        });
    }
};

export const deleteBlog = async (req, res)=>{
    try {
        const id = req.params.id
        const deletedBlog = await prisma.blog.delete({
            where:{
                id
            }
        })
        res.json({
            status:200,
            message:"blog deleted successfully"
        })
    } catch (error) {
        res.json({
            status:400,
            message:"not able to delete blogpost"
        })
    }
   
}

export const allBlog = async(req, res)=>{
    try {
        // const {author} = req.body
        const {authorId} = req.query
         const totalBlog = await prisma.blog.findMany({
             where:{
               authorId 
             }
         })
         res.json({
             status:200,
             message:"all blogs fetched sucesfuly",
             totalBlog
         })  
    } catch (error) {
       res.json({
        status:400,
        message:"not able to fetch blogs",
        error
       }) 
    }
  
}