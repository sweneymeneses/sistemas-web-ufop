import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// _mock_
import { _invoices } from '../../../../_mock';
// hooks
import useSettings from '../../../../hooks/useSettings';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import RequestDetails from '../../../../sections/@dashboard/requests/details';

// ----------------------------------------------------------------------

export default function RequestsDetails() {
  const { themeStretch } = useSettings();

  const { id } = useParams();

  const invoice = _invoices.find((invoice) => invoice.id === id);

  return (
    <Page title="Pedidos: Visualização">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Detalhes do pedido"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Pedidos',
              href: PATH_DASHBOARD.requests.list,
            },
            { name: `INV-${invoice?.invoiceNumber}` || '' },
          ]}
        />

        <RequestDetails invoice={invoice} />
      </Container>
    </Page>
  );
}
