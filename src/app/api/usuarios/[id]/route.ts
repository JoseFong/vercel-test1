import { deleteUser } from "@/Controllers/usuarioController";
import {prisma} from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server";

interface Params{
    id: string
}

export async function DELETE(req:NextRequest,{params}:{params:{id:string}}){
    try{
        const id = await parseInt(params.id)
        const user = await deleteUser(id)
        if(!user) return NextResponse.json({message:"Hubo un error al eliminar al usuario."},{status:404})
        return NextResponse.json(user)
    }catch(e:any){
        return NextResponse.json({message:"Error interno del servidor: "+e.message},{status:500})
    }
}