import styled from 'styled-components'

const HeroTitle = styled('span')({
  color: '#702400',
  textShadow: `
  -1px -1px 0 #fff,
  0   -1px 0 #fff,
  1px -1px 0 #fff,
  1px  0   0 #fff,
  1px  1px 0 #fff,
  0    1px 0 #fff,
 -1px  1px 0 #fff,
 -1px  0   0 #fff;
  `,
  p: {
    fontFamily: 'Paytone One',
    lineHeight: 1,
  },
})

export default HeroTitle
