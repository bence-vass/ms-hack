'use client'
import React from 'react';
import {Button, Checkbox, Col, InputNumber, Radio, Row, Steps} from "antd";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {setCurrentQuestion} from "@/redux/features/quiz/quizSlice";


function Page(props) {


    const quiz = [
        {
            type: 'true_or_false',
            question: '1 + 1 = 3',
            correct: false,
            hint: 'its not',
            desc: 'yes or no',
        },
        {
            type: 'multiple_choice',
            question: 'f(x) = xx and x = 4',
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
            answers: ['-1', '-2', '-3', '2', '11'],
            correct: [1, 3],
            desc: 'guessing',
            status: 'error'

        }

    ]

    let stepsItems = quiz.map((e, i) => {
        return {
            title: `Question No. ${i + 1}`,
            description: e.desc,
        }
    })

    const currentQuestion = useAppSelector((state) => state.quizReducer.currentQuestion)
    const dispatch = useAppDispatch()

    return (
        <div>
            <h1>Quiz:</h1>
            <Row>
                <Col span={8}>
                    <Steps
                        direction="vertical"
                        current={currentQuestion}
                        items={stepsItems}
                        onChange={val => dispatch(setCurrentQuestion(val))}
                    />
                </Col>
                <Col span={16}>
                    <QuestionSwitch question={quiz[currentQuestion]}/>
                    <Button size={"large"} disabled={false} style={{
                        position: "absolute",
                        left: '50%',
                        transform: 'translate(-50%, 0)',
                        top: '200px'
                    }}
                            onClick={() => {
                                if(currentQuestion+1 < quiz.length) {
                                    dispatch(setCurrentQuestion(currentQuestion + 1))
                                }
                            }}>
                        Next
                    </Button>
                </Col>
            </Row>
        </div>
    );
}


function QuestionSwitch({question}) {
    function questionOptions(question) {
        switch (question.type) {
            case 'true_or_false':
                return (
                    <Radio.Group>
                        <Radio value={true}>True</Radio>
                        <Radio value={false}>False</Radio>
                    </Radio.Group>
                )
            case 'multiple_choice':
                return (
                    <Radio.Group>
                        {question.answers.map((e, i) => {
                            return (
                                <Radio value={i}>{e}</Radio>
                            )
                        })}
                    </Radio.Group>
                )
            case 'numeric':
                return (
                    <InputNumber size={"large"}/>
                )
            case 'checking':
                return (
                    <Checkbox.Group>
                        {question.answers.map((e, i) => {
                            return (
                                <Checkbox value={i}>{e}</Checkbox>
                            )
                        })}
                    </Checkbox.Group>
                )
            default:
                return null
        }
    }


    return (
        <div>
            <h3>Question: {question.question} ?</h3>
            {questionOptions(question)}
        </div>
    );
}


export default Page;
