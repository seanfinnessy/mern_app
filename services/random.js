// write function to retrieve a blob of json
// make an ajax request. use the fetch function
// https://swapi.dev/api/people/1

// function fetchPeople() {
//     fetch('https://swapi.dev/api/people/1')
//         .then(res => res.json())
//         .then(json => console.log(json))
// }

// await keyword in front of any piece of code that returns a promise, and assign that to a variable.
async function fetchPeople() {
  const res = await fetch("https://swapi.dev/api/people/1");
  const json = await res.json();
  console.log(json);
}

fetchPeople();
