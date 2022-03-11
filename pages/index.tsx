import type { NextPage, GetStaticProps } from 'next'
import { Grid } from '@nextui-org/react';

import { Layout } from '../components/layouts'
import { pokeApi } from '../api'
import { PokemonListResponse, SmallPokemon } from '../interfaces'
import { PokemonCard } from '../components/pokemon';

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({pokemons}) => {

  return (
    <Layout title="Listado de Pokémons">

      <Grid.Container gap={2} justify='flex-start'>

        {
          pokemons.map((pokemon) => (
            <PokemonCard pokemon={pokemon} key={pokemon.id} />
          ))
        }

      </Grid.Container>
    </Layout>
  )
}


export const getStaticProps: GetStaticProps = async (ctx) => {
  
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon/?limit=151')

  const pokemons: SmallPokemon[] = data.results.map((pokemon, indice) => ({
    name: pokemon.name,
    url:  pokemon.url,
    id: indice + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${indice + 1}.svg`
  }))

  return {
    props: {
      pokemons
    }
  }
}

export default HomePage
