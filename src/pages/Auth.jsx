import React, { useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { authService } from "../firebase";

const Auth = ({ isLoggedIn }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isSignUp, setIsSignUp] = useState(!isLoggedIn);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isSignUp) {
        // 회원가입 로직
        response = await createUserWithEmailAndPassword(
          authService,
          emailRef.current.value,
          passwordRef.current.value
        );
        setIsSignUp(true);
      } else {
        // 로그인 로직
        response = await signInWithEmailAndPassword(
          authService,
          emailRef.current.value,
          passwordRef.current.value
        );
      }
      if (response) {
        emailRef.current.value = "";
        passwordRef.current.value = "";
      }
    } catch (error) {
      alert("이미 존재하는 계정입니다.");
    }
  };
  // 로그인 회원가입 토글
  const changeMode = (e) => {
    e.preventDefault();
    setIsSignUp((prev) => !prev);
  };

  // 구글 로그인
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(authService, provider).then((result) => {
        const { accessToken } = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        console.log(accessToken, user);
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="email" placeholder="email" ref={emailRef} required />
        <input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          required
        />
        {isSignUp ? <button>회원가입</button> : <button>로그인</button>}
        {isSignUp ? (
          <button onClick={changeMode}>로그인하러가기</button>
        ) : (
          <button onClick={changeMode}>회원가입하러가기</button>
        )}
      </form>
      <div>
        <button onClick={googleLogin}>Google 로그인</button>
      </div>
    </div>
  );
};

export default Auth;
