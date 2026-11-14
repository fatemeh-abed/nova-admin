import * as Yup from 'yup';
import type { Dictionary } from '../Dictionary';

export interface LoginFormValues {
  username: string;
  password: string;
}

export const loginInitialValues: LoginFormValues = { username: '', password: '' };

// Built from the active dictionary so messages follow the selected language.
export const createLoginSchema = ({ required }: Dictionary['validation']) =>
  Yup.object({
    username: Yup.string().trim().required(required),
    password: Yup.string().required(required),
  });
