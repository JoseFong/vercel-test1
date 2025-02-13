import { createUsuario, getAllUsuarios } from "@/Controllers/usuarioController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest,response:NextResponse){
    try{
        const usuarios = await getAllUsuarios()
        if(!usuarios) return NextResponse.json({message:"Hubo un problema al encontrar a los usuarios."},{status:400})
        return NextResponse.json(usuarios)
    }catch(e:any){
        return NextResponse.json({message:"Error interno del servidor."},{status:500})
    }
}

export async function POST(request:NextRequest,response:NextResponse){
    try{
        const data = await request.json()
        const usuario = await createUsuario(data)
        if(!usuario) return NextResponse.json({message:"Error al crear al usuario."},{status:404})
        return NextResponse.json(usuario)
    }catch(e:any){
        return NextResponse.json({message:"Error interno del servidor."},{status:500})
    }
}