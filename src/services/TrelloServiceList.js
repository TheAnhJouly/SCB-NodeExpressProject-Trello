const Board = require("../models/Board");
const List = require("../models/List")

class TrelloServiceList{
    //done
    createList = async (idBoard,dataList) => {
        try {
            const list = new List(dataList);
            await list.save();
            await Board.updateOne({ _id: idBoard }, { $push: { lists: list } });
            return list;
        } catch (error) {
            throw error;
        }
    }
    //done 
    getAllList = async (idBoard) => {
        try {
            let listsResult = []; 
            let Lists = await Board.findOne({_id:idBoard}) 
            console.log("Lists nay 123123123",Lists)
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
            console.log("list nay 123123123",list)
            await List.deleteOne(list);
            return list;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new TrelloServiceList()