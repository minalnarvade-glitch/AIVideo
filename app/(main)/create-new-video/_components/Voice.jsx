import React,{useState} from 'react'

const voiceOptions = [
  // 🌍 International Voices
  {
    value: "af_sarah",
    name: "🇺🇸 Sarah (USA Female)",
    country: "USA"
  },
  {
    value: "am_adam",
    name: "🇺🇸 Adam (USA Male)",
    country: "USA"
  },
  {
    value: "bf_emma",
    name: "🇬🇧 Emma (UK Female)",
    country: "UK"
  },
  {
    value: "bm_george",
    name: "🇬🇧 George (UK Male)",
    country: "UK"
  },

  // 🇮🇳 Indian Voices
  {
    value: "if_priya",
    name: "🇮🇳 Priya (Hindi Female)",
    country: "India"
  },
  {
    value: "im_rahul",
    name: "🇮🇳 Rahul (Hindi Male)",
    country: "India"
  },
  {
    value: "if_kavya",
    name: "🇮🇳 Kavya (Tamil Female)",
    country: "India"
  },
  {
    value: "im_arjun",
    name: "🇮🇳 Arjun (Indian English Male)",
    country: "India"
  }
];
function Voice({onHandleInputChange}){
    const [selectedVoice,setSelectedVoice]=useState();
    return(
        <div className='mt-5'>
            <h2>Video Voice</h2>
            <p className='text-sm text-gray-400'>Select voice for your video</p>
            <div className='grid grid-cols-2 gap-3'>
                {voiceOptions.map((voice,index)=>(
                    <h2 className={`cursor-pointer p-3 dark:bg-slate-900 
                    dark:border-white rounded-lg hover:border ${voice.name==selectedVoice && 'border-white'}`} 
                    onClick={()=>{setSelectedVoice(voice.name),onHandleInputChange('voice',voice.value)}}
                    key={index}>{voice.name}</h2>
                ))}
            </div>
        </div>
    )
}
export default Voice