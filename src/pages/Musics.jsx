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
import LikeButton from "../components/LikeButton";

function Musics() {
  const [data, setData] = useState(null);
  const params = useParams()
  const [isClick, setIsClick] = useState(true)
  const [music, setMusic] = useState(null)

  function handleClick() {
    if (isClick) {
      setIsClick(false)
    } else {
      setIsClick(true)
    }
  }
  function msToFormattedTime(milliseconds) {
    // Ensure milliseconds is a number
    if (typeof milliseconds !== 'number' || isNaN(milliseconds)) {
      console.error('Invalid input: milliseconds must be a number');
      return '00:00';
    }

    // Calculate minutes and seconds
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    // Format minutes and seconds with leading zeros
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  // Example usage
  const someMilliseconds = 1050000; // 2 minutes 30 seconds
  const formattedTime = msToFormattedTime(someMilliseconds);

  console.log(`${someMilliseconds} milliseconds is ${formattedTime}`);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_MUSIC}playlists/${params.id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(d => {
        console.log(d);
        setData(d)
        msToFormattedTime(d[0]?.track.duration_ms)
      })

  }, [])
  return (
    <div className=" w-[100%] bg-[#121212] pb-20">
      <div className="flex pt-[100px]  p-16 gap-10  bg-gradient-to-b from-[#cade2f] from-2% via-[#8b8b3d] via-5% to-[#121212] to-40%  bg-[#121212] bg-100% mx-auto  w-[60%] flex-wrap  items-center   ">
        <div className="">
          <img
            src={data?.images[0].url}
            alt={data?.name}
            className="w-[279px] h-[279px]  rounded-lg "
          />
        </div>
        <div>
          <span className="text-white text-[16px]">PUBLIC PLAYLIST</span>
          <h3 className="uppercase text-[122px] text-white font-bold">
            {data?.name}
          </h3>
          <p className="text-white">{data?.description}</p>
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
        {data?.tracks.items.map((el, i) => {
          // let copied = JSON.parse(JSON.stringify(el.track))
          return (
            <div key={i} onClick={() => { setMusic(el.track.preview_url)}} className="flex justify-between mb-4 cursor-pointer w-[786px] mx-auto items-center text-[#B3B3B3] transition-all hover:opacity-65">
              <h3 className="text-[22px]">{i + 1}</h3>
              <h3 className=""><img src={el.track.album.images[2].url} alt="" /></h3>
              <div className=" gap-[2px]">
                <h3 className="text-5">{el.track.name}</h3>
                <h3 className="text-[18px]">{el.track.artists[0].name}</h3>
              </div>
              <h3 className=" text-[18px]">{el.track.album.artists[0].name}</h3>
              <LikeButton song={el.track} />
              <div className="text-white text-5">{msToFormattedTime(el.track.duration_ms)}</div>
            </div>
          )
        })}
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

export default Musics;