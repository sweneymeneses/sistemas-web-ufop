import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { getCustomer, clearCustomer } from '../../../../redux/slices/customer';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import CustomersNewEditForm from './CustomersNewEditForm';

// ----------------------------------------------------------------------

export default function CustomersCreate() {
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const { id } = useParams();

  const isEdit = pathname.includes('edit');
  const isCreate = pathname.includes('new');

  useEffect(() => {
    if (id) {
      dispatch(getCustomer(id));
    }
    return () => {
      dispatch(clearCustomer());
    };
  }, [dispatch, id]);

  return (
    <Page title="Cadastrar novo cliente">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading={
            isCreate ? 'Cadastrar novo cliente' : isEdit ? 'Editar cliente' : 'Detalhes do cliente'
          }
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Clientes',
              href: PATH_DASHBOARD.customers.list,
            },
            { name: !isEdit ? 'Cadastrar novo cliente' : 'Editar cliente' },
          ]}
        />

        <CustomersNewEditForm isEdit={isEdit} />
      </Container>
    </Page>
  );
}
