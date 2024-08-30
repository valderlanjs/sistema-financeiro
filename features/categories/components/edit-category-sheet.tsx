import { z } from 'zod';
import { Loader2 } from 'lucide-react';

import { CategoryForm } from "@/features/categories/components/category-form";
import { useOpenCategory } from '@/features/categories/hooks/use-open-category';
import { useEditCategory } from '@/features/categories/api/use-edit-category';
import { useDeleteCategory } from '@/features/categories/api/use-delete-category';
import { useGetCategory } from '@/features/categories/api/use-get-category';

import { useConfirm } from '@/hooks/use-confirm';
import { insertCategorySchema } from "@/db/schema";



import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";



const formSchema = insertCategorySchema.pick({
    name: true,
});

type FormValues = z.input<typeof formSchema>;


export const EditCategorySheet = () => {
    const { isOpen, onClose, id } = useOpenCategory();

    const [ConfirmDialog, confirm] = useConfirm(
        "Você tem certeza?",
        "Você está prestes a excluir essa categoria!",
    );


    const categoryQuery = useGetCategory(id);
    const editMutation = useEditCategory(id);
    const deleteMutation = useDeleteCategory(id);


    const isPending = editMutation.isPending || deleteMutation.isPending;

    const isLoadign = categoryQuery.isLoading;

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

    const defaultValues = categoryQuery.data ? {
        name: categoryQuery.data.name
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
                            Editar categoria
                        </SheetTitle>
                        <SheetDescription>
                            Edite uma categoria já existente
                        </SheetDescription>
                    </SheetHeader>
                    {isLoadign
                        ? (
                            <div className='absolute inset-0 items-center justify-center'>
                                <Loader2 className='size-4 text-muted-foreground animete-spin'/>
                            </div>
                        ) : (
                            <CategoryForm 
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