import React from 'react'
import CloseIcon from '@material-ui/icons/Close'
import { LinearProgress } from '@material-ui/core'

export default function AsideTabContent ({ pokemon, setIsOpen }) {
  return (
    <>
      <div className='aside-tab-header'>
        <div className="header-text">
          { pokemon.name.toUpperCase() }
        </div>
        <span className="close-aside-tab" onClick={() => setIsOpen(false)}>
          <CloseIcon fontSize="large" />
        </span>
      </div>
      <div className="aside-tab-body">
        <img src={pokemon.sprites.front_shiny} alt={pokemon.name} />
        <ul>
          <h4>Pokemon stats:</h4>
          {pokemon.stats.map(item => (
            <li>
              {item.stat.name}: {item.base_stat}
              <LinearProgress
                value={item.base_stat} variant='buffer'
                color='secondary'
              />
            </li>
          )
          )}
        </ul>
      </div>
    </>
  )
}
