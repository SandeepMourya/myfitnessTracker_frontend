const Card =(props)=>{

    const height = props.height? props.height:'500px';
    const paddingBottom = props.paddingBottom?props.paddingBottom:'';
    return(
        <>
            
             <div style={{
                    background: "Red", width: '500px', height: height, display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: "30px", backgroundColor: 'white',
                    boxShadow: '1px 1px 4px',paddingBottom:paddingBottom
                }}>
                    {props.children}
                </div>
        </>
    )
}

export default Card;