import {Checkbox, InputNumber, Radio} from "antd";
import React from "react";

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
                                <Radio value={i} key={i}>{e}</Radio>
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
                                <Checkbox value={i} key={i}>{e}</Checkbox>
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


export default QuestionSwitch
