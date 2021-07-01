import Card from './card';
import CardForm from './cardForm';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './cardList.css';

const CardList = ({ selectedBoard }) => {
    const [cardsData, setCardsData] = useState([]);

    useEffect(() => {
        axios.get(`https://lucky7th-board.herokuapp.com/boards/${selectedBoard.id}/cards`).then((response)=> {
            setCardsData(response.data.cards);
        }).catch((error) => {
            console.log('Error:', error);
            alert('Couldn\'t get cards for this board.');
        });
    }, [selectedBoard]);

    const deleteCard = (card) => {
        axios.delete(`https://lucky7th-board.herokuapp.com/cards/${card.id}`).then((response) => {
            const newCardsData = cardsData.filter((existingCard) => {
                return existingCard.id !== card.id;
            });
                setCardsData(newCardsData);
        }).catch((error) => {
            console.log('Error:', error);
            alert('Couldn\'t delete the card.');
        });
    };

    const likeCard = (card) => {
        axios.put(`https://lucky7th-board.herokuapp.com/cards/${card.id}/like`).then((response) => {
            const newCardsData = cardsData.map((existingCard) => {
            return existingCard.id !== card.id ? existingCard : {...card, likes_count: card.likes_count + 1}
        });
            setCardsData(newCardsData);
        }).catch((error) => {
            console.log('Error:', error);
            alert('Couldn\'t +1 the card.');
        });
    };

    const cardElements = cardsData.map((card, index) => {
        return (
            <Card 
                key={index} 
                card={card}
                deleteCard={deleteCard}
                likeCard={likeCard}
            />)
    });

    const createNewCard = (message, color) => {
        axios.post(
            `https://lucky7th-board.herokuapp.com/boards/${selectedBoard.id}/cards`,
            {message}
        ).then((response) => {
            const cards = [...cardsData];
            cards.push({...response.data.card, color});
            setCardsData(cards);
        }).catch((error) => {
            console.log('Error:', error);
            alert('Couldn\'t create a new card.');
        });
    };

    return (
        <section className='card-list-sec'>
            <section>
                <h2>Cards for {selectedBoard.title}</h2>
                <div className='cards-container'>
                    {cardElements}
                </div>
                
            </section>
            <CardForm createNewCard={createNewCard}></CardForm> 
        </section>
    );
};

export default CardList;