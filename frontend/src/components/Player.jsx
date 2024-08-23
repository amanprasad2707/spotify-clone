import React, { useContext } from "react";
import { assets, songsData } from "../assets/assets";
import { PlayerContext } from "../Context/PlayerContext.jsx";
const Player = () => {
  const {
    seekBar,
    seekBg,
    playerStatus,
    play,
    pause,
    track,
    time,
    previous,
    next,
    seekSong,
  } = useContext(PlayerContext);
  return track ? (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
      <div className="hidden lg:flex items-center gap-4">
        <img src={track.image} alt="song_image" className="w-12" />
        <div>
          <p>{track.name}</p>
          <p>{track.desc.slice(0, 12)}</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          <img
            src={assets.shuffle_icon}
            alt="shuffle_icon"
            className="w-4 cursor-pointer"
          />
          <img
            onClick={previous}
            src={assets.prev_icon}
            alt="prev_icon"
            className="w-4 cursor-pointer"
          />
          {playerStatus ? (
            <img
              onClick={pause}
              src={assets.pause_icon}
              alt="pause_icon"
              className="w-4 cursor-pointer"
            />
          ) : (
            <img
              onClick={play}
              src={assets.play_icon}
              alt="play_icon"
              className="w-4 cursor-pointer"
            />
          )}

          <img
            onClick={next}
            src={assets.next_icon}
            alt="next_icon"
            className="w-4 cursor-pointer"
          />
          <img
            src={assets.loop_icon}
            alt="loop_icon"
            className="w-4 cursor-pointer"
          />
        </div>
        <div className="flex items-center gap-5">
          <p>
            {time.currentTime.minute}:{time.currentTime.second}
          </p>
          <div
            ref={seekBg}
            onClick={seekSong}
            className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
          >
            <hr
              ref={seekBar}
              className="h-1 border-none w-0 bg-green-800 rounded-full"
            />
          </div>
          <p>
            {time.totalTime.minute}:{time.totalTime.second}
          </p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <img src={assets.play_icon} alt="play_icon" className="w-4" />
        <img src={assets.mic_icon} alt="mic_icon" className="w-4" />
        <img src={assets.queue_icon} alt="queue_icon" className="w-4" />
        <img src={assets.speaker_icon} alt="speaker_icon" className="w-4" />
        <img src={assets.volume_icon} alt="volume_icon" className="w-4" />

        <div className="w-20 bg-slate-50 h-1 rounded"></div>

        <img
          src={assets.mini_player_icon}
          alt="mini_player_icon"
          className="w-4"
        />
        <img src={assets.zoom_icon} alt="zoom_icon" className="w-4" />
      </div>
    </div>
  ) : null;
};

export default Player;