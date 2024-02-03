const jwt = require('jsonwebtoken')

const VerifyAdmin = {
     
    verifyToken: (req,res,next)=>{
        const token = req.headers['x-access-token'] || req.headers['authorization'];
        if(token){
            const accessToken = token.replace(/^Bearer\s+/, "");
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, async (err, user) => {
                if (err) {
                    return res.status(403).json("Token không hợp lệ");
                }
                req.user = user; 
                next();
            });       
        }else{
            return res.status(401).json("Bạn chưa được xác thực");
        }
    },
  
    verifyTokenAndAdminAuth : (req,res,next) =>{
        VerifyAdmin.verifyToken(req,res,()=>{
            if(req.user.id == req.query.id || req.user.admin){
                next()
            }else{
                return res.status(403).json("Ban khong co quyen sua hoac xoa user")
            }
        })
    }
}

module.exports = VerifyAdmin;