import React, {useRef} from 'react';
import Icon from '@mdi/react';
import { mdiCheck } from '@mdi/js';

import Center from '../Center/Center';
import Flex from '../Flex/Flex';
import Text from '../Text/Text';
import classes from './Checkbox.module.css';

const Checkbox = ({
        checked,
        size,
        color,
        name,
        handelClick,
        circle,
        label
    })=> {
        const CheckboxInput = useRef(null);

        let background = "#fff";
        let iconcolor = "#cbcbcb";

        if(checked){
            background = color || "#42caee";
            iconcolor = "#fff";
        }

        let labelEL = null;
        
        if (label) {
            labelEL = (
                <Flex>
                    <Text>{label}</Text>
                </Flex>
            );
        }

        return (
            <Flex padding="0" align="center" >
                <Flex padding="0">
                    <div className={classes.checkbox}
                    style = {{
                        width : `${size}px`,
                        height : `${size}px`,
                        background,
                        borderRadius : circle ? 50 + "%" : ""
                    }}
                    
                    onClick={()=>CheckboxInput.current.click()}                    
                    >
                        <Center>
                            <Icon path={mdiCheck} size="16px" color={iconcolor}></Icon>
                        </Center>
                        
                        <input
                            style={{display : "none"}}
                            name ={name}
                            type = "checkbox"
                            checked = {checked}
                            onChange = {handelClick}
                            ref = {CheckboxInput}
                        />

                    </div>
                </Flex>
                {labelEL}
            </Flex>
        );
    };

export default Checkbox;