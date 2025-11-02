import { Button } from "@/components/ui/button";
import { Save, Plus, FileText, GitBranch, BookOpen, User, Tag } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FlowchartToolbarProps {
  onAddNode: (type: string) => void;
  onSave: () => void;
  isSaving: boolean;
}

export function FlowchartToolbar({ onAddNode, onSave, isSaving }: FlowchartToolbarProps) {
  return (
    <div className="absolute top-4 left-4 z-10 flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default" data-testid="button-add-node">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Nó
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onAddNode('start')} data-testid="menu-add-start">
            <FileText className="w-4 h-4 mr-2" />
            Início/Fim
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onAddNode('process')} data-testid="menu-add-process">
            <FileText className="w-4 h-4 mr-2" />
            Processo
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onAddNode('gateway')} data-testid="menu-add-gateway">
            <GitBranch className="w-4 h-4 mr-2" />
            Decisão
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onAddNode('book')} data-testid="menu-add-book">
            <BookOpen className="w-4 h-4 mr-2" />
            Livro
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onAddNode('author')} data-testid="menu-add-author">
            <User className="w-4 h-4 mr-2" />
            Autor
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onAddNode('category')} data-testid="menu-add-category">
            <Tag className="w-4 h-4 mr-2" />
            Categoria
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Button
        variant="default"
        onClick={onSave}
        disabled={isSaving}
        data-testid="button-save-flowchart"
      >
        <Save className="w-4 h-4 mr-2" />
        {isSaving ? "Salvando..." : "Salvar"}
      </Button>
    </div>
  );
}
