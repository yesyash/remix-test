import { json, LoaderFunction } from "@remix-run/node"
import { useLoaderData, useParams } from "@remix-run/react"
import { useEffect, useState } from "react"
import { getPokemonDetails } from "~/models/pokemon.server";

const BASE_API_URL = "https://pokeapi.co/api/v2/pokemon";


export const loader: LoaderFunction = async ({ params }) => {
  const name = params.name

  if (!name) {
    throw new Error("name required")
  }

  const data = await getPokemonDetails(name)

  return json({ pokemonName: data.name })
}

const PokemonDetailsRoute = () => {
  const { pokemonName } = useLoaderData()
  const { name } = useParams()
  const [details, setDetails] = useState()

  const pokemonDetails = async (name: string) => {
    const res = await fetch(`${BASE_API_URL}/${name}`);
    const data = await res.json();

    for (let i = 0; i < 100000000; i++) { }

    setDetails(data.name)
  };

  useEffect(() => {
    if (name) {
      pokemonDetails(name)
    }
  }, [])

  return (
    <>
      <div className="flex gap-2">
        <span>Server Rendered:</span>
        <h2 className="mb-4">{pokemonName}</h2>
      </div>

      <div className="flex gap-2">
        <span>Client Rendered: </span>
        {details && <pre>{JSON.stringify(details, null, 2)}</pre>}
      </div>
    </>
  )
}

export default PokemonDetailsRoute