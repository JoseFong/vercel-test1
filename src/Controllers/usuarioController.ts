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

export async function updateUser(id:number,data:any){
    return await prisma.usuario.update({
        where: {
            id: id
        },
        data: {
            nombre: data.nombre,
            aPat: data.aPat,
            aMat: data.aMat,
            correo: data.correo,
            clave:data.clave
        }
    })
}

export async function getSingleUser(id:number){
    return await prisma.usuario.findFirst({
        where:{
            id:id
        }
    })
}