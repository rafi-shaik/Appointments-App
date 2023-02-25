// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import './index.css'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {title: '', dateValue: '', appointmentsList: [], isFiltered: false}

  filterAppointments = () => {
    this.setState(prevState => ({isFiltered: !prevState.isFiltered}))
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each => {
        if (id === each.id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, dateValue} = this.state

    const newAppointment = {
      id: uuidv4(),
      title,
      time: format(new Date(dateValue), 'dd MMMM yyyy, EEEE'),
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      dateValue: '',
    }))
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateValue: event.target.value})
  }

  render() {
    const {appointmentsList, isFiltered, dateValue, title} = this.state
    let filteredList = appointmentsList
    let buttonClass = 'button'

    if (isFiltered) {
      filteredList = appointmentsList.filter(each => each.isStarred === true)
    }
    if (isFiltered) {
      buttonClass = 'button active'
    }

    return (
      <div className="bg-container">
        <div className="responsive-container">
          <div className="appointments-container">
            <div className="top-section">
              <form onSubmit={this.onAddAppointment} className="form-container">
                <h1 className="appointment-heading">Add Appointment</h1>
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  value={title}
                  onChange={this.onChangeTitle}
                  type="text"
                  id="title"
                  className="input"
                  placeholder="Title"
                />
                <label htmlFor="dateValue" className="label">
                  DATE
                </label>
                <input
                  value={dateValue}
                  onChange={this.onChangeDate}
                  type="date"
                  id="dateValue"
                  className="input"
                  placeholder="dd/mm/yyyy"
                />
                <button className="form-button" type="submit">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
                alt="appointments"
                className="image"
              />
            </div>
            <hr className="line" />
            <div className="bottom-heading">
              <h1 className="heading">Appointments</h1>
              <button
                type="button"
                className={buttonClass}
                onClick={this.filterAppointments}
              >
                Starred
              </button>
            </div>
            <ul className="list-container">
              {filteredList.map(each => (
                <AppointmentItem
                  key={each.id}
                  details={each}
                  toggleIsStarred={this.toggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
