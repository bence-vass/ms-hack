// Import necessary libraries
'use client'
import React, { useState } from 'react';
import { Button, Col, Row, Steps, Select, Card } from 'antd';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setCurrentQuestion } from '@/redux/features/quiz/quizSlice';
import QuestionSwitch from '@/ui/question-switch';
import { chapters } from '@/app/(teaching)/subjects/[subjectSlug]/dummy_chapters';
import { subjects } from '@/app/(teaching)/subjects/dummy_subject';
import { quiz } from '@/app/(quiz)/quiz/dummy_quiz';

const { Option } = Select;

const Page = () => {
  // State variables for selected subject, chapter, and current question
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);

  // Redux state and dispatch
  const currentQuestion = useAppSelector((state) => state.quizReducer.currentQuestion);
  const dispatch = useAppDispatch();

  // Handle chapter selection
  const handleChapterSelect = (value) => {
    setSelectedChapter(value);
    dispatch(setCurrentQuestion(0));
  };

  // Handle subject selection
  const handleSubjectSelect = (value) => {
    setSelectedSubject(value);
    setSelectedChapter(null);
    dispatch(setCurrentQuestion(0));
  };

  // Filter chapters based on the selected subject
  const filteredChapters = chapters.filter((chapter) => chapter.subjectSlug === selectedSubject);

  return (
    <div>
      <h1>Quiz:</h1>
      <Row>
        <Col span={8}>
          {/* Dropdown for selecting the subject */}
          <Select
            placeholder="Select a subject"
            style={{ width: '100%', marginBottom: '16px' }}
            onChange={handleSubjectSelect}
          >
            {/* Map over subjects to create options */}
            {subjects.map((subject) => (
              <Option key={subject.slug} value={subject.slug}>
                {subject.name}
              </Option>
            ))}
          </Select>

          {/* Dropdown for selecting the chapter */}
          {selectedSubject && (
            <Select
              placeholder="Select a chapter"
              style={{ width: '100%', marginBottom: '16px' }}
              onChange={handleChapterSelect}
            >
              {/* Map over filtered chapters to create options */}
              {filteredChapters.map((chapter) => (
                <Option key={chapter.slug} value={chapter.slug}>
                  {chapter.title}
                </Option>
              ))}
            </Select>
          )}

          {selectedChapter && (
            <Steps
              direction="vertical"
              current={currentQuestion}
              items={quiz[selectedChapter].map((e, i) => ({
                title: `Question No. ${i + 1}`,
                description: e.desc,
              }))}
              onChange={(val) => dispatch(setCurrentQuestion(val))}
            />
          )}
        </Col>
        <Col span={16}>
          {/* Conditionally render quiz content based on the selected chapter */}
          {selectedChapter && (
            <>
              
              <Card style={{ marginTop: '100px' }}>
              <QuestionSwitch question={quiz[selectedChapter][currentQuestion]} />
              <Button
                size="large"
                disabled={false}
                style={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translate(-50%, 0)',
                  top: '200px',
                }}
                onClick={() => {
                  if (currentQuestion + 1 < quiz[selectedChapter].length) {
                    dispatch(setCurrentQuestion(currentQuestion + 1));
                  }
                }}
              >
                Next
              </Button>
              </Card>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Page;
