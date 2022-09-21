import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "src/helper/AuthContext";
import { MyTime } from "src/components";
import * as S from "../SP_frontend/src/components/common/MyPlanSideBar/styled";

export const MyPlanSideBar = () => {
  const [authState, setAuthState] = useState({
    user_name: "",
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://52.79.235.48:8080/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            user_name: response.data.user_name,
            status: true,
          });
        }
      });
  }, []);
  return (
    <S.MyTimeDataContainer>
      <S.MyPlanText>{authState.user_name} 님</S.MyPlanText>
      <S.SelectMy>
        <S.SelectMyList>
          <S.SelectMyListText to="/time/today">오늘의 공부</S.SelectMyListText>
        </S.SelectMyList>
        <S.SelectMyList>
          <S.SelectMyListText to="/time/habit">습관 관리</S.SelectMyListText>
        </S.SelectMyList>
        <S.SelectMyList>
          <S.SelectMyListText to="mygoal">나의 목표</S.SelectMyListText>
        </S.SelectMyList>
      </S.SelectMy>
    </S.MyTimeDataContainer>
  );
};
