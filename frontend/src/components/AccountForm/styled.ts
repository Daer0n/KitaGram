import styled from 'styled-components';
import { Modal as AntdModal } from 'antd';

export const Modal = styled(AntdModal)`
    .ant-modal-content {
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .ant-modal-header {
        background-color: #f0f2f5;
        border-bottom: none;
        border-radius: 8px 8px 0 0;
    }

    .ant-modal-title {
        font-weight: 600;
        color: #333;
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .ant-modal-body {
        padding: 20px;
    }

    input {
        width: 100%;
        padding: 10px;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        margin-top: 10px;
        font-size: 20px;

        &:focus {
            border-color: #40a9ff;
            outline: none;
            box-shadow: 0 0 5px rgba(64, 169, 255, 0.5);
        }
    }
`;

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Content = styled.div`
    margin: 50px 0px;
    height: 90%;
    width: 30%;
    border: 1px solid var(--Grey-Grey-500, #dee2e6);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    padding: 30px;
    position: relative;
`;

export const Info = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Title = styled.div`
    color: #000;
    text-align: center;
    font-family: Montserrat;
    font-size: 44px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px;
    letter-spacing: -0.408px;
`;

export const Avatar = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: #ecebeb;

    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
`;

export const Button = styled.button`
    border-radius: 10px;
    outline: none;
    border: none;
    width: 60%;
    padding: 14px;
    color: #e16162;
    font-size: 23px;
    background-color: #ecebeb;
    cursor: pointer;
`;

export const SectionElement = styled.div`
    display: flex;
    width: 80%;
    font-size: 25px;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #e0e0e0;

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background-color: #f0f0f0;
        cursor: pointer;
    }
`;

export const Description = styled.span`
    font-weight: 500;
    color: #333;
`;

export const AvatarWrapper = styled.div`
    position: relative;
    display: inline-block;

    .edit-icon {
        position: absolute;
        top: 5px;
        right: 5px;
        color: #3498db;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
            color: #f39c12;
        }
    }
`;

export const BackButton = styled.button`
    position: absolute;
    top: 20px;
    left: 20px;
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 10;
    border: 2px solid #ccc;

    img {
        width: 24px;
        height: auto;
    }

    &:disabled {
        cursor: not-allowed;
    }
`;
