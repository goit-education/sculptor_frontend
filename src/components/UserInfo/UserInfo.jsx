/*eslint-disable*/
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const StyledWrap = styled.div`
  order: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto';
  font-size: 1.4rem;
  color: #b9c3c8;
  text-transform: capitalize;

  @media screen and (min-width: 1024px) {
    margin-left: 26px;
    margin-right: 0px;
    order: 2;
  }
`;

const StyledUserInfo = styled.div`
  margin-left: 10px;
  margin-right: 4px;
  background-color: ${window.innerWidth > 1024 ? '#0c3351' : '#fff'};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  color: ${window.innerWidth > 1024 ? '#fff' : '#000'};
  font-size: 18px;
  text-transform: uppercase;
  line-height: 30px;
  text-align: center;
  box-shadow: 0 0 0 #fff;
`;

const UserInfo = props => {
  const { user } = props;
  return (
    <StyledWrap>
      <StyledUserInfo>{user.userName[0]}</StyledUserInfo>
      {window.innerWidth > 767 && `${user.userName}`}
    </StyledWrap>
  );
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserInfo);
