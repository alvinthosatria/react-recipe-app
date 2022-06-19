import { useEffect, useState } from "react";
import styled from "styled-components"
import {Splide, SplideSlide} from '@splidejs/react-splide' 
/*Splide will be the carousel and SplideSlide will be the individual Cards */
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';

function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
      getPopular();
  }, []) //only run it when the component gets mounted


  const getPopular = async () => {

    const check = localStorage.getItem('popular');

    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const api = await fetch(
        'https://api.spoonacular.com/recipes/random?apiKey=4243f9475cc24d83aaa44e5424c1c9e5&number=12'
      );
      const data = await api.json(); //gives the json format
      
      localStorage.setItem("popular", JSON.stringify(data.recipes));
      setPopular(data.recipes);
      console.log(data.recipes);
    }
  }

  return (
    <div>
      <Wrapper>
        <h3>Popular Picks</h3>
        <Splide 
        options={{
          perPage: 4,
          arrows: false,
          paginations: false,
          drag: "free",
          gap: "3rem",
        }}>
          {popular.map((recipe) => {
            return (
              <SplideSlide key = {recipe.id}>
                <Card className="popular-cards">
                  <Link to={'/recipe/'+recipe.id}>
                    <p className="popular-recipe-title">{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title} />
                    <Gradient />
                  </Link>
                </Card>
              </SplideSlide>
              
            )
          })}
        </Splide>
      </Wrapper>
      
    </div>
  )
}

// const Title = styled.p`
//   font-size: .8em;
// `;

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  height: 15rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))
`;
export default Popular
