import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import {motion} from 'framer-motion';
import { Link } from 'react-router-dom'
function Searched() {

    const [searchedRecipes, setSearchedRecipes] = useState([]);
    let params = useParams();
    
    const getSearched = async (name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=4243f9475cc24d83aaa44e5424c1c9e5&query=${name}`);
        const recipes = await data.json();
        setSearchedRecipes(recipes.results);
    }

    useEffect(() => {
        getSearched(params.search)
    }, [params.search]) //updates everytime it is searched

  return (
    <Grid
      animate={{opacity: 1}}
      initial = {{opacity: 0}} //initial point
      exit = {{opacity: 0}} //animate it out
      transition = {{duration: 0.5}}
    >
      {searchedRecipes.map((item) => {
        return (
            <Card key={item.id}>
              <Link to={'/recipe/'+item.id}>
                <img src={item.image} alt="" />
                <h4>{item.title}</h4>
              </Link>
                
            </Card>
        )
      })}
    </Grid>
  )
}

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }

  a {
    text-decoration: none;
  }

  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Searched
