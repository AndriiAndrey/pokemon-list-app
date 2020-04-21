import React, { createContext } from 'react'
import { useLocalStore } from 'mobx-react-lite'
import { getPokemon, getPokemonList } from '../api/api'

export const StoreContext = createContext(null)

const StoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    // data
    pokemonData: [],
    loading: true,
    allPokemons: 0,
    limit: 10,
    searchInputVal: '',
    selectedType: '',
    buttonsDisable: false,
    get pagesCount () {
      return Math.ceil(store.allPokemons / store.limit)
    },
    get searchPokemonData () {
      return store.pokemonData.filter(pokemon => {
        return pokemon.name.includes(store.searchInputVal.toLowerCase())
      })
    },
    get searchPokemonDataType () {
      return store.pokemonData.filter(pokemon => {
        const pokTypes = pokemon.types.map(type => {
          return type.type.name
        })
        return pokTypes.includes(store.selectedType)
      })
    },
    // callbacks
    setPokemonData: (newData) => {
      store.pokemonData = newData
    },
    setLoading: (newData) => {
      store.loading = newData
    },
    setAllPokemons: (newData) => {
      store.allPokemons = newData
    },
    setLimit: (newData) => {
      store.limit = newData
    },
    setSearchInputVal: (newData) => {
      store.searchInputVal = newData
    },
    setSelectedType: (newData) => {
      store.selectedType = newData
    },
    fetchData: async (offset = 0, limit = 10) => {
      store.buttonsDisable = true
      const response = await getPokemonList(offset, limit)
      store.setAllPokemons(response.count)
      await store.loadPokemon(response.results)
      store.setLoading(false)
      store.buttonsDisable = false
    },
    loadPokemon: async (data) => {
      const pokemonData = await Promise.all(data.map(async pokemon => {
        const pokemonRecord = await getPokemon(pokemon)
        return pokemonRecord
      }))
      store.setPokemonData(pokemonData)
    }
  }))

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreProvider
