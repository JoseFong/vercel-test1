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
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    isOpen: is2Open,
    onOpen: on2Open,
    onOpenChange: on2OpenChange,
  } = useDisclosure();

  useEffect(() => {
    getAllUsuarios();
    if (searchParams.get("registroExitoso")) {
      on2Open();
    }
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

  return (
    <>
      <div className="flex-col p-10">
        <p>
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
          <Table>
            <TableHeader>
              <TableColumn>Id</TableColumn>
              <TableColumn>Nombre</TableColumn>
              <TableColumn>Apellido paterno</TableColumn>
              <TableColumn>Apellido materno</TableColumn>
              <TableColumn>Correo</TableColumn>
              <TableColumn>Clave</TableColumn>
            </TableHeader>
            <TableBody>
              {usuarios.map((usuario: Usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell>{usuario.id}</TableCell>
                  <TableCell>{usuario.nombre}</TableCell>
                  <TableCell>{usuario.aPat}</TableCell>
                  <TableCell>{usuario.aMat}</TableCell>
                  <TableCell>{usuario.correo}</TableCell>
                  <TableCell>{usuario.clave}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      <Modal isOpen={is2Open} onOpenChange={on2OpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                ¡Felicidades, se ha registrado!
              </ModalHeader>
              <ModalBody className="flex justify-center items-center">
                <img
                  src="https://media.tenor.com/images/e8864a3f382ac30bb375b7f65d755681/tenor.gif"
                  width={250}
                />
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>Cerrar</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default HomePage;
