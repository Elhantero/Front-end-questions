import React from 'react';
import { Link } from "react-router-dom";
import { Header } from "../../styled/styledComponents";

export default () => (
    <Header id="pageHeader">
        <Link to="/">Запитання по категоріям</Link>
        <span>{` / `}</span>
        <Link to="/exam">Екзамен</Link>
        <span>{` / `}</span>
    </Header>
);

