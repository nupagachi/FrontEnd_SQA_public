import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, TextField, Button, Grid } from '@material-ui/core';
import { postTax } from 'src/redux/store';
import useAuth from 'src/hooks/useAuth';
import { useSnackbar } from 'notistack';
import { getTaxById, postPay } from 'src/redux/store';

const DangKiThue = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const [taxInfo, setTaxInfo] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: 'all', reValidateMode: 'onBlur' });
  useEffect(() => {
    getTaxById(user)
      .then(res => {
        setTaxInfo(res?.item);
      })
      .catch(err => setTaxInfo(null));
  }, [user]);

  const onSubmit = data => {
    const _data = { ...data, id: 1 };
    postTax(_data)
      .then(res => enqueueSnackbar(`${res.message}`, { variant: 'success' }))
      .catch(err => {
        enqueueSnackbar(`${err.message}`, { variant: 'error' });
      });
  };
  if (taxInfo !== null)
    return (
      <>
        <Box id="man01_label_info" textAlign="center" fontSize="30px" fontWeight="bold">
          Thông tin đăng kí của bạn là
        </Box>
        <Grid style={{ marginTop: '30px' }} container>
          <Grid item xs={3}></Grid>
          <Grid style={{ margin: 'auto' }} item xs={6}>
            <Box fontSize={'20px'}>Mã số thuế:{taxInfo?.id}</Box>
            <Box fontSize={'20px'}>Người nộp thuế:{taxInfo?.name}</Box>
            <Box fontSize={'20px'}>Địa chỉ trụ sở:{taxInfo?.address}</Box>
            <Box fontSize={'20px'}>Quận/Huyện:{taxInfo?.district}</Box>
            <Box fontSize={'20px'}>Tỉnh/Thành phố:{taxInfo?.city}</Box>
            <Box fontSize={'20px'}>Số điện thoại:{taxInfo?.id}</Box>
            <Box fontSize={'20px'}>Fax:{taxInfo?.fax}</Box>
            <Box fontSize={'20px'}>Email:{taxInfo?.email}</Box>
            <Box fontSize={'20px'}>Nghành nghề kinh doanh chính:{taxInfo?.business}</Box>
            <Box fontSize={'20px'}>Số tài khoản ngân hàng:{taxInfo?.accountNumber}</Box>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </>
    );
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Box id="man01_label" className="row" marginBottom="8px" textAlign="center" fontWeight="bold" fontSize="36px">
            Đăng ký thông tin thuế
          </Box>
          <Grid style={{ marginBottom: '10px' }} container direction="row" justify="center" alignItems="center">
            <Grid container direction="row" item xs={12}>
              <Grid item xs={3}></Grid>
              <Grid item xs={2}>
                Mã số thuế
              </Grid>
              <Grid item xs={4}>
                <TextField
                  size="small"
                  defaultValue="1234565877"
                  name="id"
                  defaultValue={user}
                  disabled={true}
                  style={{ width: '100%' }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
            <Grid container direction="row" item xs={12}>
              <Grid item xs={3}></Grid>
              <Grid item xs={9}></Grid>
            </Grid>
          </Grid>
          <Grid style={{ marginBottom: '10px' }} container direction="row" justify="center" alignItems="center">
            <Grid container direction="row" item xs={12}>
              <Grid item xs={3}></Grid>
              <Grid item xs={2}>
                Người nộp thuế<span className="required"></span>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  size="small"
                  id="name"
                  {...register('name', { required: true })}
                  error={errors && errors.name}
                  style={{ width: '100%' }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
            <Grid container direction="row" item xs={12}>
              <Grid item xs={3}></Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={4}>
                {errors.name && errors.name.type === 'required' && <div className="error">Trường này là bắt buộc</div>}
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
          </Grid>
          <Grid style={{ marginBottom: '10px' }} container direction="row" justify="center" alignItems="center">
            <Grid container direction="row" item xs={12}>
              <Grid item xs={3}></Grid>
              <Grid item xs={2}>
                Địa chỉ trụ sở<span className="required"></span>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  size="small"
                  id="address"
                  {...register('address', { required: true })}
                  error={errors && errors.address}
                  style={{ width: '100%' }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
            <Grid container direction="row" item xs={12}>
              <Grid item xs={3}></Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={4}>
                {errors.address && errors.address.type === 'required' && (
                  <div className="error">Trường này là bắt buộc</div>
                )}
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
          </Grid>
          <Grid style={{ marginBottom: '10px' }} container direction="row" justify="center" alignItems="center">
            <Grid container direction="row" item xs={12}>
              <Grid item xs={3}></Grid>
              <Grid item xs={2}>
                Quận/Huyện<span className="required"></span>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  size="small"
                  id="district"
                  {...register('district', { required: true })}
                  error={errors && errors.district}
                  style={{ width: '100%' }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
            <Grid container direction="row" item xs={12}>
              <Grid item xs={3}></Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={4}>
                {errors.district && errors.district.type === 'required' && (
                  <div className="error">Trường này là bắt buộc</div>
                )}
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
          </Grid>
          <Grid style={{ marginBottom: '10px' }} container direction="row" justify="center" alignItems="center">
            <Grid container direction="row" item xs={12}>
              <Grid item xs={3}></Grid>
              <Grid item xs={2}>
                Tỉnh/Thành phố<span className="required"></span>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  size="small"
                  id="city"
                  {...register('city', { required: true })}
                  error={errors && errors.city}
                  style={{ width: '100%' }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
            <Grid container direction="row" item xs={12}>
              <Grid item xs={3}></Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={4}>
                {errors.city && errors.city.type === 'required' && <div className="error">Trường này là bắt buộc</div>}
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
          </Grid>
          <Grid style={{ marginBottom: '10px' }} container direction="row" justify="center" alignItems="center">
            <Grid container direction="row" item xs={12}>
              <Grid item xs={3}></Grid>
              <Grid item xs={2}>
                Số điện thoại<span className="required"></span>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  size="small"
                  id="phone"
                  {...register('phone', { required: true })}
                  error={errors && errors.phone}
                  style={{ width: '100%' }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
            <Grid container direction="row" item xs={12}>
              <Grid item xs={3}></Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={4}>
                {errors.phone && errors.phone.type === 'required' && (
                  <div className="error">Trường này là bắt buộc</div>
                )}
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
          </Grid>
          <Grid style={{ marginBottom: '10px' }} container direction="row" justify="center" alignItems="center">
            <Grid container direction="row" item xs={12}>
              <Grid item xs={3}></Grid>
              <Grid item xs={2}>
                Fax<span className="required"></span>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  size="small"
                  id="fax"
                  {...register('fax', { required: true })}
                  error={errors && errors.fax}
                  style={{ width: '100%' }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
            <Grid container direction="row" item xs={12}>
              <Grid item xs={3}></Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={4}>
                {errors.fax && errors.fax.type === 'required' && <div className="error">Trường này là bắt buộc</div>}
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
          </Grid>
          <Grid style={{ marginBottom: '10px' }} container direction="row" justify="center" alignItems="center">
            <Grid container direction="row" item xs={12}>
              <Grid item xs={3}></Grid>
              <Grid item xs={2}>
                Email<span className="required"></span>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  size="small"
                  id="email"
                  {...register('email', { required: true })}
                  error={errors && errors.email}
                  style={{ width: '100%' }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
            <Grid container direction="row" item xs={12}>
              <Grid item xs={3}></Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={4}>
                {errors.email && errors.email.type === 'required' && (
                  <div className="error">Trường này là bắt buộc</div>
                )}
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
          </Grid>
          <Grid style={{ marginBottom: '10px' }} container direction="row" justify="center" alignItems="center">
            <Grid container direction="row" item xs={12}>
              <Grid item xs={3}></Grid>
              <Grid item xs={2}>
                Ngành nghề kinh doanh chính<span className="required"></span>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  size="small"
                  id="business"
                  {...register('business', { required: true })}
                  error={errors && errors.business}
                  style={{ width: '100%' }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
            <Grid container direction="row" item xs={12}>
              <Grid item xs={3}></Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={4}>
                {errors.business && errors.business.type === 'required' && (
                  <div className="error">Trường này là bắt buộc</div>
                )}
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
          </Grid>
          <Grid style={{ marginBottom: '10px' }} container direction="row" justify="center" alignItems="center">
            <Grid container direction="row" item xs={12}>
              <Grid item xs={3}></Grid>
              <Grid item xs={2}>
                Số tài khoản ngân hàng<span className="required"></span>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  size="small"
                  id="accountNumber"
                  {...register('accountNumber', { required: true })}
                  error={errors && errors.accountNumber}
                  style={{ width: '100%' }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
            <Grid container direction="row" item xs={12}>
              <Grid item xs={3}></Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={4}>
                {errors.accountNumber && errors.accountNumber.type === 'required' && (
                  <div className="error">Trường này là bắt buộc</div>
                )}
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button id="btnDangKi" type="submit" variant="contained" color="primary">
              Đăng ký
            </Button>
          </Box>
          {/* <Box>Quận/huyện</Box>
        <Box>Tỉnh/ thành phố</Box>
        <Box>Điện thoại</Box>
        <Box>Fax</Box>
        <Box>Email</Box>
        <Box>Nghành nghề kinh doanh chính</Box>
        <Box>Số tài khoản ngân hàng</Box>
        <Box>Người khai tờ thuê</Box>
        <Box>Tên đơn vị chủ quản</Box>
        <Box>Mã số thuế đơn vị chủ quản</Box> */}
        </Box>
      </form>
    </>
  );
};
export default DangKiThue;
