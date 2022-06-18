import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import {motion} from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
//useParams allows to pull out the keyword from the URL

const Cuisine = () => {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();


  const getCuisine = async (name) => {
    const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=d18e157556484c79b9a9aa14343235c3&cuisine=${name}`);
    const recipes = await data.json();
    setCuisine(recipes.results);
  }

  useEffect(() => {
    getCuisine(params.type)
    console.log(params.type)
  }, [params.type])

  return (
    <Grid
      animate={{opacity: 1}}
      initial = {{opacity: 0}} //initial point
      exit = {{opacity: 0}} //animate it out
      transition = {{duration: 0.5}}
    >
      {cuisine.map((item) => {
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

export default Cuisine
