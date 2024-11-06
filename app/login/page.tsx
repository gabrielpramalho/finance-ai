import Image from "next/image";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="grid h-full grid-cols-2">
      <div className="flex h-full flex-col justify-center px-8 max-w-[550px] mx-auto gap-8">
        <Image src="/logo.svg" alt="Finance AI" width={173} height={39} />

        <div className="space-y-3">
          <h1 className="text-4xl font-bold">Bem vindo</h1>

          <p className="text-muted-foreground">
            A Finance AI é uma plataforma de gestão financeira que utiliza IA para
            monitorar suas movimentações, e oferecer insights personalizados,
            facilitando o controle do seu orçamento.
          </p>
        </div>

        <Button variant="outline">
          <LogInIcon className="mr-2" />
          Fazer login ou criar conta
        </Button>
      </div>

      <div className="relative h-full w-full">
        <Image
          src="/login.png"
          alt="Faça login"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
