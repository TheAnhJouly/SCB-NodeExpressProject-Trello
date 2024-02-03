const loginAccount = require("../models/Account") 
const authService = require("../services/authService")
const bcryptjs = require("bcryptjs")
const jwt = require('jsonwebtoken')

class authController{   

    login = async (req, res, next) => { 
        try {
            let { username, password } = req.body
            const user = await loginAccount.findOne({username})
            if(!user){
                return res.status(404).json({message:'Khong tim thay user'})
            }else{
                const isPasswordValid = await bcryptjs.compare(password,user.password)
                if(!isPasswordValid){
                    return res.status(404).json({message:'Mat khau khong dung'})
                }
                if(user && isPasswordValid){
                    const token = jwt.sign({   
                        id: user._id, 
                        admin: user.admin
                    },
                    process.env.JWT_ACCESS_KEY,
                    {expiresIn: "30d"}
                    ) 
                    const {password,...others} = user._doc;
                    return res.status(200).json({message:'Dang nhap thanh cong',...others,token}) 
                }
            } 
        } catch (error) { 
            throw error
        }
       
    }
    
    register = async (req, res, next) => { 
        try {
            let { username, password } = req.body

            const existAccount = await loginAccount.findOne({
                username
            })
            if(existAccount){
                res.status(400).json({message: "Nguoi dung da ton tai"})
            }else{
                const hashPassword = await bcryptjs.hash(password,10)
                const newAccount = new loginAccount({ username,password:hashPassword })
                await newAccount.save()
                res.status(200).json({message: "Tao moi thanh cong",account:newAccount})
            }
        } catch (error) { 
            throw error
        }
       
    }

    getUser = async (req, res, next) => { 
        try {
            const Users = await authService.getUser() 
            if(Users){
                return res.status(200).json({
                    message : "Danh sach cac User:",
                    Users : Users
                })
            }
            else if(Users.length === 0){
                return res.status(404).json({
                    message : "Chua tao User nao"
                })
            }
        } catch (error) { 
            throw error
        }
    }

    updateUser = async (req, res, next) => {  
        try {
            const idUser = req.body.idUser
            const password = req.body.password
            const result = await authService.updateUser(idUser,password)
            if(result){
                return res.status(200).json({
                    'msg' : 'Cap nhat thanh cong'
                })
            }else{
                throw new Error("Cap nhat that bai")
            }
        }
        catch (err) {
            next(err);
        }
    }

    deleteUser = async (req, res, next) => { 
        try { 
            let  _id  = req.query.id
            let result = await authService.deleteUser(_id)
            if(result){
                res.status(200).json({'msg':'Xoa thanh cong'}) 
            }else{
                throw new Error('Xoa that bai')
            }
        } catch (error) { 
            throw error
        }
       
    }
    
}
module.exports = new authController();