import { deleteUser, getSingleUser, updateUser } from "@/Controllers/usuarioController";
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

export async function PUT(req:NextRequest){
    try{
        const url = new URL(req.url)
        const id = url.pathname.split("/").pop()
        if(!id || isNaN(parseInt(id))){
            return NextResponse.json({message:"Id de usuario no encontrada."},{status:400})
        }

        const data = await req.json()
        const user = await updateUser(parseInt(id),data)
        if(!user) return NextResponse.json({message:"Error al modificar el usuario."},{status:404})
        return NextResponse.json(user)
    }catch(e:any){
        return NextResponse.json({message:"Error interno del servidor: "+e.message},{status:500})
    }
}

export async function GET(req:NextRequest){
    try{
        console.log("entraste a get")
        const url = new URL(req.url)
        const id = url.pathname.split("/").pop()
        if(!id || isNaN(parseInt(id))){
            return NextResponse.json({message:"Error al conseguir el usuario."},{status:400})
        }
        console.log(id)
        const user = await getSingleUser(parseInt(id))
        if(!user) return NextResponse.json({message:"No se encontró el usuario."},{status:404})
        return NextResponse.json(user)
    }catch(e:any){
        return NextResponse.json({message:"Error interno del servidor: "+e.message},{status:500})
    }
}