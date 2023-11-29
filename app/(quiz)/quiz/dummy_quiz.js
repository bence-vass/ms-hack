export const quiz = [
    {
        type: 'true_or_false',
        question: '1 + 1 = 3',
        correct: false,
        hint: 'its not',
        desc: 'yes or no',
    },
    {
        type: 'multiple_choice',
        question: 'f(x) = 2*x and x = 4',
        answers: ['2', '4', '6', '8', '10'],
        correct: 4,
        hint: '2 * 4',
        desc: 'multiple choice',

    },
    {
        type: 'numeric',
        question: '5x and x = 10',
        correct: 50,
        desc: 'analysis',

    },
    {
        type: 'checking',
        question: 'x^2 = 4',
        answers: ['-1', '-2', '-3', '2'],
        correct: [1, 3],
        desc: 'guessing',
        status: 'error'

    }

]