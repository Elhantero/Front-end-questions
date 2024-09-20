import styled from "styled-components";
import {Link} from "react-router-dom";

interface WrapperProps {
  $isActive: boolean
}

export const LinkWrapper = styled(Link)<WrapperProps>`
    background: ${(props) => (props.$isActive ? '#C7E4FA' : 'azure')};
    cursor: pointer;

    &:hover {
        background: #C7E4FA;
    }

    display: flex;
    padding: 15px;
    font-size: 16px;
    line-height: 24px;
    color: black;
    text-decoration: none;
    border: none;

    &:link {
        text-decoration: none;
    }

    &:visited {
        text-decoration: none;
    }

    &:hover {
        text-decoration: none;
    }

    &:active {
        text-decoration: none;
    }
`;
