import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Nav from "./components/Nav";
import Login from "./components/Login";
import Signup from "./components/Signup";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { MemoryRouter } from "react-router";

const data = require("./_DATA");

describe("_saveQuestion", () => {
  it("will return the saved question if question is saved", async () => {
    var result = await data._saveQuestion({
      optionOneText: "one",
      optionTwoText: "two",
      author: "id",
    });
    expect(result.optionOne.text).toMatch("one");
    expect(result.optionTwo.text).toMatch("two");
    expect(result.author).toMatch("id");
  });
  it("will return an error if the question is not saved", async () => {
    var badQuestion = {
      optionOneText: "one",
      author: "id",
    };
    await expect(data._saveQuestion(badQuestion)).rejects.toMatch(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("_saveQuestionAnswer", () => {
  it("will return true if the answer is saved", async () => {
    var result = await data._saveQuestionAnswer({
      authedUser: "zoshikanlu",
      qid: "vthrdm985a262al8qx3do",
      answer: "optionOne",
    });

    expect(result).toBe(true);
  });
  it("will return an error if the question answer is not saved", async () => {
    await expect(
      data._saveQuestionAnswer({
        authedUser: "notauser",
        qid: "questiondoesnotexist",
      })
    ).rejects.toMatch("Please provide authedUser, qid, and answer");
  });
});

describe("App", () => {
  it("matches the snapshot when user not logged in", () => {
    var view = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(view).toMatchSnapshot();
  });
});

describe("<Nav />", () => {
  it("Renders <Nav/> component correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Nav />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/HOME/i)).toBeInTheDocument();
    expect(screen.getByText(/ADD POLL/i)).toBeInTheDocument();
    expect(screen.getByText(/LEADERBOARD/i)).toBeInTheDocument();
    expect(screen.getByText(/LOGOUT/i)).toBeInTheDocument();
  });
});

describe("Login", () => {
  it("will display an error if the password is not submitted", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    var add1 = screen.getByTestId("un");
    fireEvent.change(add1, { target: { value: "tylermcginnis" } });
    var submitButton = screen.getByTestId("submit");
    fireEvent.click(submitButton);
    expect(
      screen.getByText(/Error: Incorrect Username or password./i)
    ).toBeInTheDocument();
  });

  it("will display the signup page if the sign up button is clicked", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    var submitButton2 = screen.getByTestId("submit2");
    fireEvent.click(submitButton2);
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
  });

});

describe("_saveUser", () => {
  it("will return an error if the user is not saved", async () => {
    var badQuestion = {
      name: "fullname",
      avatarURL: "avatar",
    };
    await expect(data._saveUser(badQuestion)).rejects.toMatch(
      "Please provide user id, password, name, and avatar url"
    );
  });
});

describe("Signup", () => {
  it("will display loading page is new user fills out sign up form", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      </Provider>
    );
    var add1 = screen.getByTestId("un");
    fireEvent.change(add1, { target: { value: "newuser" } });
    var add2 = screen.getByTestId("pa");
    fireEvent.change(add2, { target: { value: "new" } });
    var add3 = screen.getByTestId("fn");
    fireEvent.change(add3, { target: { value: "new" } });
    var add4 = screen.getByTestId("av");
    fireEvent.change(add4, { target: { value: "new" } });
    var submitButton = screen.getByTestId("su");
    fireEvent.click(submitButton);
    expect(
      screen.getByTestId("loading")
    ).toBeInTheDocument();
  });

  
});