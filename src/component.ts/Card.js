const Card = ({ heading, text }) => {

    return (

        <div style={{ padding: '2%', width: '17.5vw', border: '1px solid black', borderRadius:'2%', marginBottom: '5px', marginLeft: "2vw" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p>{heading}</p>
                <p>img</p>
            </div>
            <p>{text}</p>
            <div style={{ display: 'flex', justifyContent: 'flex-start'}}>
                <button style={{backgroundColor:'white', border:'1px solid gray', borderRadius: '5px'}}>...</button>
                <button style={{marginLeft:'0.3vw', backgroundColor:'white', border:'1px solid gray', borderRadius: '3px'}}>Feature Request</button>
            </div>
            
        </div>
    )
}

export default Card