import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from "next/router";
import client from '../api/contentful';
import styled from '@emotion/styled'
import { rem } from 'polished'

function Recipe() {
  let router = useRouter();
  const [counter, setCounter] = useState(0)
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState([])
  const [photo, setPhoto] = useState('')
  const [description, setDescription] = useState('')
  const [chef, setChef] = useState('');

  async function getRecipe() {
    let value = await router.query.id;
    if (value) {
      let entry = await client.getEntries({
        'sys.id' : value,
        content_type: 'recipe', 
        include: 1
      })
        if (entry) {
          setCounter(counter + 1)
          if (entry.items[0].fields.title !== undefined) {
            setTitle(entry.items[0].fields.title)
          }
          if (entry.items[0].fields.tags !== undefined ) {
            setTags(entry.items[0].fields.tags)
          }
          if (entry.items[0].fields.photo.fields.file.url !== undefined) {
            setPhoto(entry.items[0].fields.photo.fields.file.url)
          }
          if (entry.items[0].fields.description !== undefined) {
            setDescription(entry.items[0].fields.description)
          }
          if (entry.items[0].fields.chef !== undefined) {
            setChef(entry.items[0].fields.chef.fields.name)
          }
      } else {
        console.log('error')
      }
    } else {
      console.log('no value')
    }
  };

  useEffect(() => {
    if (counter < 1) {
      getRecipe()
    }
  })

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <SingleStyled>
        <div className="single-inner container">
          {photo && (
            <div className="single-image">
              <img src={photo} alt={title}/>
            </div>
          )}
          <div className="single-info">
            {title && <h1 className="single-title">{title}</h1>}
            {chef && <h3 className="single-chef">By {chef}</h3>}
         
            {tags.length !== 0 && (
              <div className="single-tags">
                {tags.map((tag, index) => <span className="single-tag" key={index}>{tag.fields.name}</span>)}
              </div>
            )}
            {description && <div className="single-description" dangerouslySetInnerHTML={{ __html: description }}></div>}
            </div>
        </div>
    </SingleStyled>
    </>
  )
}

const SingleStyled = styled.div`
  background: #f3f3f3;
  .single-inner {
    overflow: hidden;
  }

  .single-image {
    border-radius: 4px 4px 0 0;
    width: 100%;
    max-height: 450px;
    overflow: hidden;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
  
  .single-info {
    background: white;
    padding: ${rem(20)};
    padding-top: ${rem(40)};
    border-radius: 0 0 4px 4px;
    
  }
  .single-title {
    font-size: ${rem(26)};
    line-height: ${rem(25)};
    margin: 0 0 ${rem(10)} 0;
    color: black;
    font-weight: 500;
  }
  
  .single-chef {
    font-size: ${rem(16)};
    font-weight: 500;
    color: #28b88d;
    margin: 0 0 ${rem(20)} 0;
  }
  .single-tags {
    padding: ${rem(20)} 0 ${rem(40)} 0;
    display: flex;
    justify-content: flex-start;
  }
  .single-tag {
    font-size: ${rem(10)};
    padding: ${rem(5)};
    background: #f4f4f4;
    text-align: center;
    margin: 0 ${rem(10)} 0 0 ;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  .single-description {
    font-size: ${rem(16)};
    line-height: ${rem(26)};
    margin: 0 ${rem(10)} 0 0;
    max-width: 600px;
    font-weight: 400;
    color: #666666;
  }
  `

export default Recipe