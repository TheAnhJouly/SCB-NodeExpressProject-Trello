const loginAccount = require("../models/Account") 
const bcryptjs = require("bcryptjs")

class authService{

    getUser = async () => {
        try {
            const users = await loginAccount.find()
            return users
        } catch (error) {
            throw error;
        }
    }

    updateUser = async (idUser,password) => {
        try {
            const hashPassword = await bcryptjs.hash(password,10)
            await loginAccount.updateOne({ _id: idUser }, { password: hashPassword });
            return true
        }
        catch (err) {
            throw err
        } 
    }

    deleteUser = async (_id) => { 
        try { 
            const user = await loginAccount.findById(_id)
            await user.deleteOne(); 
            return true;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new authService()