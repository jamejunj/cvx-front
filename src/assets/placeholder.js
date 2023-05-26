export const users = [
    {
        id: 1,
        student_id: '6234567823',
        fname: 'Jirakit',
        lname: 'Jirapongwanich',
        email: 'a@b.c',
        password: '123456',
        role: 'admin',
    },
    {
        id: 2,
        instructor_id: '10001',
        fname: 'Nagul',
        lname: 'Cooharojananone',
        email: 'nagul.c@chula.ac.th',
        password: '123456',
        role: 'instructor',
    },
    {
        id: 3,
        student_id: '6234567823',
        fname: 'Jirakit',
        lname: 'Jirapongwanich',
        email: 'a@b.c',
        password: '123456',
        role: 'student',
    }
]

export const courses = [
    {
        id: '2301117',
        name: "Calculus 1",
        year: 2019,
        semeter: 1,
        authors: [
            {
                name: 'Yuwaree',
                img: 'https://d2ijd3g5wqapxj.cloudfront.net/wp-content/uploads/2019/05/yuwaree_640x640-1-5.jpg',
            },
            {
                name: 'Damrong',
                img: 'https://d2ijd3g5wqapxj.cloudfront.net/wp-content/uploads/2019/05/Dumrong-Tipyotha-1-5.jpg',
            },
            {
                name: 'Surachai',
                img: 'https://d2ijd3g5wqapxj.cloudfront.net/wp-content/uploads/2019/05/Surachai-Sombatboriboon-1-5.jpg',
            },
            {
                name: 'Nattanard',
                img: 'https://d2ijd3g5wqapxj.cloudfront.net/wp-content/uploads/2019/05/nattanard_640x640-1-5.jpg',
            }
        ],
    },
    {
        id: '2301223',
        name: "Math Model Reason",
        year: 2019,
        semeter: 2,
        authors: [
            {
                name: 'Pattanee',
                img: 'https://d2ijd3g5wqapxj.cloudfront.net/wp-content/uploads/2019/05/pattanee_640x640-1-5.jpg',
            },
        ],
    },
    {
        id: '2301118',
        name: "Calculus 2",
        year: 2019,
        semeter: 2,
        authors: [
            {
                name: 'Yuwaree',
                img: 'https://d2ijd3g5wqapxj.cloudfront.net/wp-content/uploads/2019/05/yuwaree_640x640-1-5.jpg',
            },
            {
                name: 'Damrong',
                img: 'https://d2ijd3g5wqapxj.cloudfront.net/wp-content/uploads/2019/05/Dumrong-Tipyotha-1-5.jpg',
            },
            {
                name: 'Surachai',
                img: 'https://d2ijd3g5wqapxj.cloudfront.net/wp-content/uploads/2019/05/Surachai-Sombatboriboon-1-5.jpg',
            },
            {
                name: 'Nattanard',
                img: 'https://d2ijd3g5wqapxj.cloudfront.net/wp-content/uploads/2019/05/nattanard_640x640-1-5.jpg',
            }
        ],
    },
    {
        id: '2301170',
        name: "Computer and Programming",
        year: 2019,
        semeter: 1,
        authors: [
            {
                name: 'Jaruloj Chongstitvatana',
                img: 'https://d2ijd3g5wqapxj.cloudfront.net/wp-content/uploads/2019/05/jaruloj_640x640-1-5.jpg',
            },
            {
                name: 'Dittaya Wanvarie',
                img: 'https://d2ijd3g5wqapxj.cloudfront.net/wp-content/uploads/2019/05/Dittaya-Wanvarie-1-5.jpg',
            },
        ],
    },
    {
        id: '2301365',
        name: "Algorithm Design and Analysis",
        year: 2021,
        semeter: 1,
        authors: [
            {
                name: 'Nagul Cooharojananone',
                img: 'https://d2ijd3g5wqapxj.cloudfront.net/wp-content/uploads/2019/05/nagul_640x640-1-5.jpg',
            },
            {
                name: 'Suphakant Phimoltares',
                img: 'https://d2ijd3g5wqapxj.cloudfront.net/wp-content/uploads/2019/05/Suphakant-Phimoltares-1-5.jpg',
            },
        ],
    },
    {
        id: '2301375',
        name: "Operating System",
        year: 2021,
        semeter: 1,
        authors: [
            {
                name: 'Chatchawit Aporntewan',
                img: 'https://d2ijd3g5wqapxj.cloudfront.net/wp-content/uploads/2019/05/Chatchawit-Aporntewan-1-5.jpg',
            },
        ],
    },
    {
        id: '2301350',
        name: "User Interface Design",
        year: 2021,
        semeter: 2,
        authors: [
            {
                name: 'Nagul Cooharojananone',
                img: 'https://d2ijd3g5wqapxj.cloudfront.net/wp-content/uploads/2019/05/nagul_640x640-1-5.jpg',
            },
        ],
        contents: [
            {
                id: 21,
                file_name: "Syllabus",
                file_date: new Date("2021-08-08 08:00:00"),
                children: [
                    {
                        id: 211,
                        file_name: "ประมวลรายวิชา ปี 2564",
                        file_date: new Date("2021-08-08 08:01:12"),
                    },
                    {
                        id: 212,
                        file_name: "Term Project",
                        file_date: new Date("2021-08-08 08:01:12"),
                    },
                ],
            },
            {
                id: 22,
                file_name: "Introduction",
                file_date: new Date("2021-08-08 08:00:00"),
            },
            {
                id: 23,
                file_name: "Design for everyday thing",
                file_date: new Date("2021-08-16 08:00:00"),
            }
        ],
    },
    {
        id: '4568',
        course_id: '23014xx',
        name: "Introduction to Web Development",
        year: 2022,
        semeter: 1,
        authors: [
            {
                name: 'Dittaya Wanvarie', //https://learn.sj-assist.com/image-crop.php?img=upload/images/profile/1.jpg
                img: 'https://d2ijd3g5wqapxj.cloudfront.net/wp-content/uploads/2019/05/Dittaya-Wanvarie-1-5.jpg',
            },
        ],
        contents: [
            {
                id: 1,
                file_name: "Week 1 Introduction",
                file_date: new Date("2021-08-08 08:00:00"),
            },
            {
                id: 2,
                file_name: "Week 2 HTML",
                file_date: new Date("2021-08-15 08:00:00"),
            },
            {
                id: 3,
                file_name: "Week 3 CSS",
                file_date: new Date("2021-08-22 08:00:00"),
            },
            {
                id: 4,
                file_name: "Week 4 Responsive Design",
                file_date: new Date("2021-08-29 08:00:00"),
            },
            {
                id: 5,
                file_name: "Week 5 JavaScript",
                file_date: new Date("2021-09-05 08:00:00"),
            },
            {
                id: 6,
                file_name: "Week 6 Asynchronous JavaScript",
                file_date: new Date("2021-09-12 08:00:00"),
            },
            {
                id: 7,
                file_name: "Week 7 Web APIs",
                file_date: new Date("2021-09-19 08:00:00"),
            },
            {
                id: 8,
                file_name: "Week 8 Recap",
                file_date: new Date("2021-09-26 08:00:00"),
            },
            {
                id: 9,
                file_name: "Folder",
                file_date: new Date("2021-08-08 08:00:00"),
                children: [
                    {
                        id: 10,
                        file_name: "Project Assignment",
                        file_date: new Date("2021-08-08 08:00:00"),
                    },
                ],
            },
        ],
        assignments: [
            {
                id: 1,
                asgn_name: "Assignment 1",
                asgn_out: new Date("2021-08-08 08:00:00"),
                asgn_due: new Date("2021-08-20 08:00:00"),
                asgn_status: 0,

            }
        ],
    }
]