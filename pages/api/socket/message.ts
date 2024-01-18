import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "@/types";
import { currentProfilePages } from "@/lib/currentProfilePages";
import {db}  from '@/lib/db'

const message = async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const profile = await currentProfilePages(req);
    const {channelId , serverId} = req.query
    const {content , fileUrl} = req.body
    if (!profile) return res.status(401).json({ error: "Unauthorized" });
    if (!channelId) return res.status(400).json({ error: "Channel ID Missing" });
    if (!serverId) return res.status(400).json({ error: "Server ID Missing" });
    if (!content) return res.status(400).json({ error: "Content Missing" });


    
    const server = await db.server.findUnique({
      where : {
        id  : serverId as string,
        members  : {
          some : {
            profileId : profile.id
          }
        }
      },
      include : {
        members : true
      }
    })


if(!server){
  return res.status(404).json({error : 'Server not found'})
}
    

const channel = await db.channel.findUnique({
  where : {
    id : channelId as string,
    serverId : serverId as string
  }
})


if(!channel){
  return res.status(404).json({error : 'Channel not found'})

}


const member = server.members.find((member)=> member.profileId === profile.id)

if(!member){
  return res.status(404).json({error : 'Member not found'})
}


const message = await  db.message.create({
   data : {
    content,
    fileUrl,
    memberId : member.id,
    channelId : channelId as string
   },
   include : {
    member : {
      include : {
        profile : true
      }
    }
   }
})


const channelKey = `chat:${channelId}:messages`


res?.socket?.server?.io?.emit(channelKey , message)


res.status(201).json({message})

  } catch (error) {
    console.log(`[MESSAGE_API] : ${Error}`);
    res.status(500).json({ error: error });
  }
};

export default message;
