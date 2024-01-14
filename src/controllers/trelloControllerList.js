const TrelloServiceList = require("../services/TrelloServiceList")
const Board = require("../models/Board");

class trelloControllerList{   
    createList = async (req, res, next) => { 
        try {
            const  {listName,position,Cards} = req.body
            const idBoard = req.body.idBoard

            let dataList = {
                listName: listName,
                position: position,
                Cards: Cards,
                lists : []
            }
            const trelloList = await TrelloServiceList.createList(idBoard,dataList)
            res.status(200).json({
                trelloList
            })
        } catch (error) { 
            throw error
        }
    } 

    getAllList = async (req, res, next) => { 
        try {
            const idBoard = req.body.idBoard;
            console.log("idBoard ne 12312312",idBoard)
            const result = await TrelloServiceList.getAllList(idBoard)
            res.status(200).json({
                result
            })
        } catch (error) { 
            throw error
        }
    }

    updateList = async (req, res, next) => {  
        try {
            const idList = req.body._id
            const  listName = req.body.listName
            const result = await TrelloServiceList.updateList(idList,listName)
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

    deleteList = async (req, res, next) => { 
        try {
            const idList = req.query._id
            let result = await TrelloServiceList.deleteList(idList)
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

module.exports = new trelloControllerList();