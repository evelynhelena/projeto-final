import React from 'react';

const ValidaCampos = (props) => {
    return (
        <>
         <div style={{fontSize: "13px"}} className="mt-1 text-danger">{props.value} é obrigatório</div>
        </>
    );
}

export default ValidaCampos;
