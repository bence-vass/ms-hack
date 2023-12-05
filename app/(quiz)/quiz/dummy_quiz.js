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
const quiz_teaching_vid_2 = [
    {
      type: 'multiple_choice',
      question: 'What does the Pythagorean theorem state?',
      answers: ['The sum of the angles in a triangle is 180 degrees.', 'The sum of the squares of the lengths of the legs of a right triangle is equal to the square of the length of the hypotenuse.', 'The ratio of the opposite side to the adjacent side in a right triangle is called tangent.', 'The area of a right triangle is equal to half the product of its legs.'],
      correct: 1,
      hint: 'The theorem involves squares of lengths.',
      desc: 'Choose the correct statement about the Pythagorean theorem.',
    },
    {
      type: 'multiple_choice',
      question: 'In the given example, what are the lengths of the legs of the right triangle?',
      answers: ['10 & 12', '6 & 8', '5 & 13', '3 & 4'],
      correct: 1,
      hint: 'Look for the information about the lengths in the example.',
      desc: 'Identify the lengths of the legs in the right triangle.',
    },
    {
      type: 'multiple_choice',
      question: 'According to the Pythagorean theorem, what is the equation used to find the value of the hypotenuse in a right triangle?',
      answers: ['a + b = c', 'a^2 + b^2 = c^2', 'a * b = c', 'a - b = c'],
      correct: 1,
      hint: 'Think about the formula for the Pythagorean theorem.',
      desc: 'Select the correct equation representing the Pythagorean theorem.',
    },
    {
      type: 'numeric',
      question: 'Calculate 6^2 + 8^2 and simplify the result.',
      correct: 100,
      hint: 'Perform the calculations for the given expression.',
      desc: 'Compute the square of 6 and 8, then add them together.',
    },
    {
      type: 'multiple_choice',
      question: 'How is the value of x obtained in the example?',
      answers: ['By adding 6 and 8', 'By dividing 100 by 2', 'By taking the square root of 100', 'By multiplying 6 and 8'],
      correct: 2,
      hint: 'Consider the steps explained in the example.',
      desc: 'Determine the process for finding the value of x in the example.',
    },
    {
      type: 'true_false',
      question: 'The lengths of the legs in a right triangle can be negative.',
      correct: false,
      hint: 'Think about the nature of lengths in geometry.',
      desc: 'Determine whether the statement about the sign of lengths in a right triangle is true or false.',
    },
    {
      type: 'numeric',
      question: 'If the lengths of the legs were 5 and 12, what would be the value of x?',
      correct: 13,
      hint: 'Apply the Pythagorean theorem to the new lengths.',
      desc: 'Find the value of x for a different set of leg lengths.',
    },
    {
      type: 'true_false',
      question: 'The square root of 64 is equal to 8.',
      correct: true,
      hint: 'Think about the properties of square roots.',
      desc: 'Determine whether the statement about the square root of a number is true or false.',
    }
  ]

