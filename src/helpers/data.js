let id = 0;
const arrayWithTime = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

function createData(day) {
  id += 1;
  return { id, day, arrayWithTime };
}


const rows = [
  createData('Green', arrayWithTime),
  createData('Red', arrayWithTime),
  createData('Blue', arrayWithTime),
  createData('Purple', arrayWithTime),
];

export default rows;
