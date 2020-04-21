import React, { useEffect, useContext } from 'react'
import Navbar from './components/navbar/Navbar'
import PokemonCard from './components/pokemon/PokemonCard'
import NativeSelects from './assets/Select'
import { StoreContext } from './store/store'
import { useObserver } from 'mobx-react-lite'
import CircularProgress from '@material-ui/core/CircularProgress'
import Pagination from '@material-ui/lab/Pagination'

const App = () => {
  const store = useContext(StoreContext)

  const getRightPokemonData = () => {
    if (store.searchInputVal && store.selectedType) {
      const searchTypeData = store.searchPokemonData.filter(pokemon => {
        const pokTypes = pokemon.types.map(type => {
          return type.type.name
        })
        return pokTypes.includes(store.selectedType)
      })
      return searchTypeData.map((pokemon, index) => {
        return <PokemonCard key={index} pokemon={pokemon} />
      })
    } else if (store.searchInputVal && !store.selectedType) {
      return store.searchPokemonData.map((pokemon, index) => {
        return <PokemonCard key={index} pokemon={pokemon} />
      })
    } else if (store.selectedType && !store.searchInputVal) {
      return store.searchPokemonDataType.map((pokemon, index) => {
        return <PokemonCard key={index} pokemon={pokemon} />
      })
    } else {
      return store.pokemonData.map((pokemon, index) => {
        return <PokemonCard key={index} pokemon={pokemon} />
      })
    }
  }

  useEffect(() => {
    store.fetchData()
  }, [])

  return useObserver(() => (
    <>
      <Navbar
        searchInputVal={store.searchInputVal}
        setSearchInputVal={store.setSearchInputVal}
      />
      <div className="main-app-container">
        {store.loading ? <CircularProgress disableShrink /> : (
          <>
            <div className="buttons-pagination">
              <Pagination
                onChange={(event, page) => store.fetchData((page - 1) * store.limit, store.limit)}
                count={store.pagesCount} color="secondary" disabled={store.buttonsDisable}/>
              <NativeSelects value={store.selectedType} setValue={store.setSelectedType} isPages={false} label={'Thype:'} />
              <NativeSelects value={store.limit} setValue={store.setLimit} isPages={true} label={'Per-page:'} />
            </div>
            <div className="cards-container">
              {getRightPokemonData()}
            </div>
          </>
        )}
      </div>
      <footer>
        <p>&copy; 2020 Pokedex. All rights reserved...</p>
      </footer>
    </>
  ))
}

export default App
