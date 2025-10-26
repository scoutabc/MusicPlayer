//import { Play } from "lucide-react"
import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
//import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import stopOrBegin from "./assets/Play_fill.svg";
import { Button } from "./components/ui/button";
import { Slider } from "./components/ui/slider";
import Previous from "./assets/Stop_and_play_fill-1.svg"
import Next from "./assets/Stop_and_play_fill.svg"

type MusicPlayerProps = {
  imageSrc: string;
  musicName: string;
  creator: string;
  musicSrc: string;
  music:number;
  setMusic: React.Dispatch<React.SetStateAction<number>>;
  listLength: number;
};

export default function MusicPlayer({
  imageSrc,
  musicName,
  creator,
  musicSrc,
  music,
  setMusic,
  listLength,
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    }
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio) {
      setDuration(audio.duration);
    }
  };

  const handleSeek = (val: number[]) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = (val[0] / 100) * duration;
      setProgress(val[0]);
    }
  };
  return (
    <>
      <Card className="w-full max-w-sm p-5 bg-[#212936] text-[#E5E7EB]">
        <img src={imageSrc} className="w-[380px] rounded-xl"></img>
        <CardHeader>
          <CardTitle className="text-[16px] -mt-3">{musicName}</CardTitle>
          <p className="text-[#4D5562] text-[12px]">{creator}</p>
        </CardHeader>
        <CardContent>
          <audio
            ref={audioRef}
            hidden
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          >
            <source src={musicSrc} type="audio/mpeg"></source>
          </audio>
          <div className="-mt-2 mb-5">
            <div className="flex justify-between text-sm text-gray-500 mt-1 text-[10px] mb-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
            </div>
            <Slider
              value={[progress]}
              max={100}
              step={0.1}
              onValueChange={handleSeek}
              className=""
            />
          </div>
          <Button
          className="bg-transparent hover:bg-transparent"
          onClick={() => {
                if(music !== 0) {
                    setMusic(music-1)
                }
            }}
          >
            <img src={Previous}></img>
          </Button>
          <Button
            className="bg-[#C93B76] hover:bg-[bg-[#C93B76]] rounded-full w-14 h-14"
            onClick={() => {
              if (isPlaying === false) {
                audioRef.current?.play();
                setIsPlaying(true);
              } else {
                audioRef.current?.pause();
                setIsPlaying(false);
              }
            }}
          >
            <img src={stopOrBegin} className=""></img>
          </Button>
          <Button
          className="bg-transparent hover:bg-transparent"
          onClick={
            () => {
                if (music !== listLength - 1) {
                    setMusic(music + 1)
                }
            }
          }
          >
            <img src={Next}></img>
          </Button>
        </CardContent>
      </Card>
    </>
    )
}

function formatTime(time:number) {
  if (isNaN(time)) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
