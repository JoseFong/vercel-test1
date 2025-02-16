"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@heroui/react";
import { Usuario } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import trash from "@/Resources/trash.png";

function HomePage() {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<Usuario>();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    getAllUsuarios();
  }, []);

  async function getAllUsuarios() {
    try {
      const response = await axios.get("/api/usuarios");
      setUsuarios(response.data);
      setLoading(false);
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  }

  function mostrarError() {
    toast.error("Error", { id: "loading" });
  }

  function mostrarExito() {
    toast.success("¡Éxito!", { id: "loading" });
  }

  function irAFormulario() {
    toast.loading("yendo a formulario", { id: "loading" });
    router.push("/registro");
  }

  function abrirModalEliminar(user: Usuario) {
    setSelectedUser(user);
    onOpen();
  }

  async function eliminar(onClose: any) {
    try {
      toast.loading("Eliminando usuario", { id: "loading" });
      const response = await axios.delete("/api/usuarios/" + selectedUser?.id);
      onClose();
      toast.success("Usuario eliminado exitosamente", { id: "loading" });
      getAllUsuarios();
    } catch (e: any) {
      toast.error(e.response.data.message, { id: "loading" });
    }
  }

  return (
    <div className="bg-zinc-900 flex-col p-10 w-screen h-screen">
      <p className="text-white">
        Esto es una página de prueba para probar el funcionamiento de Vercel
      </p>
      <Button color="success" onPress={mostrarExito}>
        Éxito
      </Button>
      <Button color="danger" onPress={mostrarError}>
        Error
      </Button>
      <Button color="primary" onPress={irAFormulario}>
        Probar formulario
      </Button>
      <h1 className="font-bold text-lg">Listado de usuarios</h1>
      {loading ? (
        <Spinner size="lg" />
      ) : (
        <>
          <p className="text-white">Usuarios</p>

          <table className="w-full text-white ">
            <thead className="border-b-1 border-white bg-zinc-800">
              <tr>
                <th className="py-2 px-2 text-left">ID</th>
                <th className="py-2 px-2 text-left">Nombre</th>
                <th className="py-2 px-2  text-left">Apellido Paterno</th>
                <th className="py-2 px-2  text-left">Apellido Materno</th>
                <th className="py-2 px-2 text-left">Correo</th>
                <th className="py-2 px-2 text-left">Clave</th>
                <th className="py-2 px-2 text-left">⚙️</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((us: Usuario) => (
                <tr className="border-white border-b-1" key={us.id}>
                  <td className="py-2 px-2">{us.id}</td>
                  <td className="py-2 px-2">{us.nombre}</td>
                  <td className="py-2 px-2">{us.aPat}</td>
                  <td className="py-2 px-2">{us.aMat}</td>
                  <td className="py-2 px-2">{us.correo}</td>
                  <td className="py-2 px-2">{us.clave}</td>
                  <td className="py-2 px-2">
                    <Button
                      color="danger"
                      isIconOnly
                      className="p-1"
                      size="sm"
                      onPress={() => abrirModalEliminar(us)}
                    >
                      <Image src={trash} alt={"Eliminar"} title="Eliminar" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
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
                ¿Está seguro que desea eliminar al usuario{" "}
                {selectedUser?.nombre} {selectedUser?.aPat}?
              </ModalHeader>
              <ModalBody>
                <p className="text-red-500 font-bold">
                  Esta acción es permanente.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>Cancelar</Button>
                <Button color="danger" onPress={() => eliminar(onClose)}>
                  Eliminar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default HomePage;
