import React, { useEffect, useRef, useState } from "react";
import { login } from '../../../Redux/Slice/Website/LoginSlice';
import "./Home.css";
import { IoIosCall } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import { MdOutlineClose } from "react-icons/md";
import about from "../../../assets/Images/Website/About us.png";
import mission from "../../../assets/Images/Website/Business mission-rafiki.png";
import growth from "../../../assets/Images/Website/growth.png";
import star from "../../../assets/Images/Website/star.png";
import team from "../../../assets/Images/Website/team.png";
import team1 from "../../../assets/Images/Website/team (1).png";
import speech from "../../../assets/Images/Website/speech-bubble.png";
import report from "../../../assets/Images/Website/report.png";
import docs from "../../../assets/Images/Website/google-docs.png";
import payment from "../../../assets/Images/Website/payment-method.png";
import appointment from "../../../assets/Images/Website/appointment.png";
import badge from "../../../assets/Images/Website/google-play-badge.png";
import { useDispatch, useSelector } from "react-redux";
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min';
import { createDemo } from "../../../Redux/Slice/SuperAdmin/DemoSlice";
import { fetchCities } from "../../../Redux/Slice/SuperAdmin/citiesSlice";
import { useNavigate } from "react-router-dom";
import Dialog from "../../SocietyAdmin/DialogBox/DialogBox";

