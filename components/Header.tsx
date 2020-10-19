import Link from "next/link";
import styled from "@emotion/styled";

const Header = () => {
  return (
    <HeaderStyled>
      <div className="header-inner container">
        <Link href="/">
          <div className="logo">
            <img src="/images/logo.svg" alt="Logo" />
          </div>
        </Link>
      </div>
    </HeaderStyled>
  );
};

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
    cursor: pointer;
  }
`;

export default Header;
