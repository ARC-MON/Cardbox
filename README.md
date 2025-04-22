# Cardbox
![obraz](https://github.com/user-attachments/assets/638011f4-c871-4dc7-879e-e5a4da1d71e6)
# Description
Carbox is an application for the creation of decks for card game Magic The Gathering. 
The application is developed in PHP and JavaScript languages and MySQL database, AJAX technology is also used in order to continuously update the displayed cards based on the fiters set by the user.
# Usage
When you click on a card it is added to the deck as a new one or added to the existing amount, a card can also be removed from the deck by clicking on it in the deck view. 
The user can search the card database using filters that update the list of displayed cards in real time. The application keeps track of what cards are stored in the main and side decks so that the deck is legal according to the rules of the game.
Once a deck has at least 60 cards added, it can be exported to the clipboard (the current export format works with online game Magic The Gathering Arena).
# Database
![DeckBuilder](https://github.com/user-attachments/assets/876c5545-3cf6-455c-8e50-89eb860d7223)</br></br>
The database currently consists of three tables: a table containing the cards (cards), a table containing the possible colors of cards (colors), and a table containing their combinations (card_colors).
