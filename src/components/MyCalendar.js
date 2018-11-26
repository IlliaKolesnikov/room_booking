import React from 'react'
import moment from 'moment'
import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import './calendar.css'

function addWeekdays() {
  const date = moment.weekdaysShort()
  date.splice(0, 1)
  date.splice(5, 1)
  return date
}

export default class Calendar extends React.Component {
  state = {
    dateContext: moment(),
    today: moment(),
    showMonthPopup: false,
    showYearPopup: false,
    selectedDay: null,
    weekNumber: null,
    left: false,
  }

  constructor(props) {
    super(props)
    this.width = props.width || '100%'
    this.style = props.style || {}
    this.style.width = this.width // add this
  }

  componentDidMount() {
    this.setState({
      weekNumber: this.state.dateContext.format('W') / 12 + 1,
      selectedDay: +this.state.dateContext.format('D'),
    })
  }

  weekdaysShort = addWeekdays()

  months = moment.months()

  year = () => {
    return this.state.dateContext.format('Y')
  }

  month = () => this.state.dateContext.format('MMMM')

  daysInMonth = () => {
    return this.state.dateContext.daysInMonth()
  }

  currentDate = () => {
    return this.state.dateContext.get('date')
  }

  currentDay = () => {
    return this.state.dateContext.format('D')
  }

  firstDayOfMonth = () => {
    let dateContext = this.state.dateContext
    let firstDay = moment(dateContext).startOf('month').format('d') // Day of week 0...1..5...6
    return firstDay
  }

  setMonth = (month) => {
    let monthNo = this.months.indexOf(month)
    let dateContext = Object.assign({}, this.state.dateContext)
    dateContext = moment(dateContext).set('month', monthNo)
    this.setState({
      dateContext: dateContext
    })
  }

  nextMonth = () => {
    let dateContext = Object.assign({}, this.state.dateContext)
    dateContext = moment(dateContext).add(1, 'month')
    this.setState({
      dateContext: dateContext
    })
    this.props.onNextMonth && this.props.onNextMonth()
  }

  prevMonth = () => {
    let dateContext = Object.assign({}, this.state.dateContext)
    dateContext = moment(dateContext).subtract(1, 'month')
    this.setState({
      dateContext: dateContext
    })
    this.props.onPrevMonth && this.props.onPrevMonth()
  }

  nextWeek = () => {
    if (this.state.weekNumber === 5) {
      this.nextMonth()
      this.setState({ weekNumber: 1 })
    } else {
      this.setState({ weekNumber: this.state.weekNumber + 1 })
    }
    this.setState({ left: false })
  }

  prevWeek = () => {
    if (this.state.weekNumber === 1) {
      this.prevMonth()
      this.setState({ weekNumber: 5 })
    } else {
      this.setState({ weekNumber: this.state.weekNumber - 1 })
    }
    this.setState({ left: true })
  }

  onSelectChange = (e, data) => {
    this.setMonth(data)
    this.props.onMonthChange && this.props.onMonthChange()

  }

  SelectList = (props) => {
    let popup = props.data.map((data) => {
      return (
        <div key={data}>
          <a href="#" onClick={(e) => {this.onSelectChange(e, data)}}>
            {data}
          </a>
        </div>
      )
    })

    return (
      <div className="month-popup">
        {popup}
      </div>
    )
  }

  onChangeMonth = (e, month) => {
    this.setState({
      showMonthPopup: !this.state.showMonthPopup
    })
  }

  MonthNav = () => {
    return (
      <span className="label-month"
            onClick={(e) => {this.onChangeMonth(e, this.month())}}>
                {this.month()}
        {this.state.showMonthPopup &&
        <this.SelectList data={this.months} />
        }
            </span>
    )
  }

  showYearEditor = () => {
    this.setState({
      showYearNav: true
    })
  }

  setYear = (year) => {
    let dateContext = Object.assign({}, this.state.dateContext)
    dateContext = moment(dateContext).set('year', year)
    this.setState({
      dateContext: dateContext
    })
  }

