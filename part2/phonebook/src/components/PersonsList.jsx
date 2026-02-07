const PersonForm = ({displayList, onClick}) => {
    return (
        <ul>
          {displayList.map((value) => (
            <li key={value.name}>{value.name} {value.number} <button onClick={onClick} id={value.id}>delete</button> </li>
          ))}
        </ul>
    )
}

export default PersonForm