import React, { useEffect } from "react";
import { Contact } from "../../models/contact";
import { usePageName } from "../../context/PageNameContext";

import { ArrowUpDown, Filter, MoreHorizontal } from "lucide-react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { ROUTE_NAMES } from "../../helpers/const/routes";
import { useNavigate } from "react-router-dom"; // Ajoutez cette ligne

const data: Contact[] = [
  {
    id: "m5gr84i9",
    name: "Leanne Graham",
    companyId: "0",
    email: "ken99@yahoo.com",
    phone: "1-770-736-8031 x56442",
    workPhone: "010-692-6593 x09125",
    fax: "1-463-123-3447",
    function: "Chief Executive Officer",
    website: "www.hildegard.org",
    address: {
      street: "Kulas Light",
      city: "Gwenborough",
      postalCode: "92998-3874",
      country: "United States",
    },
    keywords: ["keyword1", "keyword2", "keyword3"],
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3c23d152",
    name: "Ervin Howell",
    companyId: "0",
    email: "shanna@yahoo.com",
    phone: "010-692-6593 x09125",
    workPhone: "1-463-123-3447",
    fax: "1-463-123-3447",
    function: "Chief Executive Officer",
    website: "www.hildegard.org",
    address: {
      street: "1 GNX Drive",
      city: "Oakland",
      postalCode: "12345",
      country: "Canada",
    },
    keywords: ["keyword1"],
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3c23d152",
    name: "Will Smirs",
    companyId: "0",
    email: "shanna@yahoo.com",
    phone: "010-692-6593 x09125",
    workPhone: "1-463-123-3447",
    fax: "1-463-123-3447",
    function: "Chief Executive Officer",
    website: "www.hildegard.org",
    address: {
      street: "1 GNX Drive",
      city: "Oakland",
      postalCode: "12345",
      country: "Canada",
    },
    keywords: ["keyword1"],
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const columns: ColumnDef<Contact>[] = [
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
        <AvatarImage src={row.getValue(`avatar`)} alt={row.getValue("name")} />
        <AvatarFallback>{`${String(row.getValue("name"))?.[0]}${
          String(row.getValue("name"))?.[1]
        }`}</AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
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
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <div className="lowercase">{row.getValue("phone")}</div>,
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
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("companyId")}</div>
    ),
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
            <DropdownMenuItem>Remove contact</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const Search: React.FC = () => {
  const navigate = useNavigate();
  const { setPageName } = usePageName();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  useEffect(() => {
    setPageName(ROUTE_NAMES.SEARCH); // Mettre à jour le nom de la page
  }, []);

  return (
    <section>
      <div className="mb-8 mt-12">
        <div className="flex justify-between">
          <Input
            className="px-6 h-12 w-1/2"
            type="search"
            placeholder="Search a contact..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
          />
          <Drawer>
            <DrawerTrigger asChild>
              <Button size="sm" className="h-12 bg-red px-6">
                <Filter className="mr-1 h-4" />
                <span>Filters</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full px-8">
                <DrawerHeader>
                  <DrawerTitle>Advanced search</DrawerTitle>
                  <DrawerDescription>
                    Set the filters you want to apply to the search.
                  </DrawerDescription>
                </DrawerHeader>

                <section className="grid grid-cols-3 gap-4 py-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input type="text"></Input>
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input type="text"></Input>
                  </div>
                  <div>
                    <Label htmlFor="function">Function</Label>
                    <Input type="text"></Input>
                  </div>
                  <div>
                    <Label htmlFor="postal code">Postal Code</Label>
                    <Input type="text"></Input>
                  </div>
                  <div>
                    <Label htmlFor="keywords">Keywords</Label>
                    <Input type="text"></Input>
                  </div>
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a company" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Companies</SelectLabel>
                          <SelectItem value="apple">Apple</SelectItem>
                          <SelectItem value="banana">Banana</SelectItem>
                          <SelectItem value="blueberry">Blueberry</SelectItem>
                          <SelectItem value="grapes">Grapes</SelectItem>
                          <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </section>
                <DrawerFooter>
                  <Button>Submit</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      <div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="cursor-pointer hover:bg-white/5"
                    onClick={() => navigate(`/contact/${row.id}`)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Search };
