import { createGlobalStyle } from "styled-components";
import "../assets/css/rpg-awesome.min.css";

export default createGlobalStyle`
    body{
        margin:0;
        height:100vh;
        width:100vw;
        overflow:hidden;
    }
    *{
        -webkit-user-select: none;
        user-select: none;
        user-drag: none; 
        -webkit-user-drag: none;
    }
`;
