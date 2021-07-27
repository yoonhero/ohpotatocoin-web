import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"

const Arrow = styled.div`
  background: #1e4151;
  border-radius:50%;
  padding: 8px;
  position:absolute;
  bottom: -45px;
  z-index:2;
`

const SlickNext = styled(Arrow)`
  left:52%;
`

const SlickPrev = styled(Arrow)`
  right: 52%;
`

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <SlickNext
      onClick={ onClick }
    >
      <FontAwesomeIcon icon={ faArrowRight } color='#fff' size="lg" />
    </SlickNext>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <SlickPrev
      onClick={ onClick }
    >
      <FontAwesomeIcon icon={ faArrowLeft } color='#fff' size="lg" />
    </SlickPrev>
  );
}


export const CarouselSettings = {
  dots: false,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />
};

