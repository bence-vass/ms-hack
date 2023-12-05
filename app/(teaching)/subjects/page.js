'use client'
import React from 'react';
import { Col, Row } from "antd";
import { subjects } from "@/app/(teaching)/subjects/dummy_subject";
import Image from "next/image";
import styled from "styled-components";
import { usePathname } from "next/navigation";
import CustomLink from "@/ui/custom-link";

const StyledAntdCol = styled(Col)`
  width: 20%;
  height: 20vh;
  justify-content: center;
  text-align: center;
  padding: 2vw;
  margin-bottom: 1vw;
  color: #49194F;
  border-radius: 20px;

  a {
    color: #49194F !important;
  }

  .contentWrapper {
    width: 100%;
    height: 100%;
    padding: 1.7vw;
    position: relative;
    transition-duration: 350ms;
    transition-timing-function: ease-in-out;
    filter: grayscale(0);
  }

  &:hover {
    transform: scale(1.2);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }

  .contentWrapper:hover {
    transform: scale(1.2);
    z-index: 99;
    filter: grayscale(${props => props.active ? 0 : 1});
  }

  h3 {
    margin-top: 1.2rem;
    font-size: medium; /* Adjusted font size to fit within the smaller card */
  }
`;

function Page(props) {
  const current_path = usePathname();
  const colCount = 4;
  const cols = [];

  for (let i = 0; i < subjects.length; i++) {
    console.log(i, subjects[i].name);
    cols.push(
      <StyledAntdCol key={i} span={24 / colCount} active={subjects[i].active}>
        <CustomLink href={current_path + '/' + subjects[i].slug} active={subjects[i].active}>
          <div className={'contentWrapper'}>
          
            <div style={{
              position: 'relative',
              height: '100%',
              width: '100%',
            }}>
              <Image src={subjects[i].img} alt={subjects[i].name} fill={true}/>
            </div>
            <h3>{subjects[i].name}</h3>
            </div>
        </CustomLink>
      </StyledAntdCol>
    );
  }

  return (
    <div>
      <h1>Subjects</h1>
      <Row gutter={[3, colCount]}>
        {cols}
      </Row>
    </div>
  );
}

export default Page;
