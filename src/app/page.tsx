"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Pokemon } from "@/types/pokemon";
import { fetchPokemons, fetchTypes } from "@/lib/api";
import PokemonCard from "@/components/PokemonCard";
import { PokemonType } from "@/types/pokemon";

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [types, setTypes] = useState<PokemonType[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");
  
  const observerTarget = useRef(null);

  const loadPokemons = useCallback(async (pageNum: number, nameFilter: string, typeFilter: string) => {
    if (loading) return;
    
    setLoading(true);
    try {
      const data = await fetchPokemons({ 
        page: pageNum, 
        limit: 50, 
        name: nameFilter,
        typeId: typeFilter ? Number(typeFilter) : undefined
      });
      
      if (data.length === 0) {
        setHasMore(false);
        if (pageNum === 1) setPokemons([]); 
        return;
      }

      setHasMore(data.length === 50);
      
      setPokemons((prev) => {
        if (pageNum === 1) return data; 
        const newPokemons = data.filter(
          (newPk: Pokemon) => !prev.some((p) => p.pokedexId === newPk.pokedexId)
        );
        return [...prev, ...newPokemons];
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    async function getTypes() {
      const data = await fetchTypes();
      setTypes(data);
    }
    getTypes();
  }, []);

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    loadPokemons(1, search, selectedType);
  }, [search, selectedType]);

  useEffect(() => {
    if (page > 1) {
      loadPokemons(page, search, selectedType);
    }
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading]);

  return (
    <main className="pokedex-container">
      <header className="pokedex-header">
        <h1>Pokedex</h1>
        
        <div className="filters">
          <input 
            type="text" 
            placeholder="Rechercher un Pokémon..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <select 
            value={selectedType} 
            onChange={(e) => setSelectedType(e.target.value)}
            className="type-select"
          >
            <option value="">Tous les types</option>
            {types.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="pokedex-grid">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.pokedexId} pokemon={pokemon} />
        ))}
      </div>

      <div ref={observerTarget} style={{ height: "20px", margin: "20px" }}>
        {loading && <p>Chargement des Pokémon...</p>}
        {!hasMore && <p>Tous les Pokémon ont été chargés.</p>}
      </div>
    </main>
  );
}
