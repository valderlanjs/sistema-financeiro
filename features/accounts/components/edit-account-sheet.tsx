import { z } from 'zod';
import { Loader2 } from 'lucide-react';

import { AccountForm } from "@/features/accounts/components/account-form";
import { useOpenAccount } from '@/features/accounts/hooks/use-open-account';
import { useEditAccount } from '@/features/accounts/api/use-edit-account';
import { useDeleteAccount } from '@/features/accounts/api/use-delete-account';

import { useConfirm } from '@/hooks/use-confirm';
import { insertAccountSchema } from "@/db/schema";

import { useGetAccount } from '@/features/accounts/api/use-get-account';


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


export const EditAccountSheet = () => {
    const { isOpen, onClose, id } = useOpenAccount();

    const [ConfirmDialog, confirm] = useConfirm(
        "Você tem certeza?",
        "Você está prestes a excluir essa conta!",
    );


    const accountQuery = useGetAccount(id);
    const editMutation = useEditAccount(id);
    const deleteMutation = useDeleteAccount(id);


    const isPending = editMutation.isPending || deleteMutation.isPending;

    const isLoadign = accountQuery.isLoading;

    const onSubmit = (values: FormValues) => {
        editMutation.mutate(values, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    const onDelete = async () => {
        const ok = await confirm();

        if (ok) {
            deleteMutation.mutate(undefined, {
                onSuccess: () => {
                    onClose();
                }
            });
        }
    };

    const defaultValues = accountQuery.data ? {
        name: accountQuery.data.name
    } : {
        name: "",
    };

    return (
        <>
            <ConfirmDialog />
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className="space-y-4">
                    <SheetHeader>
                        <SheetTitle>
                            Editar conta
                        </SheetTitle>
                        <SheetDescription>
                            Edite uma conta já existente
                        </SheetDescription>
                    </SheetHeader>
                    {isLoadign
                        ? (
                            <div className='absolute inset-0 items-center justify-center'>
                                <Loader2 className='size-4 text-muted-foreground animete-spin'/>
                            </div>
                        ) : (
                            <AccountForm 
                              id={id}
                              onSubmit={onSubmit} 
                              disabled={isPending} 
                              defaultValues={defaultValues}
                              onDelete={onDelete}
                            />
                        )
                    }
                </SheetContent>
            </Sheet>
        </>
    );
};