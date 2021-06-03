import React from 'react';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Box, Button, TextField, makeStyles } from '@material-ui/core';

//--- Custom component
import useAuth from 'src/hooks/useAuth';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Register = ({ className, ...rest }) => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm({
    mode: 'all',
    reValidateMode: 'onBlur'
  });

  const { login } = useAuth();

  const onSubmit = values => {
    console.log('value', values);
    login({ id: values.id });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={clsx(classes.root, className)} {...rest}>
      <TextField fullWidth label="Mã số thuế" {...register('id')} name="id" variant="outlined" />
      <Box mt={2}>
        <Button color="primary" fullWidth size="large" type="submit" variant="contained">
          Đăng nhập
        </Button>
      </Box>
    </form>
  );
};

Register.propTypes = {
  className: PropTypes.string
};

export default Register;
