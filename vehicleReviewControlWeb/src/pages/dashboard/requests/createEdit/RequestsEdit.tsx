import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'src/routes/paths';
// hooks
import useSettings from 'src/hooks/useSettings';
// _mock_
import { _invoices } from 'src/_mock';
// components
import Page from 'src/components/Page';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
// sections
import RequestNewEditForm from './newEditForm';

// ----------------------------------------------------------------------

export default function RequestsEdit() {
  const { themeStretch } = useSettings();

  const { id } = useParams();

  const currentInvoice = _invoices.find((invoice) => invoice.id === id);

  return (
    <Page title="Invoices: Edit">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Edit invoice"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Invoices', href: PATH_DASHBOARD.invoice.list },
            { name: `INV-${currentInvoice?.invoiceNumber}` || '' },
          ]}
        />

        <RequestNewEditForm isEdit={false} />
      </Container>
    </Page>
  );
}
