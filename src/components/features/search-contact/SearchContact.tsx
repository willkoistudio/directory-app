import { FC, useEffect, useState } from "react";
import { Contact } from "../../../models/contact";
import { Filter } from "lucide-react";
import {
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../../components/ui/drawer";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

import { Skeleton } from "../../../components/ui/skeleton";
import useColumns from "./hooks/useColumns";
import { removeContact } from "../../../store/contactSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { getCompanies } from "../../../store/companySlice";
import { Company } from "../../../models/company";
import { useTranslation } from "react-i18next";
import Autocomplete from "../../ui/autocomplete/Autocomplete";

interface SearchContactProps {
  contacts: Contact[];
  loading: boolean;
}

const SearchContact: FC<SearchContactProps> = ({ contacts, loading }) => {
  const dispatch = useDispatch();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [localCompanies, setLocalCompanies] = useState<Company[]>([]);

  const { companies } = useSelector((state: RootState) => state.company);
  const { columns } = useColumns(localCompanies);
  const { t } = useTranslation();

  const table = useReactTable({
    data: contacts,
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
    setLocalCompanies(companies);
  }, [companies]);

  useEffect(() => {
    if (!companies || companies.length === 0) {
      dispatch(getCompanies() as any);
    }
  }, []);

  return (
    <section>
      <div className="mt-6 mb-8">
        {loading ? (
          <div className="flex justify-between">
            <Skeleton className="bg-white/10 h-14 w-1/2" />
            <Skeleton className="bg-white/10 h-14 w-[109px]" />
          </div>
        ) : (
          <div className="flex justify-between">
            <Input
              className="px-6 h-12 w-1/2"
              type="search"
              placeholder="Search a contact..."
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
            />
            <Drawer>
              <DrawerTrigger asChild>
                <Button size="sm" className="h-12 bg-red px-6">
                  <Filter className="mr-1 h-4" />
                  <span>{t("search.contact.filters")}</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full px-8">
                  <DrawerHeader>
                    <DrawerTitle>
                      {t("search.contact.advancedSearch")}
                    </DrawerTitle>
                    <DrawerDescription>
                      {t("search.contact.advancedSearchDescription")}
                    </DrawerDescription>
                  </DrawerHeader>

                  <section className="grid grid-cols-3 gap-4 py-4">
                    <div>
                      <Label htmlFor="name">{t("search.contact.name")}</Label>
                      <Input type="text"></Input>
                    </div>
                    <div>
                      <Label htmlFor="city">{t("search.contact.city")}</Label>
                      <Input type="text"></Input>
                    </div>
                    <div>
                      <Label htmlFor="function">
                        {t("search.contact.function")}
                      </Label>
                      <Input type="text"></Input>
                    </div>
                    <div>
                      <Label htmlFor="postal code">
                        {t("search.contact.postalCode")}
                      </Label>
                      <Input type="text"></Input>
                    </div>
                    <div>
                      <Label htmlFor="keywords">
                        {t("search.contact.keywords")}
                      </Label>
                      <Input type="text"></Input>
                    </div>
                    <div>
                      <Label htmlFor="company">
                        {t("search.contact.company")}
                      </Label>
                      <Autocomplete
                        options={localCompanies.map((company) => ({
                          label: company.name,
                          value: company.id,
                        }))}
                        onChange={(value) => {
                          console.log(value);
                        }}
                        value={""}
                      />
                    </div>
                  </section>
                  <DrawerFooter>
                    <Button>{t("search.contact.search")}</Button>
                    <DrawerClose asChild>
                      <Button variant="outline">
                        {t("search.contact.cancel")}
                      </Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        )}
      </div>
      {loading ? (
        <div>
          <Skeleton className="h-[400px]  bg-white/10" />
          <div className="flex justify-between w-full mt-6">
            <Skeleton className="bg-white/10 h-10 w-[500px]" />
            <Skeleton className="bg-white/10 h-10 w-[250px]" />
          </div>
        </div>
      ) : (
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
                      {t("search.contact.noResults")}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length}{" "}
              {t("search.contact.rows")}.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                disabled={
                  !table.getIsSomeRowsSelected() &&
                  !table.getIsAllRowsSelected()
                }
                onClick={() =>
                  removeContact(
                    table
                      .getSelectedRowModel()
                      .rows.map((contact: Row<Contact>) => contact.id)
                  )
                }
              >
                {t("search.contact.deleteSelectedContacts")}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                {t("search.contact.previous")}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                {t("search.contact.next")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export { SearchContact };
