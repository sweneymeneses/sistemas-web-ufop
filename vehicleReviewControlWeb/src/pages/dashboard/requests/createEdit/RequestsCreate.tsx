// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'src/routes/paths';
// hooks
import useSettings from 'src/hooks/useSettings';
// components
import Page from 'src/components/Page';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
// sections
import RequestNewEditForm from './newEditForm';
import { useDispatch } from '../../../../redux/store';
import { useLocation, useParams } from 'react-router';
import { useEffect } from 'react';
import { clearOrderService, getOrderService } from '../../../../redux/slices/serviceOrder';
import { getCustomers } from '../../../../redux/slices/customer';

// ----------------------------------------------------------------------

export default function RequestsCreate() {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const { id } = useParams();

  const isEdit = pathname.includes('edit');

  useEffect(() => {
    if (id) {
      dispatch(getOrderService(id));
    }
    return () => {
      dispatch(clearOrderService());
    };
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getCustomers({ step: 100, page: 0, filterName: '' }));
  }, []);

  return (
    <Page title="Ordem de serviços">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Ordem de serviços"
          links={[
            { name: 'Ordem de serviços', href: PATH_DASHBOARD.requests.list },
            { name: 'Nova ordem de serviço' },
          ]}
        />

        <RequestNewEditForm isEdit={isEdit} id={id} />
      </Container>
    </Page>
  );
}
