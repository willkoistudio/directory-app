import { ColumnDef } from "@tanstack/react-table";
import { Contact } from "../../../../models/contact";
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
import { Company } from "../../../../models/company";

export default function useColomns(companies: Company[]) {
  const columns: ColumnDef<Contact>[] = [
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
      accessorKey: "avatar",
      header: "",
      cell: ({ row }) => (
        <Avatar>
          <AvatarImage
            src={row.getValue(`avatar`)}
            alt={row.getValue("name")}
          />
          <AvatarFallback>{`${String(row.getValue("name"))?.[0]}${
            String(row.getValue("name"))?.[1]
          }`}</AvatarFallback>
        </Avatar>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("phone")}</div>
      ),
    },
    {
      accessorKey: "companyId",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Company
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        const companyName = companies.find(
          (company) => company.id === row.getValue("companyId")
        )?.name;
        console.log(companies, companyName, row.getValue("companyId"));
        return <div className="lowercase">{companyName}</div>;
      },
    },
    {
      accessorKey: "function",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Function
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("function")}</div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Date creation",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("createdAt")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const contact = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="cursor-pointer hover:bg-white/5"
                onClick={() =>
                  (window.location.href = `/contact/${contact.id}`)
                }
              >
                View contact details
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-white/5">
                Remove contact
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return { columns };
}
