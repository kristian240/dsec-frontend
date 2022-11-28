import { FC, ReactNode } from 'react';
import { FormProvider, useForm, UseFormProps } from 'react-hook-form';

interface ICreateProjectFormProviderProps extends Partial<UseFormProps> {
	children: ReactNode;
}

export const CreateProjectFormProvider: FC<ICreateProjectFormProviderProps> = ({ children, ...rest }) => {
	const form = useForm(rest);

	return <FormProvider {...form}>{children}</FormProvider>;
};
