import { currentProfile } from '@/lib/currentProfile'
import { db } from '@/lib/db'
import { redirectToSignIn } from '@clerk/nextjs'
import { ChannelType, Server } from '@prisma/client'
import React from 'react'
import ServerHeader from './server-header'
import { redirect } from 'next/navigation'

interface ServersidebarProps {
    serverId :  string,

}



const ServerSidebar = async ({serverId } : ServersidebarProps) => {

    const profile = await currentProfile()

    if(!profile){
        return redirectToSignIn()
    }



    const server = await db.server.findUnique({
      where: {
        id: serverId,
      },
      include: {
        channels: {
          orderBy: {
            createdAt: "asc",
          },
        },
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          }
        }
      }
    });



    const textChannels = server?.channels.filter((channel)=>channel.type === ChannelType.TEXT)
    const audioChannels = server?.channels.filter((channel)=>channel.type === ChannelType.AUDIO)
    const videoChannels = server?.channels.filter((channel)=>channel.type === ChannelType.VIDEO)
    const members = server?.members.filter((member)=>member.profileId !== profile.id)
    const role = server?.members.find((member)=>member.profileId === profile.id)?.role




    if (!server) {
      return redirect("/");
    }

    return (
    <div className='w-full flex-col text-primary dark:bg-[#2b2d31] bg-[#f2f3f5]  h-full' >

      <ServerHeader server={server} role={role} />

    </div>
  )
}

export default ServerSidebar