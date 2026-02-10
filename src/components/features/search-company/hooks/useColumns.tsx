import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../../../ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { Button } from "../../../ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import { Company } from "../../../../models/Company";
import { t } from "i18next";
import { formatDate } from "../../../../lib/utils";

interface UseColumnsProps {
  onRemove: (id: string) => void;
}

export default function useColomns({ onRemove }: UseColumnsProps) {
  const columns: ColumnDef<Company>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: "logo",
      header: () => {
        return <span className="pl-0 font-bold">Logo</span>;
      },
      cell: ({ row }) => (
        <Avatar>
          <AvatarImage src={row.getValue(`logo`)} alt={row.getValue("name")} />
          <AvatarFallback>{`${String(row.getValue("name"))?.[0]}${
            String(row.getValue("name"))?.[1]
          }`}</AvatarFallback>
        </Avatar>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            className="pl-0 font-bold"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("search.company.name")}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "phone",
      header: () => {
        return <span className="pl-0 font-bold">Phone</span>;
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("phone")}</div>
      ),
    },
    {
      accessorKey: "area",
      header: ({ column }) => {
        return (
          <Button
            className="pl-0 font-bold"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("search.company.area")}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("area")}</div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: () => {
        return (
          <span className="pl-0 font-bold">
            {t("search.company.creationDate")}
          </span>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{formatDate(row.getValue("createdAt"))}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const company = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 mr-0 ml-auto">
                <span className="sr-only">{t("search.company.openMenu")}</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                className="cursor-pointer hover:bg-white/5"
                onClick={() => (window.location.href = `/company/${company.id}`)}
              >
                {t("search.company.viewCompanyDetails")}
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer hover:bg-white/5 text-red-500"
                onClick={() => onRemove(company.id)}
              >
                {t("search.company.removeCompany")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return { columns };
}
