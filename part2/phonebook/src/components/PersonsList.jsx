const PersonForm = ({displayList}) => {
    return (
        <ul>
          {displayList.map((value) => (
            <li key={value.name}>{value.name} {value.phone_number}</li>
          ))}
        </ul>
    )
}

export default PersonForm