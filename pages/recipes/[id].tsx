import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from "next/router";
import client from '../api/contentful';


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
          if (entry.items[0].fields.tags !== undefined) {
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
      //console.log('no value')
    }
  };

  useEffect(() => {
    if (counter < 1) {
      getRecipe()
    }
  })

  return (
    <>
     {title && <h1>{title}</h1>}
     {tags && tags.map((tag, index) => <span key={index}>{tag.fields.name}</span>)}
     {photo && <img src={photo} alt={title}/>}
     {description && <p>{description}</p>}
     {chef && <h1>BY {chef}</h1>}
    </>
  )
}

export default Recipe