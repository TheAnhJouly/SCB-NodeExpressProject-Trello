const Board = require("../models/Board");

class TrelloService{
    
    createBoard = async (dataBoard) => {
        try {
            const board = new Board(dataBoard);
            await board.save()
            return board;
        } catch (error) {
            throw error;
        }
    }

    getAllBoard = async () => {
        try {
            const boards = await Board.find()
            return boards
        } catch (error) {
            throw error;
        }
    }

    updateBoard = async (id,dataBoard) => {
        try {
            const result = await Board.updateOne({_id:id},{boardName: dataBoard.boardName})
            return true
        } catch (error) {
            throw error;
        }
    }

    deleteBoard = async (id) => {
        try {
            const board = await Board.findById(id)
            await board.deleteOne();
            return board;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new TrelloService()