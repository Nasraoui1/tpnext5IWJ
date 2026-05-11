"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Pokemon } from "@/types/pokemon";
import { fetchPokemonById } from "@/lib/api";
import Link from "next/link";

export default function PokemonDetail() {
  const { pokedexId } = useParams();
  const router = useRouter();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPokemon() {
      try {
        const data = await fetchPokemonById(Number(pokedexId));
        setPokemon(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getPokemon();
  }, [pokedexId]);

  if (loading) return <div className="loading">Chargement du Pokémon...</div>;
  if (!pokemon) return <div className="error">Pokémon non trouvé.</div>;

  return (
    <main className="detail-container">
      <button onClick={() => router.back()} className="back-button">
        ← Retour à la liste
      </button>

      <div className="detail-card">
        <div className="detail-header">
          <img src={pokemon.image} alt={pokemon.name} className="detail-image" />
          <div className="detail-title">
            <h1>{pokemon.name}</h1>
            <div className="pokemon-types">
              {pokemon.types.map((type) => (
                <span key={type.id} className={`type-badge type-${type.name.toLowerCase()}`}>
                  {type.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="detail-content">
          <div className="detail-stats">
            <h2>Statistiques</h2>
            {Object.entries(pokemon.stats).map(([key, value]) => (
              <div key={key} className="stat-row">
                <span className="stat-label">{key}</span>
                <div className="stat-bar-container">
                  <div 
                    className="stat-bar" 
                    style={{ width: `${(value / 150) * 100}%` }}
                  ></div>
                </div>
                <span className="stat-value">{value}</span>
              </div>
            ))}
          </div>

          <div className="detail-evolutions">
            <h2>Évolutions</h2>
            <div className="evolution-list">
              {pokemon.evolutions.length > 0 ? (
                pokemon.evolutions.map((evo) => (
                  <Link 
                    key={evo.pokedexId} 
                    href={`/pokemon/${evo.pokedexId}`}
                    className="evolution-item"
                  >
                    {evo.name}
                  </Link>
                ))
              ) : (
                <p>Ce Pokémon n'a pas d'évolution.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
