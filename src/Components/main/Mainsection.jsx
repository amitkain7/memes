import React, { useEffect, useState } from 'react'
import './mainsection.css'
function Main() {
  const [memedata, setMemedata] = useState({
    topText: '',
    bottomText: '',
    url: 'http://i.imgflip.com/1bij.jpg'
  })

  const [allmemeimages, setAllmemeimages] = useState({})



  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then(res => res.json())
      .then(data => setAllmemeimages(data))
  }, [])



  function getrandomImg() {
    const Array = allmemeimages.data.memes;
    const randomnum = Math.floor(Math.random() * Array.length)
    const Url = Array[randomnum].url
    setMemedata(memedata => {
      return { ...memedata, url: Url }
    })
  }



  function handleClick(event) {
    const { value, name } = event.target
    setMemedata(memedata => {
      return {
        ...memedata,
        [name]: value
      }
    })

  }

  return (
    <div className='meme-div'>
      <form >
        <input type="text"
          placeholder='Top text'
          name='topText'
          value={memedata.topText}
          onChange={handleClick}

        />


        <input type="text"
          placeholder='bottom text'
          name='bottomText'
          value={memedata.bottomText}
          onChange={handleClick}

        />
      </form>
      <button onClick={getrandomImg} >Get a new meme image  🖼</button>

      <div className='imgdiv'>
        <img src={memedata.url} />
        <span  id='top'><h2>{memedata.topText}</h2></span>
        <span  id='bottom'><h2>{memedata.bottomText}</h2></span>
      </div>
    </div>
  )
}

export default Main