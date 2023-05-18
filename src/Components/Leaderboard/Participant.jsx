import './Leaderboard.css'
const Participant = (props) => {

    return (
        <tr className='row'>
            <td>#{props.rank}</td>
            <td>{props.name}</td>
            <td className='pts'>{props.points}</td>
        </tr>
    )

}
export default Participant