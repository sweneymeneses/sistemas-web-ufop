import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Checkbox, TableRow, TableCell, Typography, Stack, Link, MenuItem } from '@mui/material';
// utils
import { fDate } from '../../../../../utils/formatTime';
import createAvatar from '../../../../../utils/createAvatar';
import { fCurrency } from '../../../../../utils/formatNumber';
// @types
import { Invoice } from '../../../../../@types/invoice';
// components
import Label from '../../../../../components/Label';
import Avatar from '../../../../../components/Avatar';
import Iconify from '../../../../../components/Iconify';
import { TableMoreMenu } from '../../../../../components/table';
import { orderServiceProps } from '../../../../../redux/slices/serviceOrder';

// ----------------------------------------------------------------------

type Props = {
  row: orderServiceProps;
  selected: boolean;
  onSelectRow: VoidFunction;
  onViewRow: VoidFunction;
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function OrderServicesTableRow({
  row,
  selected,
  onSelectRow,
  onViewRow,
  onEditRow,
  onDeleteRow,
}: Props) {
  const theme = useTheme();

  const { board, color, model, problem, year, note, created_at } = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell align="left">{row?.customer?.name}</TableCell>

      <TableCell align="left">{row?.customer?.phone_mobile}</TableCell>

      <TableCell align="left">{board}</TableCell>

      <TableCell align="left">{year}</TableCell>

      <TableCell align="left">{color}</TableCell>

      <TableCell align="left">{model}</TableCell>

      <TableCell align="left">{problem}</TableCell>

      <TableCell align="left">{note}</TableCell>

      <TableCell align="left">{fDate(created_at)}</TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Delete
              </MenuItem>

              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Edit
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
