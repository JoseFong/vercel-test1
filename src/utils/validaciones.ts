export function textoVacio(s:string){
    if(s.length===0) return true
    return false
}

export function tieneNumero(s:string){
    return /\d/.test(s)
}

export function correoInvalido(s:string){
    if(!s.includes("@")) return true
    if(!s.includes(".")) return true
    if(s.charAt(0)==="."||s.charAt(0)==="@"||s.charAt(s.length-1)==="."||s.charAt(s.length-1)==="@") return true
}