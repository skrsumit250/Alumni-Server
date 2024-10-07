import { User_collection } from "../UserModel.js"

export const addUserData = async(req,res) => {
    const {formData,uid} = req.body

    if (!uid || !formData) {
        return res.status(400).json({ message: 'Missing required data' });
    }
    try {
        const newUser = await User_collection.create({
            uid: uid,
            name: formData.name,
            email: formData.email,
            degree: formData.degree,
            YearOfGraduation: formData.YearOfGraduation,
            phone: formData.phone,
            location: formData.location,
            linkedin: formData.linkedin,
            education: formData.education,
            work: formData.work
        })

        newUser.save()

        return res.status(200).json({
            newUser,
            message: "New user created successfully"
        })

    } catch (error) {
        console.log("error in adding user",error)
        return res.status(401).json({
            error: error.message,
            message: "Something went wrong in creating the user"
        })
    }
}

export const findUser = async(req,res) => {
    const {uid} = req.body
    console.log(typeof(uid))
    try {
        const user = await User_collection.find({uid: uid})

        if(user){
            return res.status(200).json({
                user,
                message: "Found User Successfully"
            })
        }

        return null

    } catch (error) {
        console.log("error in adding user",error)
        return res.status(401).json({
            error: error.message,
            message: "Something went wrong in FindUser"
        })
    }

}