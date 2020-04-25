import React,{useState} from 'react'
import ScrollView from './ScrollView/ScrollView'
import {connect} from 'react-redux';
import Flex from './Flex/Flex';
import {toogleComplete} from '../Actions/TodoAction'
import Checkbox from './Checkbox/Checkbox'
import axios from 'axios';
import {api_domain} from '../config.json';
import Text from './Text/Text';
import Icon from '@mdi/react';
import Click from './Click/Click'
import { mdiWindowClose } from '@mdi/js';

const TodoList = ({todos,reload,toogleComplete}) => {
    
    const startTransitions = todos.map(()=>({
        transform : "translateX(0%)",
    }));
    const endTransition = {  transform : "translateX(-100%)",};

    const [deleteAnimation,setDeleteAnimation] = useState(startTransitions)

    const onDelete =(id,index)=>{
        const newDeleteAnimation = [...deleteAnimation];
        newDeleteAnimation[index] = endTransition;
        setDeleteAnimation(newDeleteAnimation);

        axios
            .delete(`${api_domain}todos/${id}`)
            .then(()=>{
                reload(()=>{
                    setDeleteAnimation(startTransitions);
                })
            })

    }

    const onChecked= ({_id,completed}) => {
        toogleComplete(_id)
        axios.patch(`${api_domain}todos/${_id}`,
        {completed : !completed})
        .then(() => reload())
        .catch((err) => alert(err))
    };

    const todoList = todos.map((todo,index) =>
        <Flex key={todo._id} align="center" style={deleteAnimation[index]}>
            <Flex>
                <Checkbox circle size="20" checked={todo.completed} handelClick={onChecked.bind(this,todo)}/>
            </Flex>
            <Flex flex="1">
                <Text 
                color={todo.completed ? "#7d807f" : ""}
                lineThrough={todo.completed}
                >
                    {todo.title}
                </Text>
            </Flex>
            <Flex>
                <Click click={()=> onDelete(todo._id, index)}>
                <Icon path={mdiWindowClose} size="16px" color="#f54169"></Icon>
                </Click>
            </Flex>
        </Flex>
    );


    return <ScrollView height="300px">{todoList} </ScrollView>
}

const mapStateToProps = (state , ownProps) => {
    const {todos} = state.todoRecuder;
    
    return {todos,reload : ownProps.reload};
}

const mapDispatchToProps = {toogleComplete}
export default connect(mapStateToProps,mapDispatchToProps)(TodoList);
