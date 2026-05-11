import Link from "next/link";
import { Pokemon } from "@/types/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Link href={`/pokemon/${pokemon.pokedexId}`} className="pokemon-card">
      <div className="pokemon-id">#{pokemon.pokedexId}</div>
      <div className="pokemon-image">
        <img src={pokemon.image} alt={pokemon.name} loading="lazy" />
      </div>
      <div className="pokemon-info">
        <h3>{pokemon.name}</h3>
        <div className="pokemon-types">
          {pokemon.types.map((type) => (
            <span key={type.id} className={`type-badge type-${type.name.toLowerCase()}`}>
              {type.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
