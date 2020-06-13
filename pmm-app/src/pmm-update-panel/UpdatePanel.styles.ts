import { css } from 'emotion';

export const panel = css`
  position: relative;
  height: inherit;
  padding-top: 5px;

  p {
    margin-bottom: 0;
  }

  .version {
    font-size: 14px;
    margin-bottom: 7px;
  }

  section.state {
    height: 65px;
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border: 2px solid #292929;
  }

  .no-update-text {
    font-size: 12px;
  }

  @media (max-width: 1281px) {
    #pmm-update-widget h2 {
      font-size: 1.55rem;
      margin-bottom: 0.1rem;
    }
  }
`;
