// selectors
const form = document.querySelector('.search-form');
const searchResults = document.querySelector('.search-results');


// event listeners
form.addEventListener('submit', handleSubmit);


// functions
function handleSubmit(event) {
    event.preventDefault();

    const input = document.querySelector('.search-form-input').value;

    const searchQuery = input.trim();

    fetchResults(searchQuery);
}

function fetchResults(searchQuery) {
    const api = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${searchQuery}`;
    fetch(api)
        .then(response => response.json())
        .then(data => {
            const results = data.query.search;
            displayResults(results);
        })
        .catch(() => console.log('An error occurred'));
}
function displayResults(results) {
    // Remove all child elements
    searchResults.innerHTML = '';

    results.forEach(result => {
        const url = encodeURI(`https://en.wikipedia.org/wiki/${result.title}`);

        searchResults.insertAdjacentHTML('beforeend',
             `<div class="result-item">
                <h3 class="result-item-title">
                    <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
                </h3>
                <span class="result-item-snippet">${result.snippet}</span><br><br>
                <a href="${url}" class="result-item-link" target="_blank" rel="noopener">${url}</a>
            </div>`
        );
    });
}
