
import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, {params}){
    const id =params.id;
    try{
        const users = await prisma.user.findUnique({
            where:{
                id:id,
            },
        })
        return NextResponse.json(users);
    }
    catch (error){
        console.log("Error al obtener el usuario");
        return new Response('Error', { status : 500});
    }
}