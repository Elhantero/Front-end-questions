import React, { PropsWithChildren } from 'react';
import { BodyWrapper } from "../../styled/styledComponents";
import Header from "./Header";
import Footer from "./Footer";

export default ({ children } : PropsWithChildren) => {
    return (
        <BodyWrapper>
            <Header />
            {children}
            <Footer />
        </BodyWrapper>
    );
};

