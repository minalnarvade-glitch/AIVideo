"use client";

import React, { useState } from "react";
import Topic from "./_components/Topic";
import VideoStyle from "./_components/VideoStyle";
import Voice from "./_components/Voice";
import Captions from "./_components/Captions";
import Preview from "./_components/Preview";
import { Button } from "@/components/ui/button";
import { WandSparkles } from "lucide-react";
import axios from "axios";
import {useMutation} from 'convex/react'
import {api} from "@/convex/_generated/api"
import {useAuthContext} from "@/app/provider";
import {Loader2Icon} from "lucide-react";
import {toast} from 'sonner';
function CreateNewVideo() {
  const [formData, setFormData] = useState({});
  const CreateInitialVideoRecord=useMutation(api.videoData.CreateVideoData);
  const {user}=useAuthContext();
  const [loading,setLoading]=useState(false);
  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

 const GenerateVideo = async () => {
  console.log("FORM DATA:", formData);

const result = await axios.post("/api/generate-script", {
  ...formData,
});
  if(user?.credits<=0){
    toast('Please add more credits!')
    return;
  }
  if(!user || !user.id){
    console.log("user not loaded yet");
    return;
  }
  if (
    !formData.topic ||
    !formData.videoStyle ||
    !formData.voice
  ) {
    console.log("ERROR: Fill all fields");
    return;
  }
setLoading(true);
  

  try {
    // 1. Generate script FIRST
    const result = await axios.post("/api/generate-script", {
      ...formData,
    });

 const rawScript = result.data.script || result.data;

const script =
  typeof rawScript === "string"
    ? rawScript
    : rawScript?.scripts
        ?.map((s) => s.content)
        .join("\n\n") || "";
    console.log("SCRIPT:", script);

    // 2. Save to Convex AFTER script generation
    const resp = await CreateInitialVideoRecord({
      title: formData.title || "Untitled",
      topic: formData.topic,
      script: script,
      videoStyle: formData.videoStyle,
      
      voice: formData.voice,
       caption: formData.caption, 
      uid: user.id,
      createdBy: user.email,
      credits:user?.credits ||0
    });
console.log("FORM DATA:", formData);
    console.log("SAVED:", resp);
  const payload = {
  ...formData,
  script: script,
  recordId: resp,
};

console.log("SENDING TO API:", payload);

const result1 = await axios.post(
  '/api/generate-video-data',
  payload
);
    console.log(result1);
   setLoading(false);
    

  } catch (error) {
     console.error("ERROR:", error);

 
  }
  
};
  return (
    <div>
      <h2 className="text-3xl">Create New Video</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mt-8">
        <div className="col-span-2 p-7 border rounded-xl h-[70vh] overflow-auto">
          <Topic onHandleInputChange={onHandleInputChange} />
          <VideoStyle onHandleInputChange={onHandleInputChange} />
          <Voice onHandleInputChange={onHandleInputChange} />
          <Captions onHandleInputChange={onHandleInputChange} />

          <Button className="w-full mt-5" 
          disabled={loading}
          onClick={GenerateVideo}
          >{loading?<Loader2Icon className='animate-spin'/>:<WandSparkles /> }Generate Video
          </Button>
        </div>

        <Preview formData={formData} />
      </div>
    </div>
  );
}

export default CreateNewVideo;