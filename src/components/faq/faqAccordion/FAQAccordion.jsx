import React from 'react';
import { Divider, Collapse, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import style from './FAQAccordion.module.scss';
const FAQAccordion = () => {
  const { Panel } = Collapse;
  const faqs = [
    {
      id: 1,
      question: 'What is Tacho Manager?',
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      id: 2,
      question: 'Can i make changes to my data?',
      answer:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    },
    {
      id: 3,
      question: 'How can i use Files Storage & Export',
      answer:
        "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    },
    {
      id: 4,
      question: 'What is Driver incidents?',
      answer:
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage',
    },
  ];
  return (
    <div className={style.FAQAccordion}>
      <h2>Tacho Manager’s FAQ</h2>
      <Divider className={style.divider} />
      <Collapse
        bordered={false}
        className={style.accordionWrapper}
        defaultActiveKey={['1']}
        accordion
        expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />}
      >
        {faqs.map((faq) => {
          return (
            <Panel
              key={faq.id}
              className={style.accordionItem}
              header={<h3 className={style.accordionQuestion}>{faq.question}</h3>}
            >
              <div className={style.accordionBody}>
                <p className={style.accordionAnswer}>{faq.answer}</p>
              </div>
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
};

export default FAQAccordion;
