import {prisma} from "@/libs/prisma"

export async function getAllUsuarios(){
    return await prisma.usuario.findMany()
}

export async function createUsuario(data:any){
    return await prisma.usuario.create({
        data:{
            nombre: data.nombre,
            aPat: data.aPat,
            aMat: data.aMat,
            correo: data.correo,
            clave: data.clave
        }
    })
}

export async function deleteUser(id:number){
    return await prisma.usuario.delete({
        where: {
            id:id
        }
    })
}