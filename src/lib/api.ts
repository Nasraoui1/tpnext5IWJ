const API_BASE_URL = "https://nestjs-pokedex-api.vercel.app";

export async function fetchPokemons(params: {
  page?: number;
  limit?: number;
  typeId?: number;
  name?: string;
}) {
  const query = new URLSearchParams();
  if (params.page) query.append("page", params.page.toString());
  if (params.limit) query.append("limit", params.limit.toString());
  if (params.typeId) query.append("typeId", params.typeId.toString());
  if (params.name) query.append("name", params.name);

  const response = await fetch(`${API_BASE_URL}/pokemons?${query.toString()}`);
  if (!response.ok) throw new Error("Erreur lors de la récupération des pokémons");
  return response.json();
}

export async function fetchPokemonById(pokedexId: number) {
  const response = await fetch(`${API_BASE_URL}/pokemons/${pokedexId}`);
  if (!response.ok) throw new Error("Pokémon non trouvé");
  return response.json();
}

export async function fetchTypes() {
  const response = await fetch(`${API_BASE_URL}/types`);
  if (!response.ok) throw new Error("Erreur lors de la récupération des types");
  return response.json();
}
