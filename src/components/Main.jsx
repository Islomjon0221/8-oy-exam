import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import right from "../assets/Forward.svg"
import left from "../assets/Back.svg"
function Main() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_MUSIC}browse/featured-playlists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          throw new Error("Connection error");
        }
        return res.json();
      })
      .then((d) => {
        setData(d.playlists.items);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  if (error) {
    return <div className="h-screen bg-[#121212] text-white text-center pt-[34%] text-[24px]">Error: {error.message}</div>;
  }

  if (!data) {
    return <div className="h-screen bg-[#121212] text-white text-center pt-[34%] text-[24px]">Loading...</div>;
  }
  function handlePlaylist(id, el) {
    navigate(`/playlist/${id}`, { state: { id: id, el } });
  }
  console.log(data.collaborative);
  return (
    <div className="relative">
      <div className="">
        <div className="w-[100%] bg-gradient-to-b from-[#3333A3]  to-[#121212] to-100%  bg-[#121212] bg-100% ">
          <div className="pl-10 pt-5 flex gap-5">
            <img src={left} width={40} alt="" />
            <img src={right} width={40} alt="" />
          </div>
          <h3 className="pl-10 mb-[19px] mt-[50px] text-[49px] font-semibold text-white">Good afternoon</h3>
          <div className="flex flex-wrap w-[100%] px-10">
            {
              data.slice(0, 6).map((el, i) => {
                return (
                  <div className="w-[46%] mb-4 h-[82px] cursor-pointer mr-[33px] items-center flex bg-[rgba(255,255,255,0.1)] transition-all duration-300 hover:opacity-75 rounded-lg" key={i} onClick={() => handlePlaylist(el.id, el)}>
                    <img src={el.images[0].url} alt={el.name} width={82} className="rounded-bl-lg rounded-tl-lg object-cover" />
                    <h1 className="font-semibold text-5 text-white capitalize ml-5">{el.name}</h1>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="w-[100%] bg-[#121212] flex flex-wrap justify-center gap-4 items-center pt-[100px] ">
          {data.slice(6).map((el, index) => (
            <div key={index} className="w-[30%] h-full mb-[50px]">
              <div
                onClick={() => handlePlaylist(el.id, el)}
                className=" p-3 rounded-lg min-h-[400px] cursor-pointer bg-[#1B1B1B] text-[#B3B3B3] transition-all duration-300 hover:bg-[#414040]"
              >
                <img
                  src={el.images[0].url}
                  alt={el.name}
                  className=" rounded-lg object-cover mb-6"
                />
                <h1 className="text-[16px] uppercase mb-2 text-white">{el.name}</h1>
                <span className="text-[12px]">{el.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Main;
