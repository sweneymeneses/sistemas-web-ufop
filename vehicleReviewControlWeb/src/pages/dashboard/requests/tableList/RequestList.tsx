import sumBy from 'lodash/sumBy';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  Stack,
  Switch,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'src/routes/paths';
// hooks
import useTabs from 'src/hooks/useTabs';
import useSettings from 'src/hooks/useSettings';
import useTable, { getComparator, emptyRows } from 'src/hooks/useTable';
// _mock_
import { _invoices } from 'src/_mock';
// @types
import { Invoice } from 'src/@types/invoice';
// components
import Page from 'src/components/Page';
import Label from 'src/components/Label';
import Iconify from 'src/components/Iconify';
import Scrollbar from 'src/components/Scrollbar';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import {
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedActions,
} from 'src/components/table';
// sections
import RequestsAnalytic from 'src/sections/@dashboard/requests/RequestsAnalytic';
import { RequestsTableRow, RequestsTableToolbar } from './list';
import { useDispatch, useSelector } from 'src/redux/store';
import {
  getOrderServices,
  deleteOrderService,
  getOrderServicesCount,
} from 'src/redux/slices/serviceOrder';
import { useSnackbar } from 'notistack';
import OrderServicesTableRow from './list/OrderServicesTableRow';
import { clearCustomers } from '../../../../redux/slices/customer';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'customer.name', label: 'Name', align: 'left' },
  { id: 'customer?.phone_mobile', label: 'Celular', align: 'left' },
  { id: 'board', label: 'Placa', align: 'left' },
  { id: 'year', label: 'Ano', align: 'left' },
  { id: 'color', label: 'Cor', align: 'left' },
  { id: 'model', label: 'Modelo', align: 'left' },
  { id: 'problem', label: 'Problema', align: 'left' },
  { id: 'note', label: 'Observações', align: 'left' },
  { id: 'created_at', label: 'Data de criação', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function RequestsList() {
  const theme = useTheme();

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const { themeStretch } = useSettings();

  const navigate = useNavigate();

  const { orderServices, count, total, finish, pending } = useSelector(
    (state) => state.serviceOrder
  );

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: 'createDate' });

  const [tableData, setTableData] = useState(_invoices);

  const [filterName, setFilterName] = useState('');

  const [filterService, setFilterService] = useState('all');

  const [filterStartDate, setFilterStartDate] = useState<Date | null>(null);

  const [filterEndDate, setFilterEndDate] = useState<Date | null>(null);

  const { currentTab: filterStatus, onChangeTab: onFilterStatus } = useTabs('all');

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleFilterService = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterService(event.target.value);
  };

  const handleDeleteRow = async (id: string) => {
    await dispatch(deleteOrderService(id));
    enqueueSnackbar('Transação deletada com sucesso', { variant: 'success' });

    const calc = Math.ceil((count - 1) / rowsPerPage) - 1;

    if (page > calc) {
      setPage(calc);
    } else {
      dispatch(
        getOrderServices({
          step: rowsPerPage,
          page: page,
          filterOrder: TABS.filter((tab) => tab.value === filterStatus).reduce(
            (obj, item) =>
              Object.assign(obj, { filterName: item.filterName, filterValue: item.filterValue }),
            {}
          ),
          filterName,
        })
      );
    }
  };

  const handleEditRow = (id: string) => {
    navigate(PATH_DASHBOARD.requests.edit(id));
  };

  const handleViewRow = (id: string) => {
    navigate(PATH_DASHBOARD.requests.view(id));
  };

  const isNotFound = !orderServices;

  const denseHeight = dense ? 56 : 76;

  const TABS = [
    { value: 'all', label: 'Todas', color: 'info', filterName: 'finish', filterValue: undefined },
    {
      value: 'finish',
      label: 'Finalizadas',
      color: 'success',
      filterName: 'finish',
      filterValue: true,
    },
    {
      value: 'pending',
      label: 'Pendentes',
      color: 'error',
      filterName: 'finish',
      filterValue: false,
    },
  ] as const;

  useEffect(() => {
    dispatch(
      getOrderServices({
        step: rowsPerPage,
        page: page,
        filterOrder: TABS.filter((tab) => tab.value === filterStatus).reduce(
          (obj, item) =>
            Object.assign(obj, { filterName: item.filterName, filterValue: item.filterValue }),
          {}
        ),
        filterName,
      })
    );

    return () => {
      dispatch(clearCustomers());
    };
  }, [rowsPerPage, page, filterName, filterStatus]);

  useEffect(() => {
    dispatch(getOrderServicesCount());
  }, [orderServices]);

  return (
    <Page title="Ordem de serviços">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Ordem de serviços"
          links={[{ name: 'Ordem de serviços' }]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.requests.new}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              Nova ordem de serviço
            </Button>
          }
        />

        <Card sx={{ mb: 5 }}>
          <Scrollbar>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
              sx={{ py: 2 }}
            >
              <RequestsAnalytic
                title="Total"
                quantity={total}
                icon="ic:round-receipt"
                color={theme.palette.info.main}
              />
              <RequestsAnalytic
                title="Finalizadas"
                quantity={finish}
                icon="eva:checkmark-circle-2-fill"
                color={theme.palette.success.main}
              />
              <RequestsAnalytic
                title="Pendentes"
                quantity={pending}
                icon="eva:clock-fill"
                color={theme.palette.warning.main}
              />
            </Stack>
          </Scrollbar>
        </Card>

        <Card>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={filterStatus}
            onChange={onFilterStatus}
            sx={{ px: 2, bgcolor: 'background.neutral' }}
          >
            {TABS.map((tab) => (
              <Tab disableRipple key={tab.value} value={tab.value} label={tab.label} />
            ))}
          </Tabs>

          <Divider />

          <RequestsTableToolbar
            filterName={filterName}
            filterService={filterService}
            filterStartDate={filterStartDate}
            filterEndDate={filterEndDate}
            onFilterName={handleFilterName}
            onFilterService={handleFilterService}
            onFilterStartDate={(newValue) => {
              setFilterStartDate(newValue);
            }}
            onFilterEndDate={(newValue) => {
              setFilterEndDate(newValue);
            }}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      orderServices.map((row) => row.id)
                    )
                  }
                />
                <TableBody>
                  {orderServices.map((row) => (
                    <OrderServicesTableRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(row.id)}
                      onSelectRow={() => onSelectRow(row.id)}
                      onViewRow={() => handleViewRow(row.id)}
                      onEditRow={() => handleEditRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                    />
                  ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label="Dense"
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------
