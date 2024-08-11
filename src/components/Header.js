import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack } from "@chakra-ui/react";

const socials = [
  {
    icon: faEnvelope,
    url: "mailto: hello@example.com",
  },
  {
    icon: faGithub,
    url: "https://github.com",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com",
  },
  {
    icon: faMedium,
    url: "https://medium.com",
  },
  {
    icon: faStackOverflow,
    url: "https://stackoverflow.com",
  },
];

const Header = () => {
  const lastScrollPos = useRef(200);
  const [navBarDisplay, setNavBarDisplay] = React.useState('translateY(0)');
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  });

  const handleScroll = () => {
    setNavBarDisplay(window.scrollY > lastScrollPos.current ? 'translateY(-200px)' : 'translateY(0)');
    lastScrollPos.current = window.scrollY
  }

  const handleClick = (anchor) => () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      translateY={0}
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#18181b"
      transform={navBarDisplay}
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack
          px={16}
          py={4}
          justifyContent="space-between"
          alignItems="center"
        >

          <nav>
            <HStack spacing='24px'>
              {
                socials.map(a => {
                  const domain = (function(raw){
                    let cut = raw.substring(0, raw.lastIndexOf('.'))
                      , delimiters = ['@', '.', '/']
                      , index = -1
                      , i = 0
                      ;
                    while (i < delimiters.length && index === -1) {
                      index = cut.lastIndexOf(delimiters[i]);
                      i++
                    }
                    return cut.substring(index + 1)
                  })(a.url);
                  return (
                    <Box key={domain}>
                      <a href={a.url}>
                        <FontAwesomeIcon icon={a.icon} size="2x" />
                      </a>
                    </Box>
                  )
                })
              }
            </HStack>
          </nav>


          <nav>
            <HStack spacing={8}>
              {
                ["Projects", "Contact Me"].map(string => {
                  const slug = string.toLowerCase().replace(/\s+/g, '')
                      , hash = `#${slug}-section`
                      ;
                  return (
                    <Box key={slug}>
                      <a
                        href={hash}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick(slug)();
                          window.history.pushState(null, '', hash)
                        }}
                      >
                        {string}
                      </a>
                    </Box>
                  )
                })
              }
            </HStack>
          </nav>


        </HStack>
      </Box>
    </Box>
  );
};
export default Header;
