import { deleteUser } from "@/Controllers/usuarioController";
import {prisma} from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server";

interface Params{
    id: string
}

export async function DELETE(req:NextRequest){
    try{
        const url = new URL(req.url);
        const id = url.pathname.split("/").pop();

        if (!id || isNaN(parseInt(id))) {
            return NextResponse.json({ message: "ID inválido." }, { status: 400 });
        }

        const user = await deleteUser(parseInt(id))
        if(!user) return NextResponse.json({message:"Hubo un error al eliminar al usuario."},{status:404})
        return NextResponse.json(user)
    }catch(e:any){
        return NextResponse.json({message:"Error interno del servidor: "+e.message},{status:500})
    }
}