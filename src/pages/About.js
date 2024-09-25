import React from 'react';

const About = () => {
  return (
    <div className="about-container" style={styles.container}>
      <h1 style={styles.header}>About Us</h1>
      <p style={styles.paragraph}>
        Welcome to my project! I am passionate about creating modern and scalable web applications that solve real-world problems. I am dedicated to using the latest technologies and best practices to deliver high-quality solutions.
      </p>
      <h2 style={styles.subheader}>myNotebook</h2>
      <p style={styles.paragraph}>
        I developed myNotebook to provide users with a seamless experience, whether they can save their notes on our server and can fetch later using their credentials. We maintain their privacy and we focus on efficiency, performance, and user satisfaction in everything we build.
      </p>
      <h2 style={styles.subheader}>What I Do</h2>
      <p style={styles.paragraph}>
        I am specialize in building full-stack web applications using technologies like React for the frontend and Node.js for the backend and Express.js for the API. My expertise also extends to databases MongoDB.
      </p>
      <h2 style={styles.subheader}>Get In Touch</h2>
      <p style={styles.paragraph}>
        Have any questions or want to collaborate? Feel free to <a href="https://mail.google.com/mail/u/0/#inbox?compose=CllgCKHQdcFJmBnFKwjnPdJPCkMdgtnfpZXWpLdpZTkbXPZcxHJnnvGjGpRWMlBVvnkKkNjJgKL" target='_blank' rel='noreferrer' style={styles.link}>contact me</a> or reach me out <a href="https://github.com/srmnikhil" target='_blank' rel='noreferrer' style={styles.link}>GitHub</a>.
      </p>
    </div>
  );
};

const styles = {
  container: {
    margin: '50px auto',
    maxWidth: '800px',
    textAlign: 'center',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: '36px',
    marginBottom: '20px',
  },
  subheader: {
    fontSize: '28px',
    marginTop: '20px',
    marginBottom: '10px',
  },
  paragraph: {
    fontSize: '18px',
    lineHeight: '1.6',
    color: '#555',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default About;
