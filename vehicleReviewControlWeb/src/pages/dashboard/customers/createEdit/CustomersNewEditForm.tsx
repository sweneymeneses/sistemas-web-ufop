import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// @mui
import { LoadingButton } from '@mui/lab';
import { useFormik, Form, FormikProvider } from 'formik';
import { PATH_DASHBOARD } from 'src/routes/paths';
import {
  Card,
  Select,
  Stack,
  TextField,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
  FormControlLabel,
  Switch,
} from '@mui/material';

import { useDispatch, useSelector } from '../../../../redux/store';
import { createCustomer, updateCustomer } from '../../../../redux/slices/customer';

// ----------------------------------------------------------------------

interface CustomerProps {
  city: string;
  created_at: string;
  email: string;
  name: string;
  phone_mobile: number;
}

type Props = {
  isEdit: boolean;
};

export default function CustomersNewEditForm({ isEdit }: Props) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { customer } = useSelector((state) => state.customer);

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Campo requirido'),
    email: Yup.string().required('Campo requirido'),
    phone_mobile: Yup.number().required('Campo requirido'),
    city: Yup.string().required('Campo requirido'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: customer?.id,
      city: customer?.city || '',
      email: customer?.email || '',
      name: customer?.name || '',
      phone_mobile: customer?.phone_mobile || '',
    },

    validationSchema: NewUserSchema,
    onSubmit: async (values, { resetForm }) => {
      const customer = {
        id: values?.id,
        city: values?.city,
        email: values?.email,
        name: values?.name,
        phone_mobile: values?.phone_mobile,
      };

      try {
        isEdit ? dispatch(updateCustomer(values.id, customer)) : dispatch(createCustomer(customer));
        enqueueSnackbar(
          !isEdit ? 'Cliente criado com sucesso!' : 'Atualizado cliente com sucesso!'
        );
        resetForm();
        navigate(PATH_DASHBOARD.customers.list);
      } catch (error) {
        enqueueSnackbar(
          !isEdit
            ? `Erro ao criar cliente. ${error?.message}`
            : `Erro ao atualizar cliente. ${error?.message}`,
          { variant: 'error' }
        );
        resetForm();
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps, isValid, dirty, values } =
    formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Card sx={{ p: 3 }}>
          <Box
            sx={{
              display: 'grid',
              columnGap: 2,
              rowGap: 3,
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
            }}
          >
            <TextField
              label="Nome"
              {...getFieldProps('name')}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />

            <TextField
              label="Email"
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              type="number"
              label="Celular"
              {...getFieldProps('phone_mobile')}
              error={Boolean(touched.phone_mobile && errors.phone_mobile)}
              helperText={touched.phone_mobile && errors.phone_mobile}
            />

            <TextField
              label="Cidade"
              {...getFieldProps('city')}
              error={Boolean(touched.city && errors.city)}
              helperText={touched.city && errors.city}
            />
          </Box>

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton
              disabled={!(dirty && isValid)}
              type="submit"
              variant="contained"
              size="large"
              loading={isSubmitting}
            >
              {!isEdit ? 'Criar cliente' : 'Salvar alterações'}
            </LoadingButton>
          </Stack>
        </Card>
      </Form>
    </FormikProvider>
  );
}
