"use client";
import {
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { Usuario } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function HomePage() {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
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
  );
}

export default HomePage;
