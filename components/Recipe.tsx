import Link from 'next/link'
import styled from '@emotion/styled'
import { rem } from 'polished'

function Post({ id, title, photo, tags, chef }) {
  return (
    <RecipeStyled>
      <Link href="/recipes/[id]" as={`/recipes/${id}`}>
        <a className="recipe-image">
          <img src={photo.fields.file.url} alt={photo.fields.file.fileName}/>
        </a>
      </Link>
      <div className="recipe-info">
      <Link href="/recipes/[id]" as={`/recipes/${id}`}>
        <a className="recipe-title">{title}</a>
      </Link>
      {chef && <h3 className="recipe-chef">By {chef.fields.name}</h3>}
      { tags && ( 
        <div className="recipe-tags">
          {tags.map((tag, index) => <span className="recipe-tag" key={index}>{tag.fields.name}</span>)}
        </div> 
        )
      }
        
      </div>
    </RecipeStyled>
  )
}

const RecipeStyled = styled.div`
  margin: 0 0 ${rem(20)} 0;
  background: white;

  .recipe-image {
    width: 100%;
    display: block;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
  .recipe-info {
    padding: ${rem(20)};
  }
  .recipe-title {
    font-size: ${rem(20)};
    line-height: ${rem(25)};
    margin: 0 0 ${rem(10)} 0;
    color: black;
    text-decoration: none;
    display: block;
    transition: 0.2s;
  }
  .recipe-title:hover {
    color: #28b88d;
  }
  .recipe-chef {
    font-size: ${rem(16)};
    font-weight: 500;
    color: #28b88d;
  }
  .recipe-tags {
    padding: ${rem(20)} 0;
    display: flex;
    justify-content: flex-start;
  }
  .recipe-tag {
    font-size: ${rem(10)};
    padding: ${rem(5)};
    background: #f4f4f4;
    text-align: center;
    margin: 0 ${rem(10)} 0 0 ;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
`


export default Post