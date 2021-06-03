import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

import { Box, Grid, TextField, Select, MenuItem, FormControl } from '@material-ui/core';
import useAuth from 'src/hooks/useAuth';
import { getTaxById, postPay, tinhThue } from 'src/redux/store';

const TinhThue = () => {
  const { user } = useAuth();
  const [taxInfo, setTaxInfo] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [month, setMonth] = useState(1);
  let typingTimer = null;
  const [income, setIncome] = useState(0);

  const {
    register,
    setValue,
    getValues,
    formState: { errors }
  } = useForm({ mode: 'all', reValidateMode: 'onBlur' });

  useEffect(() => {
    if (user) {
      getTaxById(user)
        .then(res => {
          setTaxInfo(res?.item);
        })
        .catch(err => setTaxInfo(null));
    }
  }, [user]);
  if (taxInfo === null)
    return (
      <Box color="red" fontSize="30px" fontWeight="bold">
        <span className="required"></span>Bạn phải đăng kí thông tin trước khi khai báo
      </Box>
    );

  const handleOnChange = (value, value2 = 1) => {
    if (value !== '') {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(() => {
        tinhThue({ income: value, numberOfDependents: value2 }).then(res => {
          setIncome(res?.price);
        });
      }, 800);
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Box marginBottom={3} fontSize="30px" textAlign="center" fontWeight="bold">
            Tính thuế thu nhập cá nhân
          </Box>
          <Grid style={{ margin: '0px auto' }} container>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                Tổng thu nhập<span className="required"></span>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  id="man03_income"
                  type="number"
                  id="income"
                  fullWidth
                  {...register('income', { required: true })}
                  error={errors && errors.income}
                  variant="outlined"
                  onChange={e => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    setValue('income', value);
                    handleOnChange(value, month);
                  }}
                />
              </Grid>
            </Grid>
            <Grid style={{ marginTop: '20px' }} container spacing={2}>
              <Grid item xs={4}>
                Số người phụ thuộc<span className="required"></span>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Select
                    id="month"
                    size="small"
                    variant="outlined"
                    defaultValue={1}
                    onChange={e => {
                      const month = e.target.value;
                      setMonth(month);
                      handleOnChange(getValues('income'), month);
                    }}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box id="man03_caculated" fontSize="20px" fontWeight="bold">
                Số thuế phải đóng là:{income || 0} VND
              </Box>
            </Grid>

            <img style={{ margin: 'auto', marginTop: '20px' }} src={require('src/assets/images/tax.png')} />
          </Grid>
        </Grid>

        <Grid item xs={2} />
      </Grid>
    </>
  );
};
export default TinhThue;
