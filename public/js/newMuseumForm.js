// autocomplete stuff

const search = document.querySelector('#museumName');

async function fetchNames() {
    const res = await fetch('/museumnames', {method: 'get'});
    const data = await res.json()
    return data  
}

const names = fetchNames();


