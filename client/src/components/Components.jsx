import styled, { keyframes } from "styled-components";

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
`;

export const ChefTitle = styled.h1`
  font-size: 64px;
  color: #4285f4;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const Container = styled.div`
  background-color: #f0f4f8;
  border-radius: 15px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 750px;
  max-width: 100%;
  min-height: 450px;
`;

export const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.8s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${(props) =>
    props.signinIn !== true
      ? `transform: translateX(100%); opacity: 1; z-index: 5;`
      : null}
`;

export const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.8s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${(props) =>
    props.signinIn !== true ? `transform: translateX(100%);` : null}
`;

export const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  height: 100%;
  text-align: center;
`;

export const Title = styled.h1`
  font-weight: 600;
  margin: 16px;
  font-size: 24px;
  font-family: "Poppins", sans-serif;
`;

export const Input = styled.input`
  background-color: #eef2f7;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(66, 133, 244, 0.5);
  }
`;

export const Button = styled.button`
  margin-top: 14px;
  border-radius: 25px;
  border: none;
  background-color: #34a853;
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: #0a8049;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  }
`;

export const GhostButton = styled(Button)`
  background-color: transparent;
  border: 2px solid #ffffff;
  color: #ffffff;
  &:hover {
    background-color: #f1f1f1;
    color: #34a853;
  }
`;

export const Anchor = styled.a`
  color: #666;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
  &:hover {
    color: #34a853;
  }
`;

export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.8s ease-in-out;
  z-index: 100;
  ${(props) =>
    props.signinIn !== true ? `transform: translateX(-100%);` : null}
`;

export const Overlay = styled.div`
  background: linear-gradient(
    45deg,
    #1a5cbe,
    #6225dc,
    #9c75c0,
    #1064e1,
    #4285f4
  );
  background-size: 500% 500%;
  animation: ${gradientAnimation} 10s ease infinite;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.8s ease-in-out;
  ${(props) => (props.signinIn !== true ? `transform: translateX(50%);` : null)}
`;

export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.8s ease-in-out;
`;

export const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${(props) => (props.signinIn !== true ? `transform: translateX(0);` : null)}
`;

export const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
  ${(props) => (props.signinIn !== true ? `transform: translateX(20%);` : null)}
`;

export const Paragraph = styled.p`
  font-size: 15px;
  font-weight: 300;
  line-height: 22px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
  font-family: "Poppins", sans-serif;
  color: #f0f0f0;
`;
