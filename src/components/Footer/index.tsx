import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = '程序员阿符';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: '777nx',
          title: '贝果研究家',
          href: 'https://www.777nx.cn',
          blankTarget: true,
        },
        {
          key: '兔子 BI',
          title: '兔子 BI',
          href: 'https://preview.pro.ant.design/welcome',
          blankTarget: true,
        },
        {
          key: 'github',
          title: (
            <>
              <GithubOutlined /> 阿符源码
            </>
          ),
          href: 'https://github.com/777nx',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
