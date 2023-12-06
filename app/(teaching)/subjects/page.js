'use client'
import React from 'react';
import { Col, Row } from "antd";
import { subjects } from "@/app/(teaching)/subjects/dummy_subject";
import Image from "next/image";
import styled from "styled-components";
import { usePathname } from "next/navigation";
import CustomLink from "@/ui/custom-link";

const StyledAntdCol = styled(Col)`
  width: 40%;
  height: 20vh;
  justify-content: center;
  text-align: center;
  padding: 0vw;
  margin-bottom: 1vw;
  color: #49194f;
  border-radius: 20px;

  a {
    color: #49194f !important;
  }

  .contentWrapper {
    width: 100%;
    height: 100%;
    padding: 1.7vw;
    position: relative;
    transition: transform 350ms ease-in-out;
    filter: grayscale(0);

    &:hover {
      transform: scale(1.2);
    }
  }

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }

  .contentWrapper:hover {
    z-index: 99;
    filter: grayscale(${props => (props.active ? 0 : 1)});
    transform: scale(1.1);
  }

  h3 {
    margin-top: 1.2rem;
    font-size: medium;
  }

  @media (max-width: 1200px) {
    width: 25%;
  }

  @media (max-width: 992px) {
    width: 33.33%;
  }

  @media (max-width: 768px) {
    width: 50%;
  }

  @media (max-width: 576px) {
    width: 100%;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 80%;
  width: 100%;
  max-width: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 8px;
    max-width: 100%;
  }
`;

function Page() {
  const currentPath = usePathname();
  const colCount = 4;
  const cols = subjects.map((subject, index) => (
    <StyledAntdCol key={index} span={24 / colCount} active={subject.active}>
      <CustomLink href={`${currentPath}/${subject.slug}`} active={subject.active}>
        <div className="contentWrapper">
          <ImageWrapper>
            <Image src={subject.img} alt={subject.name} fill />
          </ImageWrapper>
          <h3>{subject.name}</h3>
        </div>
      </CustomLink>
    </StyledAntdCol>
  ));

  return (
    <div>
      <h1>Subjects</h1>
      <Row gutter={[3, colCount]}>{cols}</Row>
    </div>
  );
}

export default Page;
