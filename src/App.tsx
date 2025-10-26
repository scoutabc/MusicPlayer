import "./App.css";
import MusicPlayer from "./MusicPlayer";
import cover1 from "./assets/cover-1.jpg";
import track1 from "./assets/lost-in-city-lights-145038.mp3";
import cover2 from "./assets/cover-2.jpg"
import track2 from "./assets/forest-lullaby-110624.mp3"
import { useState } from "react";

class MusicItem {
  constructor(cover:string,track:string,name:string,creator:string) {
    this.cover = cover;
    this.track = track;
    this.name = name;
    this.creator = creator;
  }
  cover
  track
  name
  creator
}
const MusicList = [
  new MusicItem(cover1,track1,"Lost in the City Lights","Cosmo Sheldrake"),
  new MusicItem(cover2,track2,"Forest Lullaby","Lesfm")
]

export default function App() {
  const [music,setMusic] = useState(0)
  return (
    <MusicPlayer
      imageSrc={MusicList[music].cover}
      musicName={MusicList[music].name}
      creator={MusicList[music].creator}
      musicSrc={MusicList[music].track}
      music={music}
      setMusic={setMusic}
      listLength={2}
    />
  );
}