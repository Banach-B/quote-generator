// 
const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');

let apiQuotes = [];

// show loading 
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loader
function removeLoadingSpinner() {
    // random loading time between 1000 and 500 ms
    const randomDelay = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
    setTimeout(function() {
        // main function - hide loader and show quote container
        quoteContainer.hidden = false;
        loader.hidden = true;

    }, randomDelay);
}

// event listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

// get quotes from API

// display new quote
function newQuote() {
    // loading animation 
    showLoadingSpinner();
    // pick a random quote from quotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    quoteText.textContent = quote.text;
    // check if author field is blank and replace it with 'unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // check quote length to determine styling 
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // set quote
    quoteText.textContent = quote.text;
    // hide loader
    removeLoadingSpinner();
}

async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        apiQuotes = data;
        newQuote();

    } catch {
        // error handling 
        console.log(`woops, can't load quotes`, error);
        // recursion - try fetching data again
        getQuotes();
    }
}

// tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

// On load 
getQuotes();