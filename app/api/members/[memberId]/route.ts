import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";



export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      memberId: string;
    };
  }
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");

    if (!profile) {
      return new NextResponse("Unathorized", { status: 401 });
    }

    if ( !serverId || !params.memberId) {
      return new NextResponse("Something missing", { status: 400 });
    }

    const updatedServer = await db.server.update({
        where : {
            id : serverId,
            profileId : profile.id
        },
       data : {
        members : {
          deleteMany : {
            id : params.memberId,
            profileId : {
              not : profile.id
            }
          }
        }
       },
       include : {
        members : {
            include : {
                profile : true
            },
            orderBy : {
                role : 'asc'
            }
        }
       }
    })





    if(!updatedServer) {
        return new  NextResponse('Sever not found' , {status : 404})
    }

    return NextResponse.json(updatedServer);
  } catch (error) {
    console.log(`MEMBER_ID ${error}`);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}


// update user role

export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      memberId: string;
    };
  }
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const {role} = await req.json()
    const serverId = searchParams.get("serverId");

    if (!profile) {
      return new NextResponse("Unathorized", { status: 401 });
    }

    if ( !serverId || !params.memberId) {
      return new NextResponse("Something missing", { status: 400 });
    }

    const updatedServer = await db.server.update({
        where : {
            id : serverId,
            profileId : profile.id
        },
       data : {
        members : {
            update : {
                where : {
                    id  : params.memberId,
                    profileId : {
                        not : profile.id
                    }
                },
                data : {
                    role
                }
            }
        }
       },
       include : {
        members : {
            include : {
                profile : true
            },
            orderBy : {
                role : 'asc'
            }
        }
       }
    })





    if(!updatedServer) {
        return new  NextResponse('Sever not found' , {status : 404})
    }

    return NextResponse.json(updatedServer);
  } catch (error) {
    console.log(`MEMBER_ID ${error}`);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
