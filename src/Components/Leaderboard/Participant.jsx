import './Leaderboard.css'
const Participant = (props) => {

    return (
        <tr className='row'>
            <td>#{props.pdetails.rank}</td>
            <td>{props.pdetails.name}</td>
            <td className='pts'>{props.pdetails.points}</td>
        </tr>
    )

}
export default Participant