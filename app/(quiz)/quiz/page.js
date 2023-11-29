'use client'
import React from 'react';
import {Button, Checkbox, Col, InputNumber, Radio, Row, Steps} from "antd";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {setCurrentQuestion} from "@/redux/features/quiz/quizSlice";
import QuestionSwitch from "@/ui/question-switch";
import {quiz} from "@/app/(quiz)/quiz/dummy_quiz";


function Page(props) {



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



export default Page;
