import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 20px;

    input[type="text"] {
        height: 40px;
        font-size: 16px;
        padding: 3px 10px;
        width: 100%;
        box-sizing: border-box;
}`


interface BtnDefaultStyle {
    bgColor: string,
    bgColorHover: string,
}

interface BtnStyles {
    [key: string]: BtnDefaultStyle
}

const typeToCssMap: BtnStyles = {
    save: {
        bgColor: '#2ecc71',
        bgColorHover: '#27ae60',
    },
    edit: {
        bgColor: '#03b1d2',
        bgColorHover: '#04839a',
    },
    del: {
        bgColor: '#e32626',
        bgColorHover: '#af1515',
    },
};

interface BtnProps {
    $btnType?: string
}

export const Btn = styled.button<BtnProps>`
    font-size: 18px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    color: #fff;
    border-radius: 5px;
    background-color: ${(props) => (props.$btnType ? typeToCssMap?.[props.$btnType as keyof {}].bgColor : '#2ecc71')};
    white-space: nowrap;
    width: fit-content;
    height: 40px;
    padding: 0 10px;

    &:hover {
        background-color: ${(props) => (props.$btnType ? typeToCssMap?.[props.$btnType as keyof {}].bgColorHover : '#27ae60')};;
    }

    &:disabled {
        background-color: #a5a5a5;
    }
`;

interface LabelProps {
    $readyStatus?: boolean,
}

export const Label = styled.label<LabelProps>`
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 24px;
    justify-content: center;
    box-sizing: border-box;
    padding: 0;
    cursor: pointer;
    user-select: none;
    border-radius: 50%;
    color: ${({$readyStatus}) => $readyStatus ? '#fff' : '#73beff'};
    border: 1px solid ${({$readyStatus}) => $readyStatus ? '#fff' : '#73beff'};

    .arrow {
        border: solid ${({$readyStatus}) => $readyStatus ? '#fff' : '#73beff'};
        border-width: 0 3px 3px 0;
        display: inline-block;
        padding: 3px;
    }

    .right {
        transform: rotate(-45deg);
    }

    .left {
        transform: rotate(135deg);
    }

    .up {
        transform: rotate(-135deg);
    }

    .down {
        transform: rotate(45deg);
    }
`;


export const BtnWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;

    input[type=checkbox] {
        transform: scale(3);
        cursor: pointer;
        margin: 0 15px;
    }
`;