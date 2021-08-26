const questionTwoAndFour = [
    {
        "question": 2,
        "choice": 6
    },
    {
        "question": 2,
        "choice": 1
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 1
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 6
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    },
    {
        "question": 2,
        "choice": 4
    }
]


const requestedQuestion = [
    {
        "id": 2,
        "order": 3,
        "text": "Reception and admission were...",
        "choices": [
            {
                "id": 4,
                "order": 1,
                "text": "Good"
            },
            {
                "id": 6,
                "order": 2,
                "text": "Neutral"
            },
            {
                "id": 1,
                "order": 3,
                "text": "Bad"
            }
        ]
    }
];



for (i = 0; i < questionTwoAndFour.length; i++) {
    let sumCheck = 0;
    if (requestedQuestion[0].choices.filter(el => el.text === "Good")[0].id === questionTwoAndFour[i].choice) {
        sumCheck += 1
    } else if (requestedQuestion[0].choices.filter(el => el.text === "Neutral")[0].id === questionTwoAndFour[i].choice) {
        sumCheck += 0
    } else if (requestedQuestion[0].choices.filter(el => el.text === "Bad")[0].id === questionTwoAndFour[i].choice) {
        sumCheck += -1
    }
    console.log(sumCheck)
}

const getAverage = (question, answers) => {
    var sum = 0;
    for (i = 0; i < questionTwoAndFour.length; i++) {
        if (question[0].choices.filter(el => el.text === "Good")[0].id === answers[i].choice) {
            //[id] 4: Good [weight = 1]
            sum += 1
        } else if (question[0].choices.filter(el => el.text === "Neutral")[0].id === answers[i].choice) {
            //[id] 6: Neutral [weight = 0]
            sum += 0
        } else if (question[0].choices.filter(el => el.text === "Bad")[0].id === answers[i].choice) {
            //[id] 1: Bad [weight = -1]
            sum += -1
        }
    }
    var averagePoints = (sum / answers.length) * 100 + '%';
    console.log(averagePoints)
}

getAverage(requestedQuestion, questionTwoAndFour)
























