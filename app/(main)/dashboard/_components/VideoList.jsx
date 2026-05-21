"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import moment from 'moment';
import {RefreshCcw} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

function VideoList() {

  const [videoList, setVideoList] = useState([]);

  const convex = useConvex();

  useEffect(() => {

    GetUserVideoList();

  }, []);

  const GetUserVideoList = async () => {

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) return;

    const result = await convex.query(
      api.videoData.GetUserVideos,
      {
        uid: session.user.id,
      }
    );

   console.log("FULL VIDEO DATA:");
console.log(JSON.stringify(result, null, 2));

    setVideoList(result);
    
const pendingVideo = result?.find(
  (item) => item.status === "pending"
);

if (pendingVideo) {
  GetPendingVideoStatus(pendingVideo);
}
  };

  const GetPendingVideoStatus=(pendingVideo)=>{
   const intervalId=setInterval(async()=>{
      const result=await convex.query(api.videoData.GetVideoById,{
        videoId:pendingVideo?._id
      })
      if(result?.status=='completed'){
        clearInterval(intervalId);
        console.log("Video Proccess Completed");
        GetUserVideoList();
      }
      console.log('still Pending...')
   },5000)
  }

  return (
    <div>

      {videoList?.length === 0 ? 
        <div
          className="flex flex-col items-center
          justify-center mt-28 gap-5 p-5
          border border-dashed rounded-xl py-16"
        >

          <Image
            src={"/logo.svg"}
            alt="logo"
            width={60}
            height={60}
          />

          <h2 className="text-gray-400 text-lg">
            You dont have any video created.
            Create new one
          </h2>

          <Link href={"/create-new-video"}>
            <Button>+ Create New Video</Button>
          </Link>

        </div>

      :
      <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mt-10'>
        {videoList?.map((video,index)=>(
          <Link key={video._id} href={'/play-video/'+video?._id}>
            <div  className='relative'>
              {
typeof video?.images?.[0] === "string" &&
video.images[0].trim() !== "" ? (

  <div className="w-full h-[300px] rounded-xl overflow-hidden bg-gray-900">

 
  <img
    src={video.images[0]}
    alt="thumbnail"
    className="w-full h-full object-cover"
    referrerPolicy="no-referrer"
    onError={(e) => {
      e.currentTarget.src =
        "https://placehold.co/600x900/111827/FFFFFF?text=No+Preview";
    }}
  />

</div>

) : (

  <div className='aspect-[2/3] p-5 w-full rounded-xl bg-slate-900 flex items-center justify-center gap-2'>
    <RefreshCcw className='animate-spin'/>
    <h2>Generating...</h2>
  </div>

)}
                <div className='absolute bottom-3 px-5 w-full'>
                    <h2>{video?.title}</h2>
                    <h2 className='text-sm'>{moment(video?._creationTime).fromNow()}</h2>
                    </div>
                </div>

            </Link>   
        ))}
        </div> 
      }

    </div>
  );
}

export default VideoList;