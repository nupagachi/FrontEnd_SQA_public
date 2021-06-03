import React from 'react';
import { useHistory } from 'react-router';
import './style/css/header.css';
import { ROUTER_NAME } from 'src/constants';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const items = [
  // {
  //   href: ROUTER_NAME.MAP_LAYER,
  //   icon: HomeIcon,
  //   title: "Trang chủ",
  //   showBorder: true
  // },
  {
    href: ROUTER_NAME.DANGKITHUE,
    title: 'Đăng kí'
  },
  {
    href: ROUTER_NAME.KHAIBAOTHUE,
    title: 'Khai báo thuế'
  },
  {
    href: ROUTER_NAME.TINHTHUE,
    title: 'Tính thuế'
  },
  {
    href: ROUTER_NAME.NOPTHUE,
    title: 'Nộp thuế'
  }
];

const NavBar = () => {
  const { location } = useHistory();
  return (
    <header>
      <div className="header-left">
        {/* <img src="" alt="" /> */}
        <h1 className="brand">
          <a href="index.html">SAMPLE TEXT</a>
        </h1>
      </div>
      <div className="header-right">
        <ul className="menu">
          <li className={ROUTER_NAME.DANGKITHUE === location.pathname && 'active'}>
            <Link id="link_dangki" style={{ textDecoration: 'none' }} to={ROUTER_NAME.DANGKITHUE}>
              {'Đăng kí'}
            </Link>
          </li>
          <li className={ROUTER_NAME.KHAIBAOTHUE === location.pathname && 'active'}>
            <Link id="link_khaibao" style={{ textDecoration: 'none' }} to={ROUTER_NAME.KHAIBAOTHUE}>
              {'Khai báo thuế'}
            </Link>
          </li>
          <li className={ROUTER_NAME.TINHTHUE === location.pathname && 'active'}>
            <Link id="link_tinhthue" style={{ textDecoration: 'none' }} to={ROUTER_NAME.TINHTHUE}>
              {'Tính thuế'}
            </Link>
          </li>
          <li className={ROUTER_NAME.NOPTHUE === location.pathname && 'active'}>
            <Link id="link_nopthue" style={{ textDecoration: 'none' }} to={ROUTER_NAME.NOPTHUE}>
              {'Nộp thuê'}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default NavBar;
