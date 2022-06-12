import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, TableCell, MenuItem } from '@mui/material';
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import { fDate } from '../../../../utils/formatTime';

// ----------------------------------------------------------------------

interface CustomerProps {
  city: string;
  created_at: string;
  email: string;
  name: string;
  phone_mobile: number;
}

type Props = {
  row: CustomerProps;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  // onDeleteRow: VoidFunction;
};

export default function CustomersTableRow({
  row,
  selected,
  onSelectRow,
  // onDeleteRow,
  onEditRow,
}: Props) {
  const theme = useTheme();

  const { name, email, city, phone_mobile, created_at } = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>{name ? name : '-'}</TableCell>

      <TableCell>{email ? email : '-'}</TableCell>

      <TableCell>{city ? city : '-'}</TableCell>

      <TableCell>{phone_mobile ? phone_mobile : '-'}</TableCell>

      <TableCell>{fDate(created_at)}</TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Editar
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
