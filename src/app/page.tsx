"use client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

function HomePage() {
  const router = useRouter();

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
    <div className="flex-col">
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
    </div>
  );
}

export default HomePage;
