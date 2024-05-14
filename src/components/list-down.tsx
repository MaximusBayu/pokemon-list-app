"use client"
// components/List.js
import { useState, useEffect } from 'react';
import { Card, CardContent, CircularProgress, Typography } from '@mui/material';
import Head from 'next/head';

const List = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9); // 3 pokemons per row, 3 rows per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage * currentPage}`);
        const data = await response.json();
        const results = data.results;
        const pokemonDetails = await Promise.all(results.map(async (result) => {
          const pokemonResponse = await fetch(result.url);
          return pokemonResponse.json();
        }));
        setPokemonData(pokemonDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage]);

  // Function to get the dominant type of a Pokemon
  const getDominantType = (types) => {
    return types[0].type.name;
  };

  // Function to get color based on Pokemon type
  const getTypeColor = (type) => {
    const typeColors = {
      normal: '#A8A77A',
      fire: '#EE8130',
      water: '#6390F0',
      electric: '#F7D02C',
      grass: '#7AC74C',
      ice: '#96D9D6',
      fighting: '#C22E28',
      poison: '#A33EA1',
      ground: '#E2BF65',
      flying: '#A98FF3',
      psychic: '#F95587',
      bug: '#A6B91A',
      rock: '#B6A136',
      ghost: '#735797',
      dragon: '#6F35FC',
      dark: '#705746',
      steel: '#B7B7CE',
      fairy: '#D685AD',
    };
    return typeColors[type] || '#FFFFFF';
  };

  // Function to handle scroll event
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  // Attach scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <Head>
        <title>Pokémon List</title>
      </Head>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {loading ? (
          <CircularProgress />
        ) : (
          pokemonData.map((pokemon, index) => (
            <Card key={index} style={{ width: 200, margin: 10, backgroundColor: getTypeColor(getDominantType(pokemon.types)) }}>
              <CardContent>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} style={{ width: '100%' }} />
                <Typography variant="body1" style={{ marginTop: '8px', textAlign: 'center', fontWeight: 'bold', textTransform: 'capitalize' }}>
                  {pokemon.name}
                </Typography>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default List;
