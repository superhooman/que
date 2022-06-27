import * as Yup from 'yup';
import { FormErrors } from '../constants';

export const emailSchema = Yup.object({
    email: Yup.string().email(FormErrors.EMAIL_TYPE).required(FormErrors.REQUIRED),
});
