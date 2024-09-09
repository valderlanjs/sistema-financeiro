import { z } from 'zod';
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { insertAccountSchema } from '@/db/schema';
import { 
    Form,
    FormField,
    FormLabel,
    FormControl,
    FormItem,
    FormMessage
} from "@/components/ui/form";

const formSchema = insertAccountSchema.pick({
    name: true,
});

type FormValues = z.input<typeof formSchema>;

type Props = {
    id?: string;
    defaultValues?: FormValues;
    onSubmit: (values: FormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
};

export const AccountForm = ({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    disabled,
}: Props) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    });

    const handleSubmit = (values: FormValues) => {
       onSubmit(values);
    };

    const handleDelete = () => {
        onDelete?.();
    }

    return (
        <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(handleSubmit)}
              className='space-y-4 pt-4'
            >
                <FormField 
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Nome
                        </FormLabel>
                        <FormControl>
                            <Input 
                              disabled={disabled}
                              placeholder='ex. Dinheiro, Banco, Cartão de Crédito, Pix'
                              {...field}
                            />
                        </FormControl>
                    </FormItem>
                  )}
                /> 
                <Button className='w-full' disabled={disabled}>
                    {id ? "Salvar alteração" : "Criar conta"}
                </Button>
                {!!id && (
                    <Button
                      type='button'
                      disabled={disabled}
                      onClick={handleDelete}
                      className='w-full'
                      size='icon'
                      variant="outline"
                    >
                        <Trash className='size-4 mr-2 '/>
                        Deletar conta
                    </Button>
                )}
            </form>
        </Form>
    )
}