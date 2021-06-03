/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

//--- Material Control
import {
  DialogActions,
  Button,
  TextField,
  DialogContent,
  DialogTitle,
  Dialog,
  makeStyles,
  Typography,
  IconButton,
  Box
} from '@material-ui/core';

//--- Material Icon
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles(theme => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  fullWidth: {
    width: '100%'
  }
}));

const DialogNopThue = ({ isOpen, onClose, onSuccess, paymentTax, ...props }) => {
  const classes = useStyles();
  console.log('paymentTax', paymentTax);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const { register, handleSubmit, errors, setValue } = useForm({
    mode: 'all',
    reValidateMode: 'onBlur'
  });

  const onSubmit = data => {
    if (!data && paymentTax.id) return;
    const _data = {
      ...data
    };
    onSuccess(paymentTax?.id, _data);
  };

  return (
    <Box>
      <Dialog open={isOpen} onClose={onClose} fullWidth={true} maxWidth="sm">
        <DialogTitle disableTypography className={classes.borderBottomHeader}>
          <Typography variant="h6">Nộp thuế</Typography>
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <DialogContent dividers>
            <Box mb={2}>
              <Box mb={1}>
                Số tiền thành toán<span className="required"></span>
              </Box>
              <TextField
                id="paymentAmount"
                {...register('paymentAmount', { required: true })}
                error={errors && errors.paymentAmount && errors.paymentAmount.type === 'required'}
                fullWidth
                type="text"
                variant="outlined"
                size="small"
              />
              {errors && errors.paymentAmount && errors.paymentAmount.type === 'required' && (
                <span className="error">Trường này là bắt buộc</span>
              )}
            </Box>
          </DialogContent>

          <DialogActions>
            <Button type="button" onClick={onClose} variant="contained" startIcon={<CloseIcon />}>
              Hủy
            </Button>
            <Button id="btnLuu" type="submit" color="primary" variant="contained" startIcon={<SaveIcon />}>
              Lưu
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default DialogNopThue;
