import React, { useState, useEffect } from 'react';
import DanhSachNopThue from './DanhSachNopThue';
import DialogNopThue from './DiaLogNopThue';
import { Box } from '@material-ui/core';
import { getDanhSachThue, dongThue } from 'src/redux/store';
import { useSnackbar } from 'notistack';

import useAuth from 'src/hooks/useAuth';

const NopThue = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [danhSachThue, setDanhSachThue] = useState([]);
  const [nopThue, setNopThue] = useState();
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      layDanhSach(user);
    }
  }, [user]);
  const layDanhSach = id => {
    getDanhSachThue(id)
      .then(res => setDanhSachThue(res?.items || []))
      .catch(err => console.log('err', err));
  };
  const clickNopThue = _id => {
    setOpen(true);
    setNopThue((danhSachThue || []).find(({ id }) => id === _id));
  };
  const handleNopThue = (id, data) => {
    dongThue(id, data)
      .then(res => {
        setOpen(false);
        enqueueSnackbar(`Nộp thuế thành công`, { variant: 'success' });
        if (user) {
          layDanhSach(user);
        }
      })
      .catch(error => {
        enqueueSnackbar(`${error.message}`, { variant: 'error' });
      });
  };
  return (
    <>
      <Box>
        <Box fontSize="30px" fontWeight="bold">
          Danh sách thuế
        </Box>
        {danhSachThue && <DanhSachNopThue danhSachThue={danhSachThue} editAction={clickNopThue}></DanhSachNopThue>}
        {nopThue && open && (
          <DialogNopThue
            isOpen={open}
            paymentTax={nopThue}
            onClose={() => setOpen(false)}
            onSuccess={(id, data) => handleNopThue(id, data)}
          ></DialogNopThue>
        )}
      </Box>
    </>
  );
};
export default NopThue;
