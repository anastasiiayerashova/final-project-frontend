const Dot = ({ active, payload, coordinate }) => {
    
    if (active && payload && payload.length) {
        const dotStyle = {
            backgroundColor: 'white',
            border: '1px solid white',
            padding: '10px',
            borderRadius: '10px',
            position: 'absolute',
            transform: 'translate(-50%, -100%)',
            left: `${coordinate.x}px`,
            top: `${coordinate.y}px`,
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
        };

        const textStyle = {
            fontSize: '12px',
            fontWeight: 'bold',
        };

        return (
            <div className='custom-tooltip' style={dotStyle}>
           <p style={textStyle}>
                    {payload[0].value}
                </p>
            </div>
        );
    }
    return null;
};

export default Dot