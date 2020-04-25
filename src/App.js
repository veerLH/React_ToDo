import React from "react";

import { Provider } from "react-redux";
import store from "./store";
import TodoApp from "./components/TodoApp";
import Container from "./components/Container/Container";
import Center from "./components/Center/Center";

const App = () => {
  return (
    <Provider store={store}>
      <Container color="#f9AA33">
        <Center>
          <TodoApp title="ToDo TEsting" />
        </Center>
      </Container>
    </Provider>
  );
};

export default App;
