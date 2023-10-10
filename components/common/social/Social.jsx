///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//         File using for showing the social media options in the FOOTER of all pages                //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

// Function for showing the social media options as link
const Social = () => {
  const socialContent = [
    { id: 1, icon: "icon-facebook", link: "https://facebok.com/" },
    { id: 2, icon: "icon-twitter", link: "https://twitter.com/" },
    { id: 3, icon: "icon-instagram", link: "https://instagram.com/" },
    { id: 4, icon: "icon-linkedin", link: "https://linkedin.com/" },
  ];
  return (
    <>
      {socialContent.map((item) => (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          key={item.id}
        >
          <i className={`${item.icon} text-14`} />
        </a>
      ))}
    </>
  );
};

export default Social;
