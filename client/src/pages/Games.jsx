import React, { useState } from "react";
import heroImg from "../assets/gamesHero.png";
import HeroSection from "../components/HeroSection";
import MainNavBar from "../components/MainNavBar";
import Line from "../components/Line";
import Banner from "../components/Banner";
import GameCard from "../components/GameCard/GameCard";
import img1 from "../assets/card.png";
import img2 from "../assets/card2.png";
import GamerCardRight from "../components/GameCard/GamerCardRight/GamerCardRight";
import { getGames } from "../services/games";
import { useQuery } from "react-query";
import { format, add } from "date-fns";

const Games = () => {
  const isAdmin = true; // Set this value based on whether the user is an admin or not

  const [gameData, setGameData] = useState([]);
  const [tomorrowGameData, setTomorrowGameData] = useState([]); // Store tomorrow's games separately

  console.log("gameData", gameData);
  console.log("tomorrowGameData", tomorrowGameData);

  const date = new Date();
  const formattedDateForAPI = format(date, "yyyy-MM-dd");

  const getNextDate = (dateString, daysToAdd) => {
    const currentDate = new Date(dateString);
    const nextDate = add(currentDate, { days: daysToAdd });
    return nextDate;
  };

  const {
    isLoading: loadingTeams,
    isError: teamError,
    data: teamsData,
  } = useQuery(["today-games", formattedDateForAPI, "NHL"], getGames, {
    onSuccess: (fetchedData) => {
      console.log("fetchedData", fetchedData);
      setGameData(fetchedData.data);
    },
    onError: (error) => {
      console.error("An error occurred:", error);
    },
  });

  const tomorrow = add(date, { days: 1 });
  const formattedDateForTomorrow = format(tomorrow, "yyyy-MM-dd");

  const {
    isLoading: loadingTomorrowGames,
    isError: tomorrowGamesError,
    data: tomorrowGamesData,
  } = useQuery(["tomorrows-games", formattedDateForTomorrow, "NHL"], getGames, {
    onSuccess: (fetchedData) => {
      console.log("fetchedTomorrowData", fetchedData);
      setTomorrowGameData(fetchedData.data);
    },
    onError: (error) => {
      console.error("An error occurred:", error);
    },
  });

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = date.toLocaleDateString("en-US", options);
  const nextFormattedDate = getNextDate(formattedDate, 1).toLocaleDateString(
    "en-US",
    options
  );

  const tomorrowGames = tomorrowGameData.filter((game) => {
    const gameDate = new Date(game.date); // Assuming your game objects have a 'date' property
    return gameDate.toDateString() === tomorrow.toDateString();
  });

  return (
    <div className=" w-full">
      <HeroSection imgUrl={heroImg} />
      <MainNavBar />
      <Line />
      <Banner date={formattedDate} label={"Upcoming Games"} />
      <div className=" grid grid-cols-2 gap-4 ">
        {gameData && gameData.length > 0 ? (
          gameData.map((game, index) =>
            index % 2 === 0 ? (
              <GameCard key={game.id} gameData={game} isAdmin={isAdmin} />
            ) : (
              <GamerCardRight key={game.id} gameData={game} />
            )
          )
        ) : (
          <p className="text-white">No games available.</p>
        )}
      </div>

      <div className=" my-2">
        <Line />
      </div>

      <div className=" flex gap-8 my-4">
        <div>
          <img src={img1} alt="img1" className=" w-full" />
        </div>
        <div>
          <img src={img2} alt="img2" className=" w-full" />
        </div>
      </div>
      <Banner date={nextFormattedDate} label={"Tomorrow's Games"} />
      <div className=" grid grid-cols-2 gap-4 ">
        {tomorrowGameData ? (
          tomorrowGameData.length > 0 ? (
            tomorrowGameData.map((game, index) =>
              index % 2 === 0 ? (
                <GameCard key={game.id} gameData={game} isAdmin={isAdmin} />
              ) : (
                <GamerCardRight key={game.id} gameData={game} />
              )
            )
          ) : (
            <p className="text-white">No games available for tomorrow.</p>
          )
        ) : (
          <p className="text-white">Loading tomorrow's games...</p>
        )}
      </div>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default Games;
