const TrelloService = require("../services/TrelloService")
const Board = require("../models/Board");
 
class trelloController{   
    createBoard = async (req, res, next) => { 
        try {
            const  {boardName,desBoard,lists,avatar} = req.body

                let dataBoard = {
                    boardName: boardName,
                    desBoard: desBoard,
                    lists: lists,
                    avatar: {
                        originalname : req.files[0].originalname,
                        Buffer: req.files[0].buffer
                    }  
                } 
                const result = await TrelloService.createBoard(dataBoard)
                console.log(result)
                if(result){ 
                    res.status(200).json({
                        message: "Tao Board thanh cong",
                        result 
                    })
                }else{
                    res.status(400).json({
                        message: "Tao Board that bai"
                    })
                }
            
        } catch (error) { 
            throw error
        }
    }

    getAllBoard = async (req, res, next) => { 
        try {
            const boards = await TrelloService.getAllBoard() 
            if(boards){
                res.status(200).json({
                    message : "Danh sach cac board:",
                    boards : boards
                })
            }
            else{
                res.status(404).json({
                    message : "Chua tao board nao"
                })
            } 
        } catch (error) { 
            throw error
        }
    }

    updateBoard = async (req, res, next) => {  
        try {
            const  {boardName,desBoard,lists,avatar} = req.body
            const id = req.body.idBoard
            let dataBoard = {
                boardName: boardName,
                desBoard: desBoard,
                lists: lists,
                avatar: {
                    originalname : req.files[0].originalname,
                    Buffer: req.files[0].buffer
                }
            }
            const result = await TrelloService.updateBoard(id, dataBoard)
            if(result){
                res.status(200).json({
                    'message' : 'Cap nhat thanh cong'
                })
            }else{
                throw new Error("Cap nhat that bai")
            }
        } catch (error) { 
            throw error
        }
    }

    deleteBoard = async (req, res, next) => { 
        try {
            const id = req.query.idBoard
            console.log("id na",id)
            const result = await TrelloService.deleteBoard(id)
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
 
module.exports = new trelloController();