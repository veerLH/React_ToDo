import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchTodos ,toogleHighComplete, toogleCompleteAll,setTodoText,filterTodo} from "../Actions/TodoAction";
import Card from "./Card/Card";
import Text from "./Text/Text";
import TodoList from "./TodoList";
import Flex from "./Flex/Flex";
import SwitchControl from './SwitchControl/SwithControl';
import CheckBox from './Checkbox/Checkbox';
import TextField from './TextFiled/TextField';
import axios from 'axios';
import {api_domain} from '../config.json';

const TodoApp = ({ title, fetchTodos,hideComplete,completeAll ,addTodoText,toogleHighComplete ,toogleCompleteAll,setTodoText,filterTodo}) => {
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

const reload = (callback = () => {}) =>{

  if (hideComplete) {
    fetchTodos("completed=false",callback);
  } else {
    fetchTodos("",callback);
  }
};

const onSwitchHandle = (swithh) =>{
  toogleHighComplete();
  if (swithh.target.checked) {
    fetchTodos("completed=false")
  } else {
    fetchTodos();
  }
}
const onCompleteAll= (e) => {
  toogleCompleteAll();
  axios
    .patch(`${api_domain}todos/complete-all`,{
      completed : e.target.checked,
    })
    .then(()=>reload())
    .catch((err) => alert (err));
}

const onPressEnter = (e) => {
  if (e.key==="Enter") {
    axios
      .post(`${api_domain}todos`,{title:addTodoText})
      .then(()=>{
        reload();
        setTodoText("");
      })
      .catch((err) => alert(err));
  } 
}

  return (
    <Card minWidth="420">
      <Text title justify="center">{title}</Text>
      <Flex>
        <Flex flex="1"></Flex>
        <Flex>
          <SwitchControl
          checked={hideComplete}
          handleClick={onSwitchHandle}
          label="Hide Completed"
          />
        </Flex>
      </Flex>
      <Flex align="center">
          <Flex>
            <CheckBox 
            size = "20"
            label = "Complete All"
            checked = {completeAll}
            handelClick = {onCompleteAll}
            />
          </Flex>
          <Flex flex={1}>
            <TextField 
              value={addTodoText}
              handelInput={(e)=>{
                setTodoText(e.target.value);
                filterTodo(e.target.value);
              }}
              handleKeyPress={onPressEnter}
              rounded
              placeholder="Search Or Add Todos Here.."
              height="40px"
            />
          </Flex>
      </Flex>
      <TodoList reload={reload} />
    </Card>
  );
};

const mapsStateToProps= (state,ownProps) =>{
  const {hideComplete,completeAll,addTodoText} =state.todoRecuder;
  return {hideComplete,completeAll,addTodoText,title : ownProps.title}
}
const mapDispatchToProps = { fetchTodos,toogleHighComplete ,toogleCompleteAll,setTodoText,filterTodo};

export default connect(mapsStateToProps,mapDispatchToProps)(TodoApp);
