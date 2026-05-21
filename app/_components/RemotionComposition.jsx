'use client'

import React, { useEffect } from 'react'
import {
  AbsoluteFill,
  useVideoConfig,
  Img,
  interpolate,
  Sequence,
  useCurrentFrame,
  Audio
} from 'remotion';

function RemotionComposition({
  videoData,
  setDurationInFrame
}) {

  const captions = videoData?.captionJson || [];
  const imageList = videoData?.images || [];

  const { fps } = useVideoConfig();
  const frame=useCurrentFrame();
  // ✅ Calculate ONCE
  const totalDuration =
  captions.length > 0
    ? Number(captions[captions.length - 1]?.end || 0) * fps
    : 300;

  // ✅ Safe state update
  useEffect(() => {
    if (setDurationInFrame) {
      setDurationInFrame(totalDuration);
    }
  }, [totalDuration, setDurationInFrame]);
const getCurrentCaption=()=>{
  const currentTime=frame/30;
  const currentCaption=captions?.find((item)=>currentTime>=item?.start && currentTime<=item?.end)
  return currentCaption?currentCaption?.word:'';
}
  return (
    <div>
    <AbsoluteFill>

     {imageList.map((item, index) => {

  const imageCount = imageList.length || 1;

  const safeTotalDuration =
    totalDuration > 0 ? totalDuration : 300;

  // duration for EACH image
  const singleImageDuration =
    Math.floor(safeTotalDuration / imageCount);

  // when image should start
  const startTime =
    index * singleImageDuration;
const scale = interpolate(
  frame,
  [
    startTime,
    startTime + singleImageDuration / 2,
    startTime + singleImageDuration
  ],
  index % 2 === 0
    ? [1, 1.1, 1]
    : [1.1, 1, 1.1],
  {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  }
);
  return (
    <Sequence
      key={index}
      from={startTime}
      durationInFrames={singleImageDuration}
    >
      <AbsoluteFill>
        <Img
          src={item}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform:`scale(${scale})`
          }}
        />
      </AbsoluteFill>
    </Sequence>
  );
})}
  </AbsoluteFill>
<AbsoluteFill
style={{
  color:'white',
  justifyContent:'center',
  bottom:50,
  height:150,
  textAlign:'center'
}}>
  <h2>{getCurrentCaption()}</h2>
</AbsoluteFill>
    {videoData?.audioUrl &&<Audio src={videoData?.audioUrl}/>}
 </div>
  )
}

export default RemotionComposition;