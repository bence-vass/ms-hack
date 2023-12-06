"use client"

import Image from 'next/image'
import styles from './page.module.css'
import Link from "next/link";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {decrement, increment, reset} from "@/redux/features/counter/counterSlice";
import {GithubOutlined} from "@ant-design/icons";
import styled from "styled-components";


const StyledContainer = styled.div`
  width: 65%;
  margin: 40px auto;
  text-align: justify;
  text-align-last: left;
  font-size: 24px;

  h1, h2, h3 {
    text-align-last: center;
  }
`

export default function Home() {
    const count = useAppSelector((state) => state.counterReducer.value)
    const dispatch = useAppDispatch()
    return (
        <main style={{
            textAlign: 'center'
        }}>

            <a href={"https://github.com/bence-vass/ms-hack"}>
                <GithubOutlined style={{fontSize: 100}}/> <h2>GitHub</h2>
            </a>


            <StyledContainer>

                <h1>ELEXAM</h1>
                <h3>The Inspiration </h3>
                <p>
                    In a world dominated by sensory overload from social media, the younger generation struggles
                    with diminished attention spans, making it harder for them to acquire knowledge and concentrate
                    on lessons. However, the solution lies not in rebuilding the entire educational system but in
                    integrating these stimuli into modern teaching methods.
                </p>
                <p>
                    Our project exemplifies this approach,
                    demonstrating how these distractions can be harnessed to enhance focus and engagement. By adapting
                    rather than overhauling, we present a middle ground that empowers learners without sacrificing the
                    benefits of the digital age.
                </p>
                <p>Let us inspire change, creating an educational paradigm that transforms
                    challenges into opportunities for growth. Through this innovative perspective, we equip the younger
                    generation with the skills to navigate the complexities of the modern world with focus and a genuine
                    passion for learning.
                </p>
                <h3>What it does</h3>
                <p>New approach to acquire knowledge outside of the school:</p>
                <ol>
                    <li>
                        Helps engaging in the topics: - Generating sensory stimulus learning material.
                        - Uses already existing teaching books.
                    </li>
                    <li>
                        Tailored Learning with Technology: -
                        Utilize generative AI to tailor content, making it more consumable for
                        individuals with varying attention spans. - Envision a new approach through a
                        roadmap that integrates picture-to-learning transformations powered by Azure Cloud and OpenAI.
                    </li>
                    <li>
                        Feedback-Driven Personalization: - Integrate Webgazer for real-time feedback on screen
                        engagement,
                        using heatmaps to identify and improve the most effective content areas. - Employ AI-generated
                        quizzes
                        to measure and adapt the effectiveness of learning sessions, providing a personalized learning
                        journey based on individual styles through machine learning classification.
                    </li>
                </ol>
                <h3>How we built it For</h3>
                <p>technologies we used:</p>
                <ul>
                    <li>
                        [React](https://react.dev/)
                    </li>
                    <li>
                        [Webgazer.js](https://webgazer.cs.brown.edu/)
                    </li>
                    <li>
                        [Heatmap.js](https://www.patrick-wied.at/static/heatmapjs/)
                    </li>
                </ul>

                <h3>Challenges we ran into </h3>
                <p>
                    Our biggest drawback, is the fact, that most of
                    the Azure services we wanted to use, are only available for enterprise usage,
                    so we had to use dummy data in most cases.
                </p>


                <h3>Accomplishments that we&lsquo;re proud of</h3>
                <p>
                    Our teaching Demo speaks for itself. It is responsive, and modern approach to showcase,
                    how can we engage younger generation&lsquo;s attention spam problems. By using our heatmap as the basis of
                    the engagement feedback, we can customize the learning experience for the different learning styles
                    that
                    fits the best our students.
                </p>

                <h3>What we learned</h3>
                <p>
                    We learned a lot about Azure Web Services, and how
                    colourful
                    is the palette of available tools provided by Microsoft.
                </p>

                <h3>What&lsquo;s next for ELEXAM</h3>
                <p>
                    We would like to
                    automate the whole functioning of the website. - using generative AI to create content, - automate
                    the
                    functioning, so the student doesn&lsquo;t feel overwhelmed by the learning process, - make it available
                    for
                    teachers, to help use it as a teaching aid.
                </p>




                <h3>Guide:</h3>
                <p>
                    Please review the prepared showcase for a more detailed understanding.
                    <br/>
                    Optimal performance is achieved when using this device in a well-lit room, positioned
                    approximately 1 to 1.2 meters from the camera. Calibration involves clicking and moving the cursor
                    while
                    maintaining direct eye contact.
                    <br/>
                    Please take note that if the camera is not operational, a page refresh may be required.
                    In certain situations, you may experience data latency due to heightened network demand.
                </p>
                <Link href={'/showcase/engagement-analytics'}>
                    <b><p>
                        Obtain a deeper understanding of how the different components are recognized: Engagement
                        Analytics
                    </p></b>
                </Link>
                <Link href={'/showcase/environment'}>
                    <b><p>
                        Feel free to explore and discover our efforts to maintain user engagement by visiting the
                        provided link:
                        Environment
                    </p></b>
                </Link>
                <Link href={'/showcase/eye-tracking'}>
                    <b><p>
                        An exhibition showcasing cutting-edge AI technologies in iris movement recognition:
                        Eye Tracking
                    </p></b>
                </Link>
                <Link href={'/subjects/math/chapter/ch1'}>
                    <b><p>
                        Here, you can access the full prototype of the concept:
                        Demo
                    </p></b>
                </Link>

            </StyledContainer>


        </main>
    )
}
