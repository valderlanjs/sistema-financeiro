"use client";

import { Actions } from "./actions";

import { InferResponseType } from "hono";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"

import { client } from "@/lib/hono";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
 

export type ResponseType = InferResponseType<typeof client.api.categories.$get, 200>["data"][0];

export const columns: ColumnDef<ResponseType>[] = [
  
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "Ações",
    cell: ({ row }) => <Actions id={row.original.id} />
  }
  
  
];
