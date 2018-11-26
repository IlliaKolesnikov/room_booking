import React from 'react'
import PropTypes from 'prop-types'
import 'react-infinite-calendar/styles.css'
import moment from 'moment'
import MyCalendar from './MyCalendar'

const today = new Date()

class CustomCalendar extends React.Component {
  state = {
    selected: [],
  }

  handleSelect = (selectedDate) => {
    const { selected } = this.state
    const { onSelectDate } = this.props
    const isSelected = !!selected.find(date => moment(date).isSame(moment(selectedDate)))
    if (isSelected) {
      selected.pop()
      onSelectDate(null)
    } else {
      selected.shift()
      selected.push(selectedDate)
      onSelectDate(moment(selectedDate).format('DD-MM-YYYY'))
    }
    this.setState({ selected })
  }

  render() {
    return (
      <div style={{ marginBottom: 10 }}>
        <MyCalendar onSelectDate={this.props.onSelectDate}/>
      </div>
    )
  }
}

CustomCalendar.propTypes = {
  onSelectDate: PropTypes.func.isRequired,
}

export default CustomCalendar
