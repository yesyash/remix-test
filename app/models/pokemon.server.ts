import { PokemonDetails } from "~/types/pokemon";

type APIResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonDetails[];
};

const BASE_API_URL = "https://pokeapi.co/api/v2/pokemon";

export const getPokemonsList = async (): Promise<PokemonDetails[]> => {
  const res = await fetch(BASE_API_URL);
  const data: APIResponse = await res.json();

  return data.results;
};

export const getPokemonDetails = async (name: string) => {
  const res = await fetch(`${BASE_API_URL}/${name}`);
  const data = await res.json();

  return data;
};
