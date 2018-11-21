
import React from 'react';
import PropTypes from 'prop-types';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import moment from 'moment';

const today = new Date();
const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

class CustomCalendar extends React.Component {
  state = {
    selected: [],
  }

  handleSelect = (selectedDate) => {
    const { selected } = this.state;
    const { onSelectDate } = this.props;
    const isSelected = !!selected.find(date => moment(date).isSame(moment(selectedDate)));
    if (isSelected) {
      selected.pop();
      onSelectDate(null);
    } else {
      selected.shift();
      selected.push(selectedDate);
      onSelectDate(moment(selectedDate).format('DD-MM-YYYY'));
    }
    this.setState({ selected });
  }


  render() {
    return (
      <div style={{ marginBottom: 10 }}>
        <InfiniteCalendar
            height={300}
            selected={today}
            disabledDays={[0, 6]}
            minDate={lastWeek}
            onSelect={date => this.handleSelect(date)}
            style={{ marginTop: 10 }}
        />
      </div>
    );
  }
}

CustomCalendar.propTypes = {
  onSelectDate: PropTypes.func.isRequired,
};

export default CustomCalendar;
