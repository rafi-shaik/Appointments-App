// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {details, toggleIsStarred} = props
  const {id, title, time, isStarred} = details

  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleIsStarred(id)
  }

  return (
    <li className="appointment-item">
      <div className="top-name">
        <p className="title">{title}</p>
        <button
          data-testid="star"
          className="star-button"
          type="button"
          onClick={onClickStar}
        >
          <img src={starImgUrl} className="star-icon" alt="star" />
        </button>
      </div>
      <p className="description">{time}</p>
    </li>
  )
}

export default AppointmentItem
