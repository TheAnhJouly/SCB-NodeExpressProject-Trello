const TrelloService = require("../services/TrelloService")

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

            const trelloBoard = await TrelloService.createBoard(dataBoard)
            res.status(200).json({
                trelloBoard
            })
        } catch (error) { 
            throw error
        }
    }

    getAllBoard = async (req, res, next) => { 
        try {
            const boards = await TrelloService.getAllBoard()
            res.status(200).json({
                boards
            })
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
                    'msg' : 'Updated'
                })
            }else{
                throw new Error("update fail")
            }
        } catch (error) { 
            throw error
        }
    }

    deleteBoard = async (req, res, next) => { 
        try {
            const id = req.query._id
            const result = await TrelloService.deleteBoard(id)
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

module.exports = new trelloController();