import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import options from "../assets/Options_XS.svg"
import like from "../assets/Heart_XS.svg"
import play from "../assets/Play_Greem Hover.svg"
import stop from "../assets/Pause_Greem Hover.svg"
import dowload from "../assets/Download_XS.svg"
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import clock from "../assets/Clock_XS.svg"
import likeImg from "../assets/like.svg";

function Likes() {
  const params = useParams()
  const [music, setMusic] = useState(null)
  const [isClick, setIsClick] = useState(true)
  console.log(params.id);
  function handleClick() {
    if (isClick) {
      setIsClick(false)
    } else {
      setIsClick(true)
    }
  }
  const [likedSongs, setLikedSongs] = useState([]);

  useEffect(() => {
    const songs = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('liked-')) {
        const song = JSON.parse(localStorage.getItem(key));
        songs.push(song);
      }
    }
    setLikedSongs(songs);
  }, []);
  function msToFormattedTime(milliseconds) {
    if (typeof milliseconds !== 'number' || isNaN(milliseconds)) {
      console.error('Invalid input: milliseconds must be a number');
      return '00:00';
    }

    const minutes = Math.floor(milliseconds / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  const someMilliseconds = 1050000;
  const formattedTime = msToFormattedTime(someMilliseconds);

  console.log(`${someMilliseconds} milliseconds is ${formattedTime}`);
  return (
    <div className="bg-[#121212] w-[100%] pb-20">
      <div className="flex pt-[100px]  p-16 gap-10  bg-gradient-to-b from-[#604EC1]  to-[#121212] to-100%  bg-[#121212] bg-100%  w-[100%] flex-wrap  items-center   ">
        <div>
          <img
            src={likeImg}
            className="w-[279px] h-[279px]  rounded-lg "
          />
        </div>
        <div>
          <span className="text-white text-[16px]">PUBLIC PLAYLIST</span>
          <h3 className="text-[62px] text-white font-bold">
            Liked Songs
          </h3>
        </div>
      </div>
      <div className="bg-[#121212]">
        <div className="w-[786px] gap-6 mx-auto flex">
          <img onClick={handleClick} className="cursor-pointer hover:opacity-70 transition-all duration-300" src={isClick ? play : stop} alt="" />
          <img src={like} className="cursor-pointer hover:opacity-70 transition-all duration-300" alt="" />
          <img src={dowload} className="cursor-pointer hover:opacity-70 transition-all duration-300" alt="" />
          <img src={options} className="cursor-pointer hover:opacity-70 transition-all duration-300" alt="" />
        </div>
      </div>
      <div className="bg-[#121212] flex flex-col">
        <div className="flex w-[786px] mx-auto items-center text-[#B3B3B3] border-b-2 border-[#B3B3B3] mb-[22px]">
          <h3 className="mr-[19px]">#</h3>
          <h3 className="mr-[291px]">TITLE</h3>
          <h3 className="mr-[120px]">ALBUM</h3>
          <h3 className="mr-[110px]">DATE ADDED</h3>
          <h3><img src={clock} alt="" /></h3>
        </div>
        {likedSongs.length > 0 ? (
          likedSongs.map((song, i) => {
            console.log(116, song);
            return (
              <div key={i} onClick={() => { setMusic(song.preview_url) }} className="flex justify-between mb-4 cursor-pointer w-[786px] mx-auto items-center text-[#B3B3B3] transition-all hover:opacity-65">
                <h3 className="text-[22px]">{i + 1}</h3>
                <h3 className=""><img src={song.album.images[2].url} alt="" /></h3>
                <div className=" gap-[2px]">
                  <h3 className="text-5">{song.name}</h3>
                  <h3 className="text-[18px]">{song.artists[0].name}</h3>
                </div>
                <h3 className=" text-[18px]">{song.album.artists[0].name}</h3>
                <div className="text-white text-5">{msToFormattedTime(song.duration_ms)}</div>
              </div>
            )
          })
        ) : (
          <p className="text-white">No liked songs</p>
        )}
      </div>
      <div className="w-[100%] z-50 left-[-1px] fixed bottom-[-1px]">
        <AudioPlayer
          autoPlay
          src={music}
        />

      </div>

    </div>
  );
}

export default Likes
