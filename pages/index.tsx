import { useEffect, useState } from 'react'
import Head from 'next/head'
import Recipe from '../components/Recipe'
import client from './api/contentful'
import styled from '@emotion/styled'
import { rem } from 'polished'

const Home = () => {
  async function fetchEntries() {
    const entries = await client.getEntries( {content_type: 'recipe', include: 1})
    if (entries.items) return entries.items
    console.log(`Error getting Entries.`)
  }
  const [recipes, setRecipes] = useState<any[]>([])

  useEffect(() => {
    async function getRecipes() {
      const allRecipes: [] = await fetchEntries()
      setRecipes([...allRecipes])
    }
    getRecipes()
  }, [])

  return (
    <>
      <Head>
        <title>Marley Spoon</title>
      </Head>
      <HomeStyled>
        <div className="home-inner container">
        {recipes.length > 0
          ? recipes.map(recipe => (
              <Recipe 
                key={recipe.sys.id}
                id={recipe.sys.id}
                title={recipe.fields.title}
                photo={recipe.fields.photo.fields.file.url}
                alt = {recipe.fields.photo.fields.file.fileName}
                tags={recipe.fields.tags}
                chef={recipe.fields.chef}
              />
            ))
          : null}
        </div>
        </HomeStyled>
      </>
  )
}

const HomeStyled = styled.div`
  background: #f3f3f3;
  .home-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: ${rem(20)};
    grid-auto-rows: 1fr;
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      grid-auto-rows: auto;
    }
  }
`
export default Home
