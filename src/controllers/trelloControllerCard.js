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
            res.status(200).json({
                trelloCard
            })
        } catch (error) { 
            throw error
        }
    }

    getAllCard = async (req, res, next) => {  
        try {
            const idList = req.query.idList;
            const Cards = await TrelloServiceCard.getAllCard(idList)
            res.status(200).json({
                Cards
            })
        } catch (error) { 
            throw error
        }
    }
    // update + post -> body , delete + get query
    updateCard = async (req, res, next) => {   
        try {
            const idCard = req.body.idCard
            const  cardName = req.body.cardName

            const result = await TrelloServiceCard.updateCard(idCard,cardName)
            if(result){
                res.status(200).json({
                    'msg' : 'Updated'
                })
            }else{
                throw new Error("update fail")
            }
        } catch (error) { 
            throw error
        }
    }

    deleteCard = async (req, res, next) => { 
        try {
            let idCard = req.query.idCard
            let result = await TrelloServiceCard.deleteCard(idCard)
            if(result){
                res.status(200).json({'msg':'Deleted'})
            }else{
                throw new Error('Delete fail')
            }

        } catch (error) { 
            throw error
        }
    }
}

module.exports = new trelloControllerCard();