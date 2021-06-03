import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import moment from 'moment';

//--- Material Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

//--- Material Icon
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

//--- Material Control
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  tableContainer: {
    maxHeight: window.outerHeight - 365
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  }
}));

const headCells = [
  { id: 'stt', hideSortIcon: false, label: 'Số thứ tự' },
  { id: 'calculateDate', hideSortIcon: false, label: 'Tháng đóng thuế' },
  { id: 'income', hideSortIcon: false, label: 'Thu nhập' },
  { id: 'numberOfDependents', hideSortIcon: false, label: 'Số người phụ thuộc' },
  { id: 'price', hideSortIcon: true, label: 'Thuế phải đóng' },
  { id: 'payment', hideSortIcon: true, label: 'Thuế đã trả' },
  { id: 'status', hideSortIcon: true, label: 'Trạng thái' },
  { id: 'actions', hideSortIcon: true, label: '' }
];

const STATUS = {
  CREATED: 'CREATED',
  INCOMPLETE: 'INCOMPLETE',
  COMPLETE: 'COMPLETE'
};

function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell key={headCell.id}>{headCell.label}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired
};

const DanhSachNopThue = ({ editAction, deleteAction, danhSachThue = [], GetListHomePage, title, ...props }) => {
  const classes = useStyles();

  const getStatus = status => {
    if (status === STATUS.CREATED) return 'Đã khai báo';
    if (status === STATUS.COMPLETE) return 'Đã hoàn thành';
    if (status === STATUS.INCOMPLETE) return 'Chưa hoàn thành';
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer className={classes.tableContainer}>
          <Table className={classes.table} stickyHeader size="small">
            <EnhancedTableHead classes={classes} />
            <TableBody>
              {danhSachThue && danhSachThue.length > 0 ? (
                danhSachThue.map((row, index) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{moment.unix(row.calculateDate).format('MM/DD/YYYY')}</TableCell>
                      <TableCell>{row.income}</TableCell>
                      <TableCell>{row.numberOfDependents}</TableCell>
                      <TableCell>{row.price}</TableCell>
                      <TableCell>{row.payment}</TableCell>
                      <TableCell>{getStatus(row.status)}</TableCell>
                      <TableCell align="right">
                        {row.status !== STATUS.COMPLETE && (
                          <Tooltip title="Nộp thuế">
                            <IconButton id="btnDongThue" aria-label="Nộp thuế" onClick={() => editAction(row.id)}>
                              <EditIcon className="text-primary" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow hover tabIndex={-1}>
                  <TableCell colSpan={headCells.length} style={{ textAlign: 'center' }}>
                    Không có dữ liệu
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default DanhSachNopThue;
