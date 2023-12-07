import { json, redirect } from "react-router-dom";
import AuthForm from "../../components/AuthForm";
import { setRefreshToken } from "../../storage/Cookie";
import { axiosPrivate } from "../../api/axiosInstance";
import { SET_USER } from "../../store/userSlice";
import store from "../../store";
import { SET_TOKEN } from "../../store/authSlice";

function LoginPage() {
  return <AuthForm />;
}

export default LoginPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "player";

  // mode 구분
  if (mode !== "player" && mode !== "admin") {
    throw json({ message: "Unsupported mode." }, { status: 422 });
  }
  // <Form> post 요청시 사용자 입력값 가져옴
  const data = await request.formData();
  const authData = {
    email: data.get("username"),
    password: data.get("password"),
  };

  try {
    // axios 로그인
    const response = await axiosPrivate.post(
      "/login",
      JSON.stringify(authData)
    );
    const token = response?.data?.token;
    const role = response?.data?.roles;

    // 로그인 후 client에 저장할 것들
    // 1. redux state : user와 auth 상태값 update
    store.dispatch(SET_USER({ role, username: authData.email }));
    store.dispatch(SET_TOKEN(token));
    
    // 2. cookie에 refresh token 저장
    setRefreshToken(token);

    // 사용자 리다이렉트
    return redirect(`/${mode}`);
  } catch (err) {
    if (err.code === "ERR_BAD_REQUEST") {
      return "정확한 아이디 혹은 비밀번호를 입력하세요.";
    } else {
      return err.message;
    }
  }

  // const response = await fetch("http://localhost:8080/login", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(authData),
  // });

  // if (response.status === 422 || response.status === 401) {
  //   return response;
  // }

  // if (!response.ok) {
  //   throw json({ message: "Could not authenticate user." }, { status: 500 });
  // }

  // // token 처리
  // const resData = await response.json();
  // const token = resData.token;
  // setRefreshToken(token);

  // return redirect("/");
}
