
import React from 'react';
import PropTypes from 'prop-types';
import InfiniteCalendar, { Calendar, withMultipleDates } from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import moment from 'moment';
//mport multipleDateInterpolation from 'utils/dateInterpolation'
var today = new Date();
var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
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
      console.log(selectedDate)
      console.log(selected)
      onSelectDate(selectedDate)
    }
    this.setState({ selected })
  }


  render() {
    return (
        <InfiniteCalendar
        displayOptions={{
          layout: 'landscape',
        }}
           width={'60%'}
           height={450}
    selected={today}
    disabledDays={[0,6]}
    minDate={lastWeek}
    onSelect={(date) => this.handleSelect(date)}
  />
    )
  }
}

CustomCalendar.propTypes = {
  dates: PropTypes.array.isRequired,
  onSelectDate: PropTypes.func.isRequired,
}

export default CustomCalendar