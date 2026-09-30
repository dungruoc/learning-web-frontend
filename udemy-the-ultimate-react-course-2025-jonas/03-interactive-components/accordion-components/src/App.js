import { useState } from 'react';
import './index.css';

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus."
  },
  {
    title: "How long do I have to return my chair?",
    text:
      "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus."
  },
  {
    title: "Do you ship to countries outside the EU?",
    text:
      "Excepturi velit laborum, <strong>perspiciatis</strong> nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
  }
];

export default function App() {
  return (
    <div className="accordion">
      {faqs.map((faq, idx) => <AccordionItem item={faq} num={idx + 1} key={idx} />)}
    </div>
  );
}

function AccordionItem({item, num}) {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggleOpen() {
    setIsOpen(io => !io);
  }

  return (
    <div className={`item ${isOpen ? 'open' : ''}`} onClick={handleToggleOpen}>
      <p className="number">{num.toString().padStart(2, '0')}</p>
      <p className="title">{item.title}</p>
      <p className="icon">{isOpen ? '-' : '+'}</p>
      {isOpen ?
      <div className="content-box">
        <p className="text">{item.text}</p>
      </div> : null
      }
    </div>
  );
}