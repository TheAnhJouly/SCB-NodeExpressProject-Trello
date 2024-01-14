const Board = require("../models/Board");
const List = require("../models/List")
const Card = require("../models/Card")

class TrelloServiceCard{
    
    createCard = async (idList,dataCard) => {
        try {
            const card = new Card(dataCard);
            await card.save();
            await List.updateOne({ _id: idList }, { $push: { Cards: card } });
            return card;
        } catch (error) {
            throw error;
        }
    } 
    
    getAllCard = async (idList) => { 
        try {
            let cardsResult = [];
            let Cards = await List.findOne({_id:idList})
            Cards.Cards.map( (card)=>{
                cardsResult.push(card)
            })
            return cardsResult
        } catch (error) {
            throw error;
        }
    }


    updateCard = async (idCard,cardName) => {
        try {
            await Card.updateOne({ _id: idCard }, { cardName: cardName });
            return true
        } catch (error) {
            return false;
        }
    }


    deleteCard = async (idCard) => { 
        try {
            const card = await Card.findById(idCard)
            await card.deleteOne();
            return card;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new TrelloServiceCard()