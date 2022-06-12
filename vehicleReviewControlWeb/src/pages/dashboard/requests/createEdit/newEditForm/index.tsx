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

import { useDispatch, useSelector } from '../../../../../redux/store';
import { createOrderService, updateOrderService } from '../../../../../redux/slices/serviceOrder';
import { useEffect } from 'react';
import { getCustomers } from '../../../../../redux/slices/customer';

// ----------------------------------------------------------------------

type Props = {
  isEdit: boolean;
  id?: string;
};

export default function RequestNewEditForm({ isEdit, id }: Props) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { orderService } = useSelector((state) => state.serviceOrder);
  const { customers } = useSelector((state) => state.customer);

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    board: Yup.string().required('Campo requirido'),
    year: Yup.number().required('Campo requirido'),
    model: Yup.string().required('Campo requirido'),
    color: Yup.string().required('Campo requirido'),
    problem: Yup.string().required('Campo requirido'),
    note: Yup.string().required('Campo requirido'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: id || '',
      customerId: orderService?.customerId || '',
      board: orderService?.board || '',
      year: orderService?.year || '',
      model: orderService?.model || '',
      color: orderService?.color || '',
      problem: orderService?.problem || '',
      note: orderService?.note || '',
      finish: orderService?.finish || false,
    },

    validationSchema: NewUserSchema,
    onSubmit: async (values, { resetForm }) => {
      const orderService = {
        customerId: values.customerId,
        board: values.board,
        year: values.year,
        model: values.model,
        color: values.color,
        problem: values.problem,
        note: values.note,
        finish: values.finish,
      };

      try {
        isEdit
          ? dispatch(updateOrderService(values.id, orderService))
          : dispatch(createOrderService(orderService));
        enqueueSnackbar(
          !isEdit
            ? 'Ordem de serviço criada com sucesso!'
            : 'Atualizado ordem de serviço com sucesso!'
        );
        resetForm();
        navigate(PATH_DASHBOARD.requests.list);
      } catch (error) {
        enqueueSnackbar(
          !isEdit
            ? `Erro ao criar ordem de serviço. ${error?.message}`
            : `Erro ao atualizar ordem de serviço. ${error?.message}`,
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
            <FormControl fullWidth>
              <InputLabel>Selecione o cliente</InputLabel>
              <Select label="Cliente" {...getFieldProps('customerId')} disabled={isEdit}>
                <MenuItem value={0}>Selecione o cliente</MenuItem>
                {customers.map((option: any) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Placa"
              {...getFieldProps('board')}
              error={Boolean(touched.board && errors.board)}
              helperText={touched.board && errors.board}
            />

            <TextField
              type="number"
              label="Ano do veiculo"
              {...getFieldProps('year')}
              error={Boolean(touched.year && errors.year)}
              helperText={touched.year && errors.year}
            />

            <TextField
              label="Modelo"
              {...getFieldProps('model')}
              error={Boolean(touched.model && errors.model)}
              helperText={touched.model && errors.model}
            />

            <TextField
              label="Cor do veiculo"
              {...getFieldProps('color')}
              error={Boolean(touched.color && errors.color)}
              helperText={touched.color && errors.color}
            />

            <TextField
              label="Problema do veiculo"
              {...getFieldProps('problem')}
              error={Boolean(touched.problem && errors.problem)}
              helperText={touched.problem && errors.problem}
            />

            <TextField
              label="Observações"
              {...getFieldProps('note')}
              error={Boolean(touched.note && errors.note)}
              helperText={touched.note && errors.note}
            />

            <FormControlLabel
              control={<Switch {...getFieldProps('finish')} checked={values.finish} />}
              label="Ordem de serviço concluida"
              labelPlacement="start"
              sx={{ mb: 1, mx: 0, width: '100%', justifyContent: 'space-between' }}
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
              {!isEdit ? 'Criar ordem de serviço' : 'Salvar alterações'}
            </LoadingButton>
          </Stack>
        </Card>
      </Form>
    </FormikProvider>
  );
}
