import { z } from 'zod';
import { useNewAccount } from "../hooks/use-new-account";
import { AccountForm } from "@/features/accounts/components/account-form";
import { useCreateAccount } from '@/features/accounts/api/use-create-account';

import { insertAccountSchema } from "@/db/schema";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";



const formSchema = insertAccountSchema.pick({
    name: true,
});

type FormValues = z.input<typeof formSchema>;


export const NewAccountSheet = () => {
    const { isOpen, onClose } = useNewAccount();

    const mutation = useCreateAccount();

    const onSubmit = (values: FormValues) => {
        mutation.mutate(values, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>
                        Nova Conta
                    </SheetTitle>
                    <SheetDescription>
                        Crie uma nova conta para rastrear suas transações
                    </SheetDescription>
                </SheetHeader>
                <AccountForm 
                  onSubmit={onSubmit} 
                  disabled={mutation.isPending} 
                  defaultValues={{
                    name: "",
                  }}
                />
            </SheetContent>
        </Sheet>
    );
};