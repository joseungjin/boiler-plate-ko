
import React,{useEffect} from "react";
import { useDispatch } from "react-redux";
import {auth} from '../_actions/user_action';
import { useNavigate } from 'react-router-dom'

export default function(SpecificComponent,option,adminRoute=null){
    //null  => 아무나 출입가능
    //true  => 로그인한 유저만
    //false => 로그인한 유저는 출입 불가능
    

    function AuthenticationCheck(props){
        const navigate = useNavigate();
        const dispath = useDispatch();
        useEffect(() => {
                dispath(auth()).then(response =>{
                    console.log(response)
                    //로그인 안한 상태
                    if(!response.payload.isAuth){
                        if(option){
                            navigate("/login")
                        }
                    }else{
                        //로그인한 상태
                        if(adminRoute && !response.payload.isAdmin){
                            navigate("/")
                        }else{
                            if(option===false){
                                navigate("/")
                            }
                        }
                    }
                })
        }, [])
        return(
            <SpecificComponent />
        )
    }

    return AuthenticationCheck
}