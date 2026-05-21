"use client"
import React,{useState,useEffect} from 'react'
import {useConvex} from 'convex/react'
import VideoInfo from '../_components/VideoInfo';
import {api} from '@/convex/_generated/api';
import {useParams} from 'next/navigation'
import RemotionPlayer from '../_components/RemotionPlayer';
function PlayVideo(){
    const {videoId}=useParams();
    const convex=useConvex();
    const [videoData,setVideoData]=useState();
    useEffect(()=>{
        videoId&&GetVideoDataById();
    },[videoId])
    const GetVideoDataById=async()=>{
     const result=await convex.query(api.videoData.GetVideoById,{
        videoId:videoId
     });
     console.log(result);
     setVideoData(result);
    }
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            <div>
                    {/*Remotion Player*/}
                    <RemotionPlayer videoData={videoData}/>
            </div>
             <div>
                 {/**Video Information */}
                 <VideoInfo videoData={videoData}/>
             </div>
        </div>
    )
}
export default PlayVideo