import styled from '@emotion/styled'

function Header() {
  return (
    <HeaderStyled>
      <div className="header-inner container">
        <div className="logo">
          <img src="/images/logo.svg" alt="Main Logo"/>
        </div>
      </div>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  .header-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  .logo {
    display: flex;
    align-items: center;
  }
`

export default Header