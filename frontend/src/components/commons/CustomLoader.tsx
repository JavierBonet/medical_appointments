import React from 'react';
import CircleLoader from 'react-spinners/CircleLoader';

const customCSS = `
  display: block;
  border-color: red;
  margin: 15px 0 15px 0;
`;

interface PropsInterface {
  loading: boolean;
}

const CustomLoader = ({ loading }: PropsInterface) => {
  return (
    <CircleLoader
      loading={loading}
      css={customCSS}
      size={150}
      color="#1a759f"
    />
  );
};

export default CustomLoader;
