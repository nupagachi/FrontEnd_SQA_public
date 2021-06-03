import React from 'react';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Box, Button, TextField, makeStyles } from '@material-ui/core';

//--- Custom component
import useAuth from 'src/hooks/useAuth';

const useStyles = makeStyles(() => ({
  root: {}
}));

const JWTLogin = ({ className, ...rest }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { register, handleSubmit } = useForm({
    mode: 'all',
    reValidateMode: 'onBlur'
  });

  const { login } = useAuth();

  const onSubmit = values => {
    if (!values?.id) {
      enqueueSnackbar(`Vui lòng nhập mã số thuế để đăng nhập hệ thống`, { variant: 'error' });
      return;
    }

    // if (resLogin?.content?.token) {
    //   SetDataToStorage(LOCAL_STORAGE_KEY.TOKEN, resLogin.content.token);
    //   const resUseInfo = await AuthService.GetUserAccountDetail();

    //   if (resUseInfo?.content) {
    //     dispatch({
    //       type: ACTION_TYPE.LOGIN,
    //       payload: {
    //         user: resUseInfo.content
    //       }
    //     });
    //     return resLogin;
    //   }

    //   throw resUseInfo;
    // }
    login({ id: values.id })
      .then(res => enqueueSnackbar(`Đăng nhập thành công`, { variant: 'success' }))
      .catch(err => {
        enqueueSnackbar(`${err.message}`, { variant: 'error' });
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={clsx(classes.root, className)} {...rest}>
      <TextField id="man00_id" fullWidth label="Mã số thuế" {...register('id')} name="id" variant="outlined" />
      <Box mt={2}>
        <Button id="man00_btn" color="primary" fullWidth size="large" type="submit" variant="contained">
          Nhập mã số thuế để tiếp tục
        </Button>
      </Box>
    </form>
  );
};

JWTLogin.propTypes = {
  className: PropTypes.string
};

export default JWTLogin;