  onYearChange = (e) => {
    this.setYear(e.target.value)
    this.props.onYearChange && this.props.onYearChange(e, e.target.value)
  }

  onKeyUpYear = (e) => {
    if (e.which === 13 || e.which === 27) {
      this.setYear(e.target.value)
      this.setState({
        showYearNav: false
      })
    }
  }

  YearNav = () => {
    return (
      this.state.showYearNav ?
        <input
          defaultValue={this.year()}
          className="editor-year"
          ref={(yearInput) => { this.yearInput = yearInput}}
          onKeyUp={(e) => this.onKeyUpYear(e)}
          onChange={(e) => this.onYearChange(e)}
          type="number"
          placeholder="year" />
        :
        <span
          className="label-year"
          onDoubleClick={(e) => { this.showYearEditor()}}>
                {this.year()}
            </span>
    )
  }

  onDayClick = (e, day) => {
    let dateContext = Object.assign({}, this.state.dateContext)
    dateContext=moment(dateContext).set("date",day);
    console.log(moment(dateContext).format('DD-MM-YYYY'))
    //moment(day.format('DD-MM-YYYY'))
    this.setState({
      selectedDay: day
    }, () => {
      console.log('SELECTED DAY: ', this.state.selectedDay)
    })
    this.props.onSelectDate(dateContext.format('DD-MM-YYYY'));

    this.props.onDayClick && this.props.onDayClick(e, day)
  }

  render() {
    const { weekNumber, left } = this.state
    // Map the weekdays i.e Sun, Mon, Tue etc as <td>
    const weekdays = this.weekdaysShort.map((day) => {
      return (
        <td key={day} className="week-day">{day}</td>
      )
    })

    let blanks = []
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(<td key={i * 80} className="emptySlot">
          {''}
        </td>
      )
    }

    let daysInMonth = []
    for (let d = 1; d <= this.daysInMonth(); d++) {
      const className = (d === this.currentDay() ? 'day current-day' : 'day')
      const selectedClass = (d === this.state.selectedDay ? ' selected-day ' : '')
      daysInMonth.push(
        <td key={d} onClick={(e) => {this.onDayClick(e, d)}} className={className + selectedClass}>
          <span>{d}</span>
        </td>
      )
    }

    const totalSlots = [...blanks, ...daysInMonth]
    let rows = []
    let cells = []

    totalSlots.forEach((row, i) => {
      if ((i % 7) !== 0) {
        cells.push(row)
      } else {
        let insertRow = cells.slice()
        rows.push(insertRow)
        cells = []
        cells.push(row)
      }
      if (i === totalSlots.length - 1) {
        let insertRow = cells.slice()
        rows.push(insertRow)
      }
    })
    if (blanks.length === 6) {
      rows.splice(1, 1)
    }
    const trElems = rows.map((d, i) => {
      d.splice(0, 1)
      d.splice(5, 1)

      return (
        <tr key={i * 100}>
          {d}
        </tr>
      )
    })

    if (trElems[weekNumber] !== undefined) {
      console.log(this.state.dateContext.format('DD-MM-YYYY'))
      return (
        <div className="calendar-container" style={this.style}>
          <table className="calendar">
            <thead>
            <tr className="calendar-header">
              <td colSpan={4}>
                <this.MonthNav />
                {' '}
                <this.YearNav />
              </td>
              <td style={{display: 'flex', justifyContent: 'flex-end', position: 'relative'}}>
                <ChevronLeft
                  onClick={(e) => { this.prevWeek() }}
                />
                <ChevronRight
                  onClick={(e) => { this.nextWeek() }}
                />
              </td>
            </tr>
            </thead>
            <tbody style={{margin: 'auto'}}>
            <tr>
              {weekdays}
            </tr>
            {(trElems[weekNumber].key !== 0 && trElems[weekNumber].props.children.length !== 0) ?
              trElems[weekNumber] :
              (left ? this.prevWeek() : this.nextWeek())}
            </tbody>
          </table>

        </div>

      )
    } else {
      return <div>End</div>
    }
  }
}
