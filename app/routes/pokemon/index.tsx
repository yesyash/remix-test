import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import { getPokemonsList } from '~/models/pokemon.server'
import { PokemonDetails } from '~/types/pokemon'

export const loader: LoaderFunction = async () => {
  const pokemons = await getPokemonsList()

  return json<PokemonDetails[]>(pokemons)
}

const PokemonRoute = () => {
  const pokemons = useLoaderData<PokemonDetails[]>()

  return (
    <div>
      <div className='mb-4'>
        <Link to="/" className="text-blue-600 hover:underline">
          Home
        </Link>
      </div>

      <ul>
        {pokemons.map(pokemon =>
          <li key={pokemon.url}>
            <Link to={`${pokemon.name}`} className="text-blue-600 hover:underline">
              {pokemon.name}
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default PokemonRoute