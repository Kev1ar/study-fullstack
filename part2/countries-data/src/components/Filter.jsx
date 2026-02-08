const Filter = ({value, onChange}) => {
    return (
        <div>
            filter by country name: <input 
                    value={value}
                    onChange={onChange}/>
        </div>
    )
}
export default Filter