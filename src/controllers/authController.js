const loginAccount = require("../models/Account") 

const jwt = require('jsonwebtoken')

class authController{   
    login = async (req, res, next) => { 
        try {
            var username = req.body.username
            var password = req.body.password

            loginAccount.findOne({
                username:username,
                password:password
            })
            .then(data=>{
                if(data){
                    const token = jwt.sign({data},process.env.SECRET_KEY_JWT)
                    return res.status(200).json({
                        message : 'Dang nhap thanh cong',
                        token : token
                    })
                }else{
                    res.status(400).json('Dang nhap that bai')
                }
            })

        } catch (error) { 
            throw error
        }
       
    }
    
    register = async (req, res, next) => { 
        try {
            let username = req.body.username
            let password = req.body.password
            console.log(username,password)

            loginAccount.findOne({
                username:username,
            })
            .then(data=>{
                if(data){
                    res.json('Nguoi dung nay da ton tai')
                }else{
                    return loginAccount.create({
                        username:username,
                        password:password
                    })  
                }
            })
            .then(data=>{
                return res.json('Tao tai khoan thanh cong')
            })
            .catch(err=>{
                return res.status(500).json('Tao tai khoan that bai')
            })
        } catch (error) { 
            throw error
        }
       
    }
    
}
module.exports = new authController();