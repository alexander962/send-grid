// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from './contactForm.module.css';
//
// const ContactForm = ({ content }) => {
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://www.google.com/recaptcha/api.js';
//     script.async = true;
//     script.defer = true;
//     document.body.appendChild(script);
//
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);
//
//   const [formData, setFormData] = useState({
//     name: '',
//     company: '',
//     email: '',
//     phone: '',
//     comments: '',
//   });
//
//   const handleChange = e => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };
//
//   const resetForm = () => {
//     setFormData({
//       name: '',
//       company: '',
//       email: '',
//       phone: '',
//       comments: '',
//     });
//     window.grecaptcha.reset();
//   };
//
//   const sendEmail = async () => {
//     try {
//       const response = await axios.post(
//         'https://cors-anywhere.herokuapp.com/https://api.sendgrid.com/v3/mail/send',
//         {
//           personalizations: [
//             {
//               to: [
//                 {
//                   email: 'info@martinhorn.com',
//                 },
//               ],
//               subject: 'New Contact Form Submission',
//             },
//           ],
//           from: {
//             email: 'info@martinhorn.com',
//           },
//           content: [
//             {
//               type: 'text/plain',
//               value: `Name: ${formData.name}\nCompany: ${formData.company}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nComments: ${formData.comments}`,
//             },
//           ],
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${content?.sendGridApiKey}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//
//       if (response.status === 202 || response.status === 200) {
//         alert('Email sent successfully!');
//         resetForm();
//       } else {
//         alert('Failed to send email. Please try again later.');
//       }
//     } catch (error) {
//       console.error('Error sending email:', error);
//       alert('An error occurred while sending the email. Please try again later.');
//     }
//   };
//
//   const handleSubmit = async e => {
//     e.preventDefault();
//
//     const recaptchaResponse = window.grecaptcha.getResponse();
//
//     if (!recaptchaResponse) {
//       alert('Please complete the reCAPTCHA verification.');
//       return;
//     }
//
//     await sendEmail(formData);
//   };
//
//   return (
//     <section className={styles.container}>
//       <h3>Contact Us</h3>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         <div className={styles.formGroup}>
//           <label htmlFor="name">*Name:</label>
//           <input type="text" id="name" placeholder="enter your name" required onChange={handleChange} />
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="company">Company/Organization:</label>
//           <input type="text" id="company" placeholder="enter your company/organization" onChange={handleChange} />
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="email">*Email:</label>
//           <input type="email" id="email" placeholder="enter your email" required onChange={handleChange} />
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="phone">Phone:</label>
//           <input type="tel" id="phone" placeholder="enter your phone number" onChange={handleChange} />
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="comments">*Comments:</label>
//           <textarea id="comments" placeholder="enter your comments here" required onChange={handleChange}></textarea>
//         </div>
//
//         <div className={styles.formGroup}>
//           <div className="g-recaptcha" data-sitekey={content?.reCaptchaSiteKey}></div>
//         </div>
//         <button type="submit" className={styles.formGroupBtn}>
//           Submit
//         </button>
//       </form>
//     </section>
//   );
// };
//
// export default ContactForm;

import React, { useEffect, useState } from 'react';
import styles from './contactForm.module.css';

const ContactForm = ({ content }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    comments: '',
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      comments: '',
    });
    window.grecaptcha.reset();
  };

  const sendEmail = async formData => {
    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData,
          sendGridApiKey: content?.sendGridApiKey,
        }),
      });

      if (response.status === 200 || response.status === 202) {
        alert('Email sent successfully');
        resetForm();
      } else {
        alert('Failed to send email. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('An error occurred while sending the email. Please try again later.');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const recaptchaResponse = window.grecaptcha.getResponse();

    if (!recaptchaResponse) {
      alert('Please complete the reCAPTCHA verification.');
      return;
    }

    await sendEmail(formData);
  };

  return (
    <section className={styles.container}>
      <h3>Contact Us</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">*Name:</label>
          <input
            type="text"
            id="name"
            placeholder="enter your name"
            required
            onChange={handleChange}
            value={formData.name}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="company">Company/Organization:</label>
          <input
            type="text"
            id="company"
            placeholder="enter your company/organization"
            onChange={handleChange}
            value={formData.company}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">*Email:</label>
          <input
            type="email"
            id="email"
            placeholder="enter your email"
            required
            onChange={handleChange}
            value={formData.email}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            placeholder="enter your phone number"
            onChange={handleChange}
            value={formData.phone}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="comments">*Comments:</label>
          <textarea
            id="comments"
            placeholder="enter your comments here"
            required
            onChange={handleChange}
            value={formData.comments}
          ></textarea>
        </div>

        <div className={styles.formGroup}>
          <div className="g-recaptcha" data-sitekey={content?.reCaptchaSiteKey}></div>
        </div>
        <button type="submit" className={styles.formGroupBtn}>
          Submit
        </button>
      </form>
    </section>
  );
};

export default ContactForm;

