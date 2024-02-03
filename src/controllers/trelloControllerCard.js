const TrelloServiceCard = require("../services/TrelloServiceCard")
const Board = require("../models/Board");
const List = require("../models/List")
const Card = require("../models/Card")

class trelloControllerCard{   

    createCard = async (req, res, next) => {  
        try { 
            const  {cardName,desCard,dueDate,avatar,cardMember} = req.body
            const idList = req.body.idList

            let dataCard = {
                cardName: cardName,
                desCard: desCard,
                dueDate: dueDate,
                avatar: {
                    originalname : req.files[0].originalname,
                    Buffer: req.files[0].buffer
                },
                cardMember: cardMember
            } 
            const trelloCard = await TrelloServiceCard.createCard(idList,dataCard)
            if(trelloCard){ 
                res.status(200).json({
                    message: "Tao Card thanh cong",
                    trelloCard
                })
            }else{
                res.status(404).json({
                    message: "Tao Card that bai"
                })
            }
        } catch (error) { 
            throw error
        }
    }

    getAllCard = async (req, res, next) => {  
        try {
            const idList = req.query.idList;
            const Cards = await TrelloServiceCard.getAllCard(idList)
            if(Cards){
                res.status(200).json({
                    message : "Danh sach card: ",
                    Cards
                })
            }
            else{
                res.status(404).json({
                    message : "List nay chua tao card nao!"
                })
            }
        } catch (error) { 
            throw error
        }
    }
    // update + post -> body , delete + get query
    updateCard = async (req, res, next) => {   
        try { 
            const idCard = req.body.idCard
            const cardName = req.body.cardName

            const result = await TrelloServiceCard.updateCard(idCard,cardName)
            if(result){
                res.status(200).json({
                    'msg' : 'Cap nhat thanh cong'
                })
            }else{
                throw new Error("Cap nhat that bai")
            }
        } catch (error) { 
            throw error
        }
    }

    deleteCard = async (req, res, next) => { 
        try {
            let  _id  = req.query._id
            let result = await TrelloServiceCard.deleteCard(_id)
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

module.exports = new trelloControllerCard();