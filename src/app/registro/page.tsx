"use client";
import { correoInvalido, textoVacio, tieneNumero } from "@/utils/validaciones";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
function Registro() {
  const router = useRouter();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [nombre, setNombre] = useState("");
  const [aPat, setAPat] = useState("");
  const [aMat, setAMat] = useState("");
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");

  useEffect(() => {
    toast.success("¡Página cargada!", { id: "loading" });
  }, []);

  function regresarAInicio() {
    router.push("/");
  }

  function enviar() {
    try {
      if (
        textoVacio(nombre) ||
        textoVacio(aPat) ||
        textoVacio(aMat) ||
        textoVacio(correo) ||
        textoVacio(clave)
      )
        throw new Error("Complete todos los datos");

      if (tieneNumero(nombre))
        throw new Error("El nombre no puede tener números");
      if (tieneNumero(aPat))
        throw new Error("El apellido paterno no puede tener números");
      if (tieneNumero(aMat))
        throw new Error("El apellido materno no puede tener números");

      if (correoInvalido(correo))
        throw new Error("Ingrese un correo con formato correcto.");

      onOpen();
    } catch (e: any) {
      toast.error(e.message, { id: "loading" });
    }
  }

  async function registrar(onClose: any) {
    try {
      toast.loading("Registrando usuario", { id: "loading" });
      const data = {
        nombre: nombre,
        aPat: aPat,
        aMat: aMat,
        correo: correo,
        clave: clave,
      };
      const response = await axios.post("/api/usuarios", data);
      toast.dismiss();
      onClose();
      router.push("/?registroExitoso=true");
    } catch (e: any) {
      toast.error(e.response.data.message, { id: "loading" });
    }
  }

  return (
    <div className="flex flex-col p-10 gap-10">
      <p>Registro</p>
      <Button onPress={regresarAInicio}>Regresar a inicio</Button>
      <div className="flex flex-col gap-2">
        <h1>Ingrese su información</h1>
        <div className="flex flex-row gap-2 items-center">
          <label>Nombre</label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="bg-zinc-100 rounded-md py-1 px-2"
            placeholder="Ej. José"
          />
        </div>
        <div className="flex flex-row gap-2 items-center">
          <label>Apellido paterno</label>
          <input
            value={aPat}
            onChange={(e) => setAPat(e.target.value)}
            className="bg-zinc-100 rounded-md py-1 px-2"
            placeholder="Ej. Fong"
          />
        </div>
        <div className="flex flex-row gap-2 items-center">
          <label>Apellido Materno</label>
          <input
            value={aMat}
            onChange={(e) => setAMat(e.target.value)}
            className="bg-zinc-100 rounded-md py-1 px-2"
            placeholder="Ej. López"
          />
        </div>
        <div className="flex flex-row gap-2 items-center">
          <label>Correo</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="bg-zinc-100 rounded-md py-1 px-2"
            placeholder="Ej. fomi03@gmail.com"
          />
        </div>
        <div className="flex flex-row gap-2 items-center">
          <label>Clave</label>
          <input
            type="password"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            className="bg-zinc-100 rounded-md py-1 px-2"
            placeholder="Clave"
          />
        </div>
        <Button color="primary" onPress={enviar}>
          Enviar
        </Button>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                ¿Está seguro que desea registrarse?
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col justify-center">
                  <h1 className="font-bold">Información:</h1>
                  <p>
                    <span className="font-bold">Nombre: </span>
                    {nombre} {aPat} {aMat}
                  </p>
                  <p>
                    <span className="font-bold">Correo: </span>
                    {correo}
                  </p>
                  <p>
                    <span className="font-bold">Clave: </span>
                    {clave}
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>Cancelar</Button>
                <Button color="primary" onPress={() => registrar(onClose)}>
                  Registrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Registro;

/*<img
src="https://media.tenor.com/images/e8864a3f382ac30bb375b7f65d755681/tenor.gif"
width={200}
/>*/
