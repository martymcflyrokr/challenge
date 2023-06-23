import React from 'react';
import "../navbar/navbar.css"


const Navbar = () => {
  return (
    <nav>
      <div className="left">
        <h1>RIPIO</h1>
      </div>
      <div className="right">
        <div className='contenedor_ico'>
            <a href='' className="icon_login"><img src='../Iconos/login_ico.png'/></a>
        </div>
        <div className='contenedor_ico'>
            <a href='' className="icon"><img src='../Iconos/bell_icon.png'/></a>
       </div>
       <div className='contenedor_ico'>
         <a href='' className="icon"><img src='../Iconos/question_ico.png'/></a>
       </div>
           
      </div>
    </nav>
  );
};

export default Navbar;