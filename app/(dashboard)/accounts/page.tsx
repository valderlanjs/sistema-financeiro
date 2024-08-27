"use client";

import { Plus } from "lucide-react";

import { useNewAccount } from "@/features/accounts/hooks/use-new-account";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
 } from "@/components/ui/card"

import { columns, Payment } from "./columns";


const data: Payment[] = [
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
];



const AccountsPage = () => {
    const newAccount = useNewAccount();

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
                  data={data} 
                  onDelete={() => {}}
                  disabled={false}
                />
            </CardContent>
          </Card>
        </div>
    );
};

export default AccountsPage;