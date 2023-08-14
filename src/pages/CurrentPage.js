import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CurrentPage.css";
import axios from "axios";
import Cookies from "js-cookie";

function CurrentPage({ api }) {
  // api 전달 받음
  const navigate = useNavigate();

  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // GET 요청 보내기
  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `${"token " + token}`;

  axios
    .get(
      "https://port-0-begimeal-ac2nll45iv0u.sel3.cloudtype.app/users/current"
    )
    .then((response) => {
      const data = response.data;
      setName(data.user.username);
      setEmail(data.user.email);
      // 요청에 대한 처리 (data 변수에 응답 데이터가 들어옴)
    })
    .catch((error) => {
      // 에러 처리
      console.error("Error fetching data:", error);
    });

  const handleDelete = async () => {
    try {
      Cookies.remove("token");
      const response = await axios.delete(
        "https://port-0-begimeal-ac2nll45iv0u.sel3.cloudtype.app/users/current"
      );
      const data = response.data;
      if (data.user) {
        navigate("/MainPage");
      }
    } catch (error) {
      setMessage("중복된 회원이 있습니다.");
    }
  };

  return (
    <div className="signup-container">
      <h2>회원 정보 조회</h2>
      <div>
        <label>이름</label>
        <input type="text" value={username} readOnly />
      </div>
      <div>
        <label>이메일</label>
        <input type="email" value={email} readOnly />
      </div>
      <div className="button-container">
        <Link to="/MainPage">
          <button>취소</button>
        </Link>
        <Link to="/CurrentUpdatePage">
          <button>수정</button>
        </Link>
        {/* 회원 탈퇴 컴포넌트  */}
        <Link to="/CurrentDelete">
          <button onClick={handleDelete}>탈퇴</button>
        </Link>
      </div>
    </div>
  );
}

export default CurrentPage;