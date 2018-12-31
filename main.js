const endpoint = 'https://gist.githubusercontent.com/CrAvila/fde2c03d9e7cd72520614cb674f25ab6/raw/186f3887fbd74a1b1e38e7c4edd1f85bb33264fd/playerdata.json';
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
let players = [];

fetch(endpoint)
                .then(blob => blob.json())
                .then(data => players = data);

function findMatches(word, players){
    const regex = RegExp(word, 'gi')
    return players.filter(player => {
        return player.name.match(regex) || player.country.match(regex) ||player.role.match(regex) || player.number.match(regex);
    });
};

function displayMatches() {
    
    const matchArray = findMatches(this.value, players);
    const html = matchArray.map(player => {
        const regex = new RegExp(this.value, 'gi');
        const playerName = player.name.replace(regex, `<span class="hl">${this.value}</span>`);
    const playerCountry = player.country.replace(regex, `<span class="hl">${this.value}</span>`);
    const playerRole = player.role.replace(regex, `<span class="hl">${this.value}</span>`);
    const playerNumber = player.number.replace(regex, `<span class="hl">${this.value}</span>`);
        return `
        <li>
            
            <span class="number">${playerNumber} </span>
            <span class="name">${playerName} </span>
            <span class="country">${playerCountry}</span>
            <div class="role">${playerRole}</div>
            </li>`;
    }).join('');

    suggestions.innerHTML = html;
};

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
