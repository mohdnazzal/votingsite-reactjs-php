// import React from 'react'; // Uncomment if necessary for your setup
import { Helmet } from 'react-helmet'; // Importing Helmet to manage the document head
import FeatureCard from '../components/common/FeatureCard';
import Card from '../components/common/Card';
import ReverseCard from '../components/common/ReverseCard';
import { useNavigate } from "react-router-dom"; // Importing components for routing
import PollIMG from "../../src/assets/images/poll.png";
import Feature1 from "../../src/assets/images/adjustability.png";
import Feature2 from "../../src/assets/images/file-sharing.png";
import Feature3 from "../../src/assets/images/encrypted.png";
import TapIMG from "../../src/assets/images/tap.png";


export default function MainPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/auth');
  };

    return (
      <>
        <Helmet>
          <meta charSet="utf-8" /> {/* Sets the character encoding for the document */}
          <title>Home Page</title> {/* Sets the title of the page */}
        </Helmet>
        <main style={{ width: "100%" }}> {/* Main content area with full width */}
            <div className='container'>
              <div className='row'>
                <div className='col-12'>
                  <div className="container py-5">
                    <div data-spy="scroll" data-target="#navbar-example2" data-offset="0">
                    <br></br>
                    <br></br>

                    <div id="home" className="row align-items-center">
                      <Card
                        myClass1="col-md-3 text-center"
                        myClass2="col-md-9"
                        title="Voting Made Easy"
                        imageUrl= {PollIMG}
                        imageAlt="Poll Image"
                        text="An interactive voting and polling platform that allows users to create, participate in, and manage polls on various topics. It offers a user-friendly interface for creating polls with multiple options, viewing real-time results, and sharing polls with others."
                        buttonText="Create Demo"
                        clickAction={handleClick}

                      />
                    </div>
                    <hr className='hr-line'></hr>
                    <div className="row align-items-center text-center" style={{margin:"auto 0px", padding:"0px"}}>
                      <h2 id="features" className='text-center'>Features</h2>
                      <br></br>
                      <br></br>
                      <br></br>

                      <div className="col-md-4 text-center">
                          <FeatureCard
                            title="Poll Customization"
                            imageUrl={Feature1}
                            text="Allows users to tailor polls with various options, themes, and settings for personalized experiences."
                         />
                      </div>
                      <div className="col-md-4 text-center">
                          <FeatureCard
                            title="Deploying"
                            imageUrl={Feature2}
                            text="Enables polls to be easily shared on social media or embedded on websites for wider reach."
                         />
                      </div>
                      <div className="col-md-4 text-center">
                          <FeatureCard
                            title="Security & Fraud Protection"
                            imageUrl= {Feature3}
                            text="Implements measures like CAPTCHA, IP restrictions, and email verification to ensure fair voting."
                         />
                      </div>
                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>

                      <div className="col-md-4 text-center">
                          <FeatureCard
                            title="Dashboard"
                            imageUrl={Feature1}
                            text="Provides an intuitive overview of poll performance, user engagement, and recent activity, giving you easy access to all essential features."
                            />
                      </div>
                      <div className="col-md-4 text-center">
                          <FeatureCard
                            title="Advanced Analytics"
                            imageUrl={Feature2}
                            text="Delivers in-depth insights into voting patterns, real-time vote counts, user demographics, and trends, helping you understand your audience and optimize polls."
                         />
                      </div>
                      <div className="col-md-4 text-center">
                          <FeatureCard
                            title="Simplified"
                            imageUrl= {Feature3}
                            text="A seamless and user-friendly voting process, designed to encourage participation and maximize engagement with minimal effort."
                         />
                      </div>
                    </div>
                    <hr className='hr-line'></hr>
                    <br></br>
                    <br></br>
                    <div id="cases" className="row align-items-center">
                      <h6 className='text-center'>Trusted by Over 100,000 Users WorldWide</h6>
                      <div className="col-md-4 text-center">
                      </div>
                      <div className="col-md-2 text-center">
                        <h2 style={{color:"#3498db"}}>Users</h2>
                        <h6>100,473</h6>
                      </div>
                      <div className="col-md-2 text-center">
                        <h2 style={{color:"#3498db"}}>Polls</h2>
                        <h6>239,275</h6>

                      </div>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="row align-items-center">
                    <ReverseCard
                        myClass1="col-md-4"
                        myClass2="col-md-8"
                        title="Create with One Click"
                        imageUrl= {TapIMG}
                        imageAlt="Poll Image"
                        text="Instantly generate polls with a single click, streamlining the process for quick and effortless setup. It eliminates complex steps, allowing users to start gathering votes in seconds, making the experience incredibly simple and user-friendly."


                      />
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </main>
      </>
    );
}
