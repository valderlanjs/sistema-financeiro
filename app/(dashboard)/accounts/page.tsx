"use client";

import { Loader2, Plus } from "lucide-react";

import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useBulkDeleteAccounts } from "@/features/accounts/api/use-bulk-delete";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
 } from "@/components/ui/card"

import { columns } from "./columns";


/*const data = [
    {
        id: "728ed52f",
        quantidade: 100,
        status: "Sucesso",
        email: "example@.com",
    },
    {
        id: "728ed52f",
        quantidade: 150,
        status: "Pendente",
        email: "valderlan15@.com",
    },
];*/



const AccountsPage = () => {
    const newAccount = useNewAccount();
    const deleteAccount = useBulkDeleteAccounts();
    const accountsQuery = useGetAccounts();
    const accounts = accountsQuery.data || [];

    const isDisable = 
      accountsQuery.isLoading ||
      deleteAccount.isPending;

    if (accountsQuery.isLoading) {
      return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48"/>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-300 animate-spin"/>
            </div>
          </CardContent>
        </Card>
      </div>
      );
    }

    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
          <Card className="border-none drop-shadow-sm">
            <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
              <CardTitle className="text-xl line-clamp-1"> 
                Página de Contas
              </CardTitle>
              <Button onClick={newAccount.onOpen} size="sm">
                <Plus  className="size-4 mr-2"/>
                Adicionar Conta
              </Button>
            </CardHeader>
            <CardContent>
                <DataTable 
                  filterKey="email"
                  columns={columns} 
                  data={accounts} 
                  onDelete={(row) => {
                    const ids = row.map((r) => r.original.id);
                    deleteAccount.mutate({ ids });
                  }}
                  disabled={isDisable}
                />
            </CardContent>
          </Card>
        </div>
    );
};

export default AccountsPage;