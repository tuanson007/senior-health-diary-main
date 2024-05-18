export const scheduleMock = [
  //mỗi object là 1 record của bảng Schedule
  //Schedule (id,date)
  {
    id: 555, //khoá chính
    date: "2023-12-01", //duy nhất unique
    reminds: [
      //mỗi object trong mảng là 1 bảng Remind liên kết khoá ngoại với bảng Schedule
      //Remind (id,time,text,scheduleId)
      {
        id: 1, //khoá chính
        time: "12:00",
        text: "Meeting at 10am",
        scheduleId: 555,
      },
    ],
  },
  {
    id: 666,
    date: "2023-12-12",
    reminds: [
      {
        id: 2,
        time: "12:00",
        text: "Lunch with colleagues",
        scheduleId: 666,
      },
      {
        id: 3,
        time: "12:00",
        text: "Shopping",
        scheduleId: 666,
      },
    ],
  },
  {
    id: 777,
    date: "2023-12-13",
    reminds: [
      {
        id: 4,
        time: "12:00",
        text: "Gym at 5pm",
        scheduleId: 777,
      },
    ],
  },
  {
    id: 888,
    date: "2023-12-14",
    diaries: [
      //mỗi object trong mảng là 1 bảng Diary liên kết khoá ngoại với bảng Schedule
      //Remind (id,sick,symptoms,description,scheduleId)
      {
        id: 5,
        sick: "Cao huyết áp",
        symptoms: "Nhức đầu",
        description: "Đau hoài",
        scheduleId: 888,
      },
    ],
  },
];
