import { FC, ReactNode } from 'react';
import { FormProvider, useForm, UseFormProps } from 'react-hook-form';

interface ICreateRepositoryFormProviderProps extends Partial<UseFormProps> {
	children: ReactNode;
}

export const CreateRepositoryFormProvider: FC<ICreateRepositoryFormProviderProps> = ({ children, ...rest }) => {
	const form = useForm(rest);

	return <FormProvider {...form}>{children}</FormProvider>;
};
