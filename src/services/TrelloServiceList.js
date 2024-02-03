const Board = require("../models/Board");
const List = require("../models/List")

class TrelloServiceList{
    
    createList = async (idBoard,dataList) => {
        try {
            const list = new List(dataList);
            await Board.updateOne({ _id: idBoard }, { $push: { lists: list } });
            await list.save();
            return list;
        } catch (error) {
            throw error;
        }
    }
    
    getAllList = async (idBoard) => {
        try {
            let listsResult = []; 
            let Lists = await Board.findOne({_id:idBoard}) 
            Lists.lists.map( (list)=>{
                listsResult.push(list)
            })
            return listsResult
        } catch (error) {
            throw error;
        } 
    }

     
    updateList = async (idList,listName) => {
        try {
            await List.updateOne({ _id: idList }, { listName: listName });
            return true
        } catch (error) {
            return false;
        }
    }

    
    deleteList = async (id) => {
        try {
            
            const list = await List.findById(id)
            await List.deleteOne(list);
            return list;
        } catch (error) {
            throw error;
        }
    }
 
}

module.exports = new TrelloServiceList()