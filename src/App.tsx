import { useEffect, useState } from "react";
import {Card} from "./components/Card.tsx";

async function fetchCharacters() {
    return await fetch("https://api.disneyapi.dev/character");
}

interface Character {
    id: number;
    name: string;
    imageUrl: string;
}

interface ResponseData {
    allies: [];
    createdAt: "2021-04-12T01:25:09.759Z";
    enemies: [];
    films: [];
    imageUrl: "https://static.wikia.nocookie.net/disney/images/6/61/Olu_main.png";
    name: "'Olu Mel";
    parkAttractions: [];
    shortFilms: [];
    sourceUrl: "https://disney.fandom.com/wiki/%27Olu_Mel";
    tvShows: [];
    updatedAt: "2021-12-20T20:39:18.031Z";
    url: "https://api.disneyapi.dev/characters/6";
    videoGames: [];
    __v: 0;
    _id: 6;
}

function App() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [previouslyClicked, setPreviouslyClicked] = useState<number[]>([])
    const [highScore, setHighScore] = useState(0);

    function addToPreviouslyClicked(id: number) {
        setPreviouslyClicked([id, ...previouslyClicked]);
        console.log(`added ${id}`)
        setCharacters(shuffle(characters));
    }

    function checkPreviouslyClicked(id: number) {
        previouslyClicked.includes(id) ? reset() : addToPreviouslyClicked(id);
    }

    function shuffle<T>(arr: T[]) {
        const shuffled = arr.sort(() => {
            return Math.random() - 0.5;
        })
        return shuffled;
    }

    function reset() {
        if (previouslyClicked.length > highScore) setHighScore(previouslyClicked.length);
        setPreviouslyClicked([])
        console.log("lost")
        setCharacters(shuffle(characters));
    }

    useEffect(() => {
        const appendCharacters = async () => {
            const response = await fetchCharacters();
            const data = await response.json();
            const responseData: ResponseData[] = Array.from(data.data);
            let _characters = responseData.map((character) => {
                return {
                    id: character._id,
                    name: character.name,
                    imageUrl: character.imageUrl,
                } as Character;
            });
            _characters = shuffle(_characters);
            await setCharacters(_characters.slice(0, 8));
        };
        appendCharacters();
    }, []);

    return (
        <>
            <div className={"navbar shadow-xl flex justify-center gap-3"}>
                <h2 className={"btn"}>Score: {previouslyClicked.length}</h2>
                <h2 className={"btn"}>High Score: {highScore}</h2>
            </div>
            <div className={"grid md:grid-cols-4 grid-cols-2 md:grid-rows-2 auto-rows-fr gap-5 m-2"}>
                {characters.map((character) => {
                    return <Card onClick={checkPreviouslyClicked} id={character.id} name={character.name} url={character.imageUrl} key={character.id}/>;
                })}
            </div>
        </>
    );
}

export default App;