const Home = () => {
  const aboutRef = useRef(null);
  const homeRef = useRef(null);
  const featuresRef = useRef(null);
  const dispatch = useDispatch();
  const contactRef = useRef(null);
  const demoStatus = useSelector((state) => state.demo.status);
  const demoError = useSelector((state) => state.demo.error);
  const { cities } = useSelector((state) => state.cities)
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const modalRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    societyName: '',
    city: '',
  });
  useEffect(() => {
    dispatch(fetchCities())
  }, [dispatch])
  const navigate = useNavigate()
  const handleLogin = async () => {
    try {
      const result = await dispatch(login({ email: Email, password: Password }));
      console.log(result)
      const modalInstance = bootstrap.Modal.getInstance(modalRef.current);
      modalInstance.hide();
      if (result.type === "societyAdmin/login/fulfilled") {
        setSuccessMessage("Login Successful")
        setShowDialog(true);
        setTimeout(() => {
          setShowDialog(false);
          navigate("/societyAdmin/dashboard");
          window.location.reload();
        }, 2000);
      }else{
        setSuccessMessage("Error, Plese check details!")
        setShowDialog(true);
      setTimeout(() => {
        setShowDialog(false);
        window.location.reload();
      }, 2000);
      }
    }
    catch (error) {
      console.log(error)
      
    }
  };
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(createDemo({ demo: formData }));
      if (result.type === "demo/createDemo/fulfilled") {
        setFormData({
          name: '',
          phoneNumber: '',
          email: '',
          societyName: '',
          city: '',
        });
        window.alert('Demo request submitted successfully!');

      }

    } catch (error) {
      console.error('Error submitting demo request:', error);
    }
  };


  return (
    <div className="container-main">
      <div className="header z-1">
        <div className="row">
          <div className="col-md-4 ">
            <h2 className="Logo" onClick={() => scrollToSection(homeRef)}>
              LivinSync
            </h2>
          </div>
          <div className="col-md-1 d-flex justify-content-center algin-items-center" >
            <h5
              className="tab"
              onClick={() => scrollToSection(aboutRef)}
              style={{ fontWeight: 700 }}
            >
              About
            </h5>

          </div>
          <div className="col-md-1 d-flex justify-content-center algin-items-center">
            <h5 className="tab" onClick={() => scrollToSection(featuresRef)}
              style={{ fontWeight: 700 }}>
              Features
            </h5>
          </div>
          <div className="col-md-1 d-flex justify-content-center algin-items-center">
            <h5 className="tab" onClick={() => scrollToSection(contactRef)}
              style={{ fontWeight: 700 }}>
              Contact
            </h5>
          </div>
          <div className="col-md-4  d-flex justify-content-end algin-items-end">
            <a
              href="tel:+91 93478 83483"
              className="number text-decoration-none"
              style={{ fontWeight: 700 }}
            >
              <IoIosCall className="fs-6 text-decoration-none" />
              +91 93478 83483
            </a>
            <button
              type="button"
              className="fs-6 login"
              data-bs-toggle="modal"
              data-bs-target="#Login"
            >
              Login
            </button>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="Login"
        tabIndex="1"
        aria-labelledby="LoginModal"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between align-items-center">
              <div>
                <h5 className="modal-title" id="Login">
                  Login to Society
                </h5>
                <p className="caption">
                  Your Gateway to Seamless Community Interaction
                </p>
              </div>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <MdOutlineClose />
              </button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="col mb-1">
                  <label className="Email">Email</label>
                  <input
                    type="email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', padding: 10, }}
                  />
                </div>
                <div className="col mb-1">
                  <label className="password">Password</label>
                  <input
                    type="password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: '100%', padding: 10, }}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <button
                  className="login mt-3"
                  type="submit"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
              {/* {user && <p>Welcome, {user.name}!</p>}
              {token && <p>Your token: {token}</p>} */}
            </div>
          </div>
        </div>
      </div>
      <div className="row hero-background" ref={homeRef}>
        <div className="col-md-7 hero-section-1">
          <h1>
            Empower Your Community with <span>LivinSync</span>
          </h1>
          <h3>
            Seamless Security Monitoring and Financial Management for Modern
            Communities
          </h3>
          <button type="button" class="button">
            <div class="button-top"
              onClick={() => scrollToSection(contactRef)}>
              Book Your Demo
            </div>
            <div class="button-bottom"></div>
            <div class="button-base"></div>
          </button>
        </div>
        <div className="col-md-5">

        </div>
      </div>
      <div ref={aboutRef} className="About">
        <div className="row aboutus">
          <div className="col-md-8 content">
            <h3>
              About <span>Us</span>
            </h3>
            <p>
              <span>LivinSync</span> is dedicated to revolutionizing community
              living. Our platform offers innovative solutions to streamline
              operations, enhance communication, and foster connections within
              housing societies. Trusted by communities nationwide, we're
              committed to empowering residents and managing committees with the
              tools they need to thrive.
            </p>
          </div>
          <div className="col-md-4 d-flex justify-content-center algin-items-center">
            <img src={about} alt="About" className="Image" />
          </div>
        </div>
        <div className="row aboutus pt-2">
          <div className="col-md-4 d-flex justify-content-center algin-items-center">
            <img src={mission} alt="About" className="Image" />
          </div>
          <div className="col-md-8 content">
            <h3>
              <span>Our</span> Mission
            </h3>
            <p>
              <span>LivinSync</span> is to empower communities through
              technology. We're dedicated to fostering connection,
              collaboration, and well-being within housing societies. Guided by
              core values of community-centricity, innovation, transparency,
              empowerment, and sustainability, we strive to create vibrant,
              inclusive spaces where residents thrive.
            </p>
          </div>
        </div>
      </div>
      <div className="WhyChooseUs">
        <h3 className="text-center">
          Why Choose <span>Us</span>
        </h3>
        <div className="row">
          <div className="col-md-4">
            <img src={growth} alt="growth" className="icons" />
            <h5>Elevate Your Community</h5>
            <p className="text-center">
              Empower residents with seamless management tools. Trust in our
              reliability and innovation.
            </p>
          </div>
          <div className="col-md-4 ">
            <img src={star} alt="star" className="icons" />
            <h5>Effortless Excellence</h5>
            <p className="text-center">
              Simplify community management with our intuitive platform.
              Experience efficiency, support, and progress.
            </p>
          </div>
          <div className="col-md-4 ">
            <img src={team} alt="team" className="icons" />
            <h5>Transform Together</h5>
            <p className="text-center">
              Join a community of empowered societies. Elevate communication,
              streamline operations, and foster connection.
            </p>
          </div>
        </div>
      </div>
      <div ref={featuresRef} className="Features">
        <div className="heading">
          <h3>One Platform, Endless Solutions</h3>
          <h5>
            From Communication to Security, <span>LivinSync</span> Covers it All!
          </h5>
        </div>
        <div className="details">
          <div className="row ">
            <div className="col-md-2 d-flex justify-content-center algin-items-center">
              <img src={speech} alt="speech" className="feature-icon" />
            </div>
            <div className="col-md-10">
              <h4>Communication Tools</h4>
              <p>
                Facilitates seamless communication among residents and managing
                committees through chat, announcements, and notifications.
              </p>
            </div>
          </div>
          <div className="row ">
            <div className="col-md-10">
              <h4>Payment Processing</h4>
              <p>
                Offers online payment options for maintenance fees, utilities,
                and other dues, with automated reminders for timely payments.
              </p>
            </div>
            <div className="col-md-2 d-flex justify-content-center algin-items-center">
              <img src={payment} alt="payment" className="feature-icon" />
            </div>
          </div>
          <div className="row ">
            <div className="col-md-2 d-flex justify-content-center algin-items-center">
              <img
                src={appointment}
                alt="appointment"
                className="feature-icon"
              />
            </div>
            <div className="col-md-10">
              <h4>Facility Booking</h4>
              <p>
                Allows residents to easily book common facilities like
                clubhouse, gym, pool, etc., with availability calendars and
                reservation management.
              </p>
            </div>
          </div>
          <div className="row ">
            <div className="col-md-10">
              <h4>Maintenance Requests</h4>
              <p>
                Provides an online platform for residents to submit maintenance
                requests, track progress, and receive updates on repairs.
              </p>
            </div>
            <div className="col-md-2 d-flex justify-content-center algin-items-center">
              <img src={report} alt="report" className="feature-icon" />
            </div>
          </div>
          <div className="row ">
            <div className="col-md-2 d-flex justify-content-center algin-items-center">
              <img src={team1} alt="team1" className="feature-icon" />
            </div>
            <div className="col-md-10">
              <h4>Visitor Management</h4>
              <p>
                Streamlines visitor registration, gate pass issuance, and
                tracking to enhance community security, ensuring a smooth and
                secure process for managing access and monitoring all entries
                and exits effectively.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-10">
              <h4>Community Forums</h4>
              <p>
                Offers online forums or discussion boards for residents to
                engage, share ideas, and address community concerns
                collaboratively.
              </p>
            </div>
            <div className="col-md-2 d-flex justify-content-center algin-items-center">
              <img src={docs} alt="docs" className="feature-icon" />
            </div>
          </div>
        </div>
      </div>
      <div className="Pricing">
        <div className="heading">
          <h3>
            Craft Your Community Future with <span>LivinSync</span>
          </h3>
        </div>
        <div className="details">
          <div className="row">
            <div className="col-md-6">
              <div className="standard-card-1">
                <div className="standard-card-2">
                  <h5>Standard Plan</h5>
                  <div className="features z-0">
                    <p>
                      <FaCircleCheck className="icon" />
                      For Medium Communities
                    </p>
                    <p>
                      <FaCircleCheck className="icon" />
                      Payment Method
                    </p>

                    <p className="opacity-75 ">
                      <FaCircleCheck className="icon opacity-25" />
                      Visitor Management
                    </p>
                    <p className="opacity-75">
                      <FaCircleCheck className="icon opacity-25" />
                      Security Management
                    </p>
                    <p>
                      <FaCircleCheck className="icon" />
                      Discussion Room
                    </p>
                    <p>
                      <FaCircleCheck className="icon" />
                      Finance Management
                    </p>
                    <p className="opacity-75">
                      <FaCircleCheck className="icon opacity-25" />
                      Polls & Events
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="premium-card-1">
                <div className="premium-card-2">
                  <h5>Premium Plan</h5>
                  <div className="features">
                    <p>
                      <FaCircleCheck className="icon" />
                      For Medium Communities
                    </p>
                    <p>
                      <FaCircleCheck className="icon" />
                      Payment Method
                    </p>

                    <p>
                      <FaCircleCheck className="icon" />
                      Visitor Management
                    </p>
                    <p>
                      <FaCircleCheck className="icon" />
                      Security Management
                    </p>
                    <p>
                      <FaCircleCheck className="icon" />
                      Discussion Room
                    </p>
                    <p>
                      <FaCircleCheck className="icon" />
                      Finance Management
                    </p>
                    <p>
                      <FaCircleCheck className="icon" />
                      Polls & Events
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Contact">
        <h5>
          Contact <span>Us</span>
        </h5>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col mb-1">
              <label className="Name">Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="col mb-1">
              <label className="phonenumber">Mobile Number</label>
              <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            </div>
          </div>
          <div className="row">
            <div className="col mb-1">
              <label className="email">Email address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="col mb-1">
              <label className="society-name">Society Name</label>
              <input type="text" name="societyName" value={formData.societyName} onChange={handleChange} />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <select className="form-select" value={formData.city} name="city" onChange={handleChange} aria-label="Default select example" >
                <option selected>Select city</option>
                {cities.map((city) => (
                  <option key={city._id} value={city._id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col mt-4">
              <button type="submit" className="login">Get In Touch</button>
            </div>
          </div>
        </form>
        {demoStatus === 'loading' && <p>Loading...</p>}
        {/* {demoStatus === 'succeeded' && <p>Demo request submitted successfully!</p>} */}
        {demoStatus === 'failed' && <p>Error: {demoError}</p>}
      </div>
      <div className="Footer" ref={contactRef} style={{ position: 'relative', width: '100%', padding: '20px', backgroundColor: '#192C4C', color: 'white' }}>
        <div className="row" style={{ marginBottom: '20px' }}>
          <div className="col-md-5">
            <h3>LivinSync</h3>
            <h6>
              Where society management meets simplicity. Unlock hassle-free community living with our innovative platform. Join the{" "}
              <span>LivinSync</span> revolution today!
            </h6>
          </div>
          <div className="col-md-3 contact" style={{ color: "white" }}>
            <h5>CONTACT</h5>
            <div>
              <a href="mailto:hello@liveasy.com" style={{ color: 'white' }}>hello@liveasy.com</a>
            </div>
            <div>
              <a href="tel:+91 93478 83483" style={{ color: 'white' }}>+91 93478 83483</a>
            </div>
          </div>
          <div className="col-md-4 play">
            <h6>GET IN MOBILE APP</h6>
            <img src={badge} alt="play" className="goggle-play" />
          </div>
        </div>
        <hr className="divider" style={{ borderColor: 'white' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
          <p className="copyright m-2" style={{ margin: '0' }}>
            © 2024 TruQuest Infotech LLP – All Rights Reserved.
          </p>
          <ul className="social" style={{ display: 'flex', listStyleType: 'none', padding: '0', margin: '0' }}>
            <li className="social-item" style={{ margin: '0 10px' }}>
              <a className="social-link" href="/">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" fill="currentColor"></path>
                </svg>
              </a>
            </li>
            <li className="social-item" style={{ margin: '0 10px' }}>
              <a className="social-link" href="/">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M8 3C9.10457 3 10 3.89543 10 5V8H16C17.1046 8 18 8.89543 18 10C18 11.1046 17.1046 12 16 12H10V14C10 15.6569 11.3431 17 13 17H16C17.1046 17 18 17.8954 18 19C18 20.1046 17.1046 21 16 21H13C9.13401 21 6 17.866 6 14V5C6 3.89543 6.89543 3 8 3Z" fill="currentColor"></path>
                </svg>
              </a>
            </li>
            <li className="social-item" style={{ margin: '0 10px' }}>
              <a className="social-link" href="/">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 12C6 15.3137 8.68629 18 12 18C14.6124 18 16.8349 16.3304 17.6586 14H12V10H21.8047V14H21.8C20.8734 18.5645 16.8379 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.445 2 18.4831 3.742 20.2815 6.39318L17.0039 8.68815C15.9296 7.06812 14.0895 6 12 6C8.68629 6 6 8.68629 6 12Z" fill="currentColor"></path>
                </svg>
              </a>
            </li>
            <li className="social-item" style={{ margin: '0 10px' }}>
              <a className="social-link" href="/">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7ZM9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12Z" fill="currentColor"></path>
                  <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" fill="currentColor"></path>
                  <path fillRule="evenodd" clipRule="evenodd" d="M5 1C2.79086 1 1 2.79086 1 5V19C1 21.2091 2.79086 23 5 23H19C21.2091 23 23 21.2091 23 19V5C23 2.79086 21.2091 1 19 1H5ZM19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" fill="currentColor"></path>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Dialog
          message={successMessage}
          showDialog={showDialog}
          onClose={() => setShowDialog(false)}
        />
    </div>
  );
};

export default Home;