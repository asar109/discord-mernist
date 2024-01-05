import { InitialModal } from '@/components/modals/initialModal'
import { db } from '@/lib/db'
import { intialProfile } from '@/lib/initial-profile'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Main()  {
 const profile = await  intialProfile()



 const server = await db.server.findFirst({
    where : {
        members : {
            some : {
                profileId : profile.id
            }
        }
    }
 })



 if(server){
    return redirect(`/servers/${server.id}`)
 }



  return <InitialModal/>
}
