import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import {v4 as uuid4} from 'uuid'

export async function POST(req : NextRequest){

    try {

        const {imageUrl , name} = await req.json()
        

        const profile = await currentProfile()

        if(!profile ){
            return new NextResponse('Unauthorized' , {status : 401})
        }


    const server = await db.server.create({
        data : {
            imageUrl,
            name,
            inviteCode : uuid4(),
            profileId : profile.id,
            channels : {
                create : {
                    name : "general",
                    profileId : profile.id
                }
            },
            members : {
                create : {
                    profileId : profile.id,
                    role  : MemberRole.ADMIN
                }
            }

        }
    })



return NextResponse.json(server)


    } catch (error) {
        console.log(`servers ${error}`)
        return new NextResponse('Internal server error' , {status : 500})
    }

}