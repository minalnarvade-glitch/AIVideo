import { mutation,query } from "./_generated/server";
import { v } from "convex/values";

export const CreateVideoData = mutation({
  args: {
    title: v.string(),
    topic: v.string(),
    script: v.string(),
    videoStyle: v.string(),
    voice: v.string(),
    caption: v.optional(v.string()),
    uid: v.string(),
    createdBy: v.string(),
    credits:v.number()
  },

  handler: async (ctx, args) => {
    const result = await ctx.db.insert("videoData", {
      title: args.title,
      topic: args.topic,
      script: args.script,
      videoStyle: args.videoStyle,
      voice: args.voice,
      caption: args.caption,
      uid: args.uid,          // ✅ FIXED
      createdBy: args.createdBy, // ✅ FIXED
     status:'pending'
    });
    const user = await ctx.db
  .query("users")
  .filter((q) => q.eq(q.field("uid"), args.uid))
  .first();

if (user) {
  await ctx.db.patch(user._id, {
    credits: user.credits - 1,
  });
}
    return result;
  },
});


export const UpdateVideoRecord=mutation({
    args:{
        recordId:v.id('videoData'),
        audioUrl:v.string(),
        images:v.any(),
        captionJson:v.any()
    },
    handler:async(ctx,args)=>{
      const result=await ctx.db.patch(args.recordId,{
        audioUrl:args.audioUrl,
        captionJson:args.captionJson,
        images:args.images,
        status:'completed'
      });
      return result;
    }
})


export const GetUserVideos = query({
  args: {
    uid: v.string()
  },

  handler: async (ctx, args) => {

    const result = await ctx.db
      .query('videoData')
      .filter(q => q.eq(q.field('uid'), args.uid))
      .order('desc')
      .collect();

    return result;
  }
})

export const GetVideoById=query({
  args:{
    videoId:v.id('videoData')
  },
  handler:async(ctx,args)=>{
    const result=await ctx.db.get(args.videoId);
    return result;
  }
})