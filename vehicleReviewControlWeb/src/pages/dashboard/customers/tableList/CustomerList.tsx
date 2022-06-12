import { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Card, Table, Button, TableBody, Container, TableContainer } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useTable from '../../../../hooks/useTable';
// components
import Page from '../../../../components/Page';
import Iconify from '../../../../components/Iconify';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { TableNoData, TableHeadCustom } from '../../../../components/table';
// sections
import CustomersTableRow from './CustomersTableRow';
import CustomersTableToolbar from './CustomersTableToolbar';
import TablePaginationTranslation from 'src/components/TablePaginationTranslation';
import { deleteCustomer, getCustomers } from 'src/redux/slices/customer';
import Scrollbar from 'src/components/Scrollbar';
import useTabs from 'src/hooks/useTabs';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Nome', align: 'left' },
  { id: 'email', label: 'Email', align: 'left' },
  { id: 'city', label: 'Cidade', align: 'left' },
  { id: 'phone_mobile', label: 'Celular', align: 'left' },
  { id: 'created_at', label: 'Data de criação', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function Customers() {
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
    //
    onSort,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({
    defaultOrderBy: 'name',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customers, count, isLoading } = useSelector((state) => state.customer);
  const [filterName, setFilterName] = useState('');
  const { currentTab: filterStatus, onChangeTab: onFilterStatus } = useTabs('all');

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
  };

  // const handleDeleteRow = (id: string) => {
  //   dispatch(deleteCustomer(id));
  // };

  const handleEditRow = (id: number) => {
    navigate(PATH_DASHBOARD.customers.edit(id));
  };

  useEffect(() => {
    dispatch(
      getCustomers({
        step: rowsPerPage,
        page,
        filterName,
        order,
        orderBy,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterName, rowsPerPage, page, dispatch, order, orderBy, filterStatus]);

  const isNotFound = !customers;

  return (
    <Page title="Lista de clientes">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Lista de clientes"
          links={[{ name: 'Lista de clientes' }]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to={PATH_DASHBOARD.customers.new}
            >
              Novo cliente
            </Button>
          }
        />

        <Card>
          <CustomersTableToolbar filterName={filterName} onFilterName={handleFilterName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 960, position: 'relative' }}>
              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={count}
                  numSelected={selected.length}
                  onSort={onSort}
                />

                <TableBody>
                  {customers?.length > 0 ? (
                    customers.map((row: any) => (
                      <CustomersTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id)}
                        onSelectRow={() => onSelectRow(row.id)}
                        // onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                      />
                    ))
                  ) : (
                    <TableNoData isNotFound={isNotFound} />
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePaginationTranslation
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------
