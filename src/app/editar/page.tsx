"use client";
import { correoInvalido, textoVacio, tieneNumero } from "@/utils/validaciones";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
  user,
} from "@heroui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import edit from "@/Resources/edit.png";
function Editar() {
  const router = useRouter();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [nombre, setNombre] = useState("");
  const [aPat, setAPat] = useState("");
  const [aMat, setAMat] = useState("");
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [confClave, setConfClave] = useState("");
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const url = new URL(window.location.href);
    const id = url.toString().split("=").pop();
    if (id) {
      setUserId(id);
    }
  }, []);

  useEffect(() => {
    if (userId !== "") getUser();
  }, [userId]);

  async function getUser() {
    try {
      const response = await axios.get("/api/usuarios/" + userId);
      const us = response.data;
      setNombre(us.nombre);
      setAPat(us.aPat);
      setAMat(us.aMat);
      setCorreo(us.correo);
      setLoading(false);
    } catch (e: any) {
      console.log(e.message);
      if (e.response) {
        toast.error(e.response.data.message, { id: "loading" });
        router.push("/");
      } else {
        toast.error(e.message);
      }
    }
  }

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
        textoVacio(clave) ||
        textoVacio(confClave)
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

      if (clave !== confClave) throw new Error("Las contraseñas no coindicen.");

      onOpen();
    } catch (e: any) {
      toast.error(e.message, { id: "loading" });
    }
  }

  async function editar(onClose: any) {
    try {
      toast.loading("Registrando usuario", { id: "loading" });
      const data = {
        nombre: nombre,
        aPat: aPat,
        aMat: aMat,
        correo: correo,
        clave: clave,
      };
      const response = await axios.put("/api/usuarios/" + userId, data);
      toast.dismiss();
      onClose();
      regresarAInicio();
    } catch (e: any) {
      toast.error(e.response.data.message, { id: "loading" });
    }
  }

  return (
    <div className="flex flex-col p-10 gap-10 bg-zinc-900 text-zinc-300 min-w-screen min-h-screen items-center justify-center">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2  p-3 max-w-4xl">
          <h1 className="text-white font-bold text-3xl mb-2">Editar usuario</h1>
          {loading ? (
            <Spinner size="lg"></Spinner>
          ) : (
            <>
              <div className="flex flex-row gap-3 justify-between">
                <input
                  value={nombre || ""}
                  onChange={(e) => setNombre(e.target.value)}
                  className="bg-zinc-800 rounded-md py-3 px-2 w-1/3"
                  placeholder="Nombre"
                />
                <input
                  value={aPat || ""}
                  onChange={(e) => setAPat(e.target.value)}
                  className="bg-zinc-800 rounded-md py-1 px-2 w-1/3"
                  placeholder="Ap. Paterno"
                />
                <input
                  value={aMat || ""}
                  onChange={(e) => setAMat(e.target.value)}
                  className="bg-zinc-800 rounded-md py-1 px-2 w-1/3"
                  placeholder="Ap. Materno"
                />
              </div>

              <input
                type="email"
                value={correo || ""}
                onChange={(e) => setCorreo(e.target.value)}
                className="bg-zinc-800 rounded-md py-3 px-2"
                placeholder="Correo"
              />
              <input
                type="password"
                value={clave || ""}
                onChange={(e) => setClave(e.target.value)}
                className="bg-zinc-800 rounded-md py-3 px-2"
                placeholder="Clave"
              />
              <input
                type="password"
                value={confClave || ""}
                onChange={(e) => setConfClave(e.target.value)}
                className="bg-zinc-800 rounded-md py-3 px-2"
                placeholder="Confirmar clave"
              />
              <div className="flex flex-row gap-4 w-full mt-2">
                <Button color="primary" onPress={enviar} className="w-full">
                  Registrar
                </Button>
                <Button onPress={regresarAInicio} className="w-full">
                  Cancelar
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="lg"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                ¿Está seguro que desea editar?
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
                <Button color="primary" onPress={() => editar(onClose)}>
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

export default Editar;

/*<img
src="https://media.tenor.com/images/e8864a3f382ac30bb375b7f65d755681/tenor.gif"
width={200}
/>*/
