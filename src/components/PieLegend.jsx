const PieLegend = (props) => {
    const { payload } = props

    return (
        <ul>
            {payload.map((entry, index) => (
                <li key={`item-${index}`}>{entry.value}</li>
            ))}
        </ul>
    )
}

export default PieLegend
