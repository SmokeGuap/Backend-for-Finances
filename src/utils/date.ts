export const deadlineDate = (date: Date, months: number) => {
  const resultDate = new Date(date);
  const currentMonth = resultDate.getMonth();
  const currentYear = resultDate.getFullYear();
  let newMonth = currentMonth + months;
  let newYear = currentYear;

  while (newMonth > 11) {
    newMonth -= 12;
    newYear++;
  }

  resultDate.setMonth(newMonth);
  resultDate.setFullYear(newYear);

  return resultDate;
};

export const daysToEnd = (startDate: Date, deadlineDate: Date) => {
  const timeDifference = Math.abs(+startDate - +deadlineDate);
  const oneDayMilliseconds = 24 * 60 * 60 * 1000;
  const daysDifference = Math.round(timeDifference / oneDayMilliseconds);
  return daysDifference;
};
