
import { useEffect,useState } from 'react';
import PokemonThumnail from './components/PokemonThumnail';
import Search from './components/Search';

function App() {
  const[allPokemons, s_a_p] = useState([]);
  const[loadMore, s_l_mor] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');
  const get_all_pokm = async() =>{
    const rest = await fetch(loadMore)
    const malumot = await rest.json()
    s_l_mor(malumot.next)

    function cr_pok_obj(results)  {
      results.forEach( async pokemon => {
        const rest = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const malumot =  await rest.json()
        s_a_p( currentList => [...currentList, malumot])
        await allPokemons.sort((a, b) => a.id - b.id)
      })
    }
    cr_pok_obj(malumot.results)
  }
  useEffect(() => {
    get_all_pokm()
   }, [])


  
  return (
    <div className="app-container">
      <h1>Pokemon App</h1>
	  <div className='search-box'>
			<Search/>
	</div>
      <div className='pokemon-container'>
        <div className='all-containers'>
          {allPokemons.map((pokemon, index)=> 
            <PokemonThumnail 
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.sprites.other.dream_world.front_default}
            type={pokemon.types[0].type.name}
            key={index}
            />
          )}
        </div>
        <button className='load-more' onClick={()=> get_all_pokm()}>Load More</button>
      </div>
    </div>
  );
}

export default App;
