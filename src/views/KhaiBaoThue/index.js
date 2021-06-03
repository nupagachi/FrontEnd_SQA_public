import React, { useState, useEffect, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import MomentUtils from '@date-io/moment';
import 'moment/locale/vi';

import { Box, Grid, TextField, FormControlLabel, Button } from '@material-ui/core';
import moment from 'moment';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Select from '@material-ui/core/Select';
import useAuth from 'src/hooks/useAuth';
import { getTaxById, postPay, tinhThue } from 'src/redux/store';

const KhaiBaoThue = () => {
  const { user } = useAuth();
  const [taxInfo, setTaxInfo] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [month, setMonth] = useState(0);
  let typingTimer = null;
  const [income, setIncome] = useState(0);
  const [selectedDate, handleDateChange] = useState(new Date());

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm({ mode: 'all', reValidateMode: 'onBlur' });

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

  useEffect(() => {
    if (user) {
      getTaxById(user)
        .then(res => {
          setTaxInfo(res?.item);
        })
        .catch(err => setTaxInfo(null));
    }
  }, [user]);
  const onSubmit = data => {
    const _data = {
      ...data,
      taxId: user,
      calculateDate: moment(selectedDate).unix(),
      numberOfDependents: month
    };
    postPay(_data)
      .then(res => {
        enqueueSnackbar(`Khai báo thuế thành công`, { variant: 'success' });
      })
      .catch(error => {
        enqueueSnackbar(`${error.message}`, { variant: 'error' });
      });
  };
  if (taxInfo === null)
    return (
      <Box color="red" fontSize="30px" fontWeight="bold">
        <span className="required"></span>Bạn phải đăng kí thông tin trước khi khai báo
      </Box>
    );

  return (
    <>
      <Grid container>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Box marginBottom={3} fontSize="30px" textAlign="center" fontWeight="bold">
            Khai báo thuế thu nhập cá nhân
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid style={{ margin: '0px auto' }} container>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  Tổng thu nhập<span className="required"></span>
                </Grid>
                <Grid item xs={8}>
                  <TextField
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
                      id="numberOfDependents"
                      size="small"
                      variant="outlined"
                      defaultValue={0}
                      onChange={e => {
                        const month = e.target.value;
                        setMonth(month);
                        handleOnChange(getValues('income'), month);
                      }}
                    >
                      <MenuItem value={1}>0</MenuItem>
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
              <Grid container style={{ marginTop: '20px' }} spacing={2}>
                <Grid item xs={4}>
                  Tháng đóng thuế
                </Grid>
                <Grid item xs={8}>
                  <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale="vi">
                    <Fragment>
                      <DatePicker
                        id="calculateDate"
                        size="small"
                        format="MM/yyyy"
                        fullWidth
                        inputVariant="outlined"
                        openTo="month"
                        views={['year', 'month']}
                        // minDate={new Date('2007-11-01')}
                        // maxDate={new Date('2021-06-01')}
                        value={selectedDate}
                        onChange={date => {
                          handleDateChange(date);
                        }}
                      />
                    </Fragment>
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Box fontSize="20px" fontWeight="bold">
                  Số thuế phải đóng là:{income || 0} VND
                </Box>
              </Grid>
              <Grid style={{ marginTop: '20px' }} container spacing={2}>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Đăng ký
                  </Button>
                </Grid>
              </Grid>

              <img style={{ margin: 'auto', marginTop: '20px' }} src={require('src/assets/images/tax.png')} />
            </Grid>
          </form>
        </Grid>

        <Grid item xs={2} />
      </Grid>
    </>
  );
};
export default KhaiBaoThue;
