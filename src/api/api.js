export const getPokemon = ({ url }) => {
  return new Promise((resolve, reject) => {
    fetch(url).then(res => res.json())
      .then(data => {
        resolve(data)
      })
  })
}

export const getPokemonList = (offset = 0, limit = 10) => {
  return new Promise((resolve, reject) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
      .then(res => res.json())
      .then(data => {
        resolve(data)
      })
  })
}
