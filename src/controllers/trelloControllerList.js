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
            if(trelloList){ 
                res.status(200).json({
                    message: "Tao list thanh cong",
                    trelloList
                })
            }else{
                res.status(404).json({
                    message: "Tao list that bai"
                })
            }
        } catch (error) { 
            throw error
        }
    } 

    getAllList = async (req, res, next) => { 
        try { 
            const idBoard = req.body.idBoard;
            const result = await TrelloServiceList.getAllList(idBoard)
            if(result){
                res.status(200).json({
                    message : "danh sach list: ",
                    result
                })
            }
            else {
                res.status(404).json({
                    message : "Board nay chua tao list nao!"
                })
            }
        } catch (error) { 
            throw error
        }
    }
    
    updateList = async (req, res, next) => {  
        try {
            const idList = req.body._id 
            const listName = req.body.listName 
            const result = await TrelloServiceList.updateList(idList,listName)
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
    // xóa thì sẽ cập nhật lại board  
    deleteList = async (req, res, next) => { 
        try {
            const idList = req.query._id 
            let result = await TrelloServiceList.deleteList(idList)
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
 
module.exports = new trelloControllerList();