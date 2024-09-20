import { z } from 'zod';
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";




import { Textarea } from '@/components/ui/textarea';
import { Input } from "@/components/ui/input";
import { DatePicker } from '@/components/data-picker';
import { AmountInput } from '@/components/amount.input';
import { Button } from "@/components/ui/button";
import { Select } from '@/components/select';

import { insertTransactionsSchema } from '@/db/schema';

import { 
    Form,
    FormField,
    FormLabel,
    FormControl,
    FormItem,
    FormMessage
} from "@/components/ui/form";

const formSchema = z.object({
    date: z.coerce.date(),
    accountId: z.string(),
    categoryId: z.string().nullable().optional(),
    payee: z.string(),
    amount: z.string(),
    notes: z.string().nullable().optional(),
})

const apiSchema = insertTransactionsSchema.omit({
    id: true,
})

type FormValues = z.input<typeof formSchema>;
type ApiFormValues = z.input<typeof apiSchema>;

type Props = {
    id?: string;

    defaultValues?: FormValues;
    onSubmit: (values: ApiFormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
    accountOptions: { label: string; value: string;}[];
    categoryOptions: { label: string; value: string;}[];
    onCreateAccount: (name: string) => void;
    onCreateCategory: (name: string) => void;

};

export const TransactionForm = ({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    disabled,
    accountOptions,
    categoryOptions,
    onCreateAccount,
    onCreateCategory,
}: Props) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    });

    const handleSubmit = (values: FormValues) => {
        onSubmit({
            ...values,
            amount: parseFloat(values.amount),
        });
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
                  name="date"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <DatePicker
                                value={field.value}
                                onChange={field.onChange}
                                disabled={disabled}
                            />
                        </FormControl>
                    </FormItem>
                  )}
                /> 
                <FormField 
                  name="accountId"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Conta
                        </FormLabel>
                        <FormControl>
                            <Select 
                                placeholder='Selecione uma conta'
                                options={accountOptions}
                                onCreate={onCreateAccount}
                                value={field.value}
                                onChange={field.onChange}
                                disabled={disabled}
                            />
                        </FormControl>
                    </FormItem>
                  )}
                /> 
                <FormField 
                  name="categoryId"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Categoria
                        </FormLabel>
                        <FormControl>
                            <Select 
                                placeholder='Selecione uma categoria'
                                options={categoryOptions}
                                onCreate={onCreateCategory}
                                value={field.value}
                                onChange={field.onChange}
                                disabled={disabled}
                            />
                        </FormControl>
                    </FormItem>
                  )}
                /> 
                <FormField 
                  name="payee"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Instituição
                        </FormLabel>
                        <FormControl>
                            <Input 
                                disabled={disabled}
                                placeholder='Nome do recebedor'
                                {...field}
                            />
                        </FormControl>
                    </FormItem>
                  )}
                /> 
                <FormField 
                  name="amount"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Valor
                        </FormLabel>
                        <FormControl>
                            <AmountInput 
                                {...field}
                                disabled={disabled}
                                placeholder='0.00'
                            />
                        </FormControl>
                    </FormItem>
                  )}
                /> 
                <FormField 
                  name="notes"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Descrição
                        </FormLabel>
                        <FormControl>
                            <Textarea 
                                {...field}
                                value={field.value ?? ''}
                                disabled={disabled}
                                placeholder='Se necessário adicione uma descrição.'
                            />
                        </FormControl>
                    </FormItem>
                  )}
                /> 
                <Button className='w-full' disabled={disabled}>
                    {id ? "Salvar alteração" : "Criar transação"}
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
                        Deletar transação
                    </Button>
                )}
            </form>
        </Form>
    )
}