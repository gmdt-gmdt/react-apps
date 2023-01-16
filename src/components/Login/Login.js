import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../Input/Input";

const emailReducer = (state, action) => {
  switch (action.type) {
    case "USER_INPUT":
      return { isValid: action.val.includes("@"), value: action.val };
    case "USER_BLUR":
      return { isValid: state.value.includes("@"), value: state.value };
    default:
      return state;
  }
};

const passwordReducer = (state, action) => {
  switch (action.type) {
    case "USER_INPUT":
      return {
        isValid: action.val.trim().length > 6,
        value: action.val,
      };
    case "USER_BLUR":
      return { isValid: state.value.trim().length > 6, value: state.value };
    default:
      return state;
  }
};

const Login = (props) => {
  const authCtx = useContext(AuthContext);
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "string",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "string",
    isValid: null,
  });

  useEffect(() => {
    console.log("EFFECT RUNNING");

    return () => {
      console.log("EFFECT CLEANUP");
    };
  }, []);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
    //setEnteredPassword(event.target.value);

    setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "USER_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "USER_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      inputEmailRef.current.focus();
    } else {
      inputPasswordRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={inputEmailRef}
          label="E-Mail"
          id="email"
          type="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={inputPasswordRef}
          label="Password"
          id="password"
          type="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
