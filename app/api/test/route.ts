import { NextResponse } from "next/server";

export async function GET(req: Request) {

    NextResponse.json({
        success: true,
        message : "api working fine"
    })

 
}
