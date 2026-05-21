'use client'
import React,{useState} from 'react'

import RemotionComposition from '@/app/_components/RemotionComposition'
import { Player } from "@remotion/player";
function RemotionPlayer({videoData}){

   const[durationInFrames,setDurationInFrame]=useState(100)
    return (
        <div>
             <Player
      component={RemotionComposition}
      durationInFrames={Math.floor(durationInFrames || 300)}
      compositionWidth={720}
      compositionHeight={1280}
      fps={30}
      controls
      style={{
        width:'25vw',
        height:'70vh'
      }}
      inputProps={{
        videoData:videoData,
        setDurationInFrame:(frameValue)=>setDurationInFrame(frameValue)
      }}
    />
        </div>
    )
}

export default RemotionPlayer