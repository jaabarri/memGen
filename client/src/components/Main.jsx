import { useState, useEffect } from "react"

export default function Main() {
    const[memeInfo, setMemeInfo] = useState({
        topText: "One does not simply",
        bottomText: "Walk into Mordor",
        imgUrl: "http://i.imgflip.com/1bij.jpg"
    })

    const [allMemes, setAllMemes] = useState([])

    

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
            
    }, [])

    console.log(allMemes)

    function randomMeme(){
        let random = Math.floor(Math.random() * allMemes.length)
        setMemeInfo(preveMeme => ({
            ...preveMeme,
            imgUrl: allMemes[random].url
        }))
    }

    function handleChange(event){
        const {value, name} = event.currentTarget
        console.log(event.currentTarget.name)
        setMemeInfo(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
        
    }

    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange}
                        value={memeInfo.topText}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleChange}
                        value={memeInfo.bottomText}
                    />
                </label>
                <button onClick={randomMeme}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={memeInfo.imgUrl}/>
                <span className="top">{memeInfo.topText}</span>
                <span className="bottom">{memeInfo.bottomText}</span>
            </div>
        </main>
    )
}