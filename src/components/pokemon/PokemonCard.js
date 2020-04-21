import React, { useState } from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Typography, Drawer } from '@material-ui/core'
import AsideTabContent from './AsideTabContent'

function PokemonCard ({ pokemon }) {
  const [isOpen, setIsOpen] = useState(false)

  const list = () => (
    <div className='aside-tab-container'>
      <AsideTabContent pokemon={pokemon} setIsOpen={setIsOpen} />
    </div>
  )

  return (
    <>
      <Card onClick={() => setIsOpen(true)} className="card-item">
        <CardActionArea>
          <CardMedia
            className="card-picture"
            component="img"
            alt={pokemon.name}
            src={pokemon.sprites.front_default}
            title={pokemon.name}
          />
          <CardContent className="card-content">
            <Typography variant="h4" component="h1" align="center">
              {pokemon.name}
            </Typography>
            <Typography variant="h6" color="primary" component="h6" className="pokemon-types-container">
              {pokemon.types.map((type, index) => {
                return (
                  <span key={index} >
                    {type.type.name}
                  </span>
                )
              })
              }
            </Typography>
            <Typography variant="body2" color="textSecondary" component="div">
              <div>Weight: {pokemon.weight}</div>
              <div>Height: {pokemon.height}</div>
              <div>Ability: {pokemon.abilities[0].ability.name}</div>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Drawer
        anchor='right' open={isOpen} onClose={() => setIsOpen(false)} transitionDuration={300}>
        {list()}
      </Drawer>
    </>
  )
}

export default PokemonCard
