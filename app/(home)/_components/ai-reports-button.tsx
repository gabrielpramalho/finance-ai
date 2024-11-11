"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { BotIcon, Loader2Icon } from "lucide-react";
import { GenerateAiReports } from "../_actions/generate-ai-reports";
import { useState } from "react";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import Markdown from "react-markdown";

interface AiReportButtonProps {
  month: string;
}

export function AiReportButton({ month }: AiReportButtonProps) {
  const [report, setReport] = useState<string | null>();
  const [reportIsLoading, setReportIsLoading] = useState(false);

  async function handleGenerateReport() {
    try {
      setReportIsLoading(true);
      const result = await GenerateAiReports(month);
      setReport(result);
    } catch (error) {
      console.error(error);
    } finally {
      setReportIsLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="font-bold">
          Relatório de IA
          <BotIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Relatório IA</DialogTitle>
          <DialogDescription>
            Use inteligência artificial para gerar um relatório com insights
            sobre suas finanças.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="prose max-h-[450px] text-white prose-h3:text-white prose-h4:text-white prose-strong:text-white">
          <Markdown>{report}</Markdown>
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleGenerateReport} disabled={reportIsLoading}>
            {reportIsLoading ? (
              <>
                <Loader2Icon className="animate-spin" />
                Gerando relatório
              </>
            ) : (
              "Gerar Relatório"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
