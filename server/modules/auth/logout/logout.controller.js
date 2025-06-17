import User from "../../../shared/models/user.model.js"
import AppError from "../../../shared/utils/appError.js";

export const logoutUser = async (req, res, next ) => {
    const data = req.user 

    try {
        const user = await User.findOne({username:data.username})

        if(!user){
            throw new AppError("User not found",404);
        }

        user.refreshToken = ''
        await user.save()
        const options = {
            httpOnly:true,secure:process.env.NORE_ENV === 'production',sameSite:'lax'
        }

        res.clearCookie('refreshToken',options)

        return res.status(200).json({message:'logged out successfully'})
    } catch (error) {
        next(error)
    }
}