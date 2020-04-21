import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { InputLabel, FormControl, Select } from '@material-ui/core'

const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  })
)

const NativeSelects = ({ value, setValue, label, isPages }) => {
  const classes = useStyles()

  const pokemonTypes = [
    'normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost',
    'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice',
    'dragon', 'dark', 'fairy'
  ]

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor={`outlined-${label}`}>{label}</InputLabel>
        <Select
          native
          value={value}
          onChange={handleChange}
          label={label}
          inputProps={{
            id: `outlined-${label}`
          }}
        >
          {isPages
            ? <>
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={50}>Fifty</option>
            </>
            : <>
              <option value={''}></option>
              {pokemonTypes.map(tipe =>
                <option value={tipe}>{tipe}</option>
              )}
            </>
          }
        </Select>
      </FormControl>
    </div>
  )
}

export default NativeSelects
