import { useState } from 'react';
import StarRating from './StarRating';
import TextExpander from './TextExpander';
import './test.css'


export default function App() {
    const [rating, setRating] = useState(0);

    return (
        <>
            <div>
                <StarRating messages={['very good', 'good', 'medium', 'amber', 'bad']}/>
                <StarRating maxRating={10} size={24} color='#555' onSetRating={setRating}/>
                <StarRating maxRating={3} size={64} messages={['good', 'fair', 'bad']}/>
                <p>The rating is {rating}</p>
            </div>
            <div>
                <TextExpander>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. At temporibus quis fuga quaerat officiis. Rerum maiores amet ex repudiandae. Totam delectus, molestiae vero eligendi commodi perspiciatis corporis eos inventore recusandae. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore animi libero consectetur quia reiciendis id repudiandae fugiat illo alias, accusantium tempora assumenda neque ipsam vitae rerum ex mollitia deleniti earum?
                </TextExpander>
                <TextExpander className="test"
                    collasedNumChars={50}
                    expandButtonText='Show more'
                    collaseButtonText='Show less'
                    buttonColor='red'
                >
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. At temporibus quis fuga quaerat officiis. Rerum maiores amet ex repudiandae. Totam delectus, molestiae vero eligendi commodi perspiciatis corporis eos inventore recusandae. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore animi libero consectetur quia reiciendis id repudiandae fugiat illo alias, accusantium tempora assumenda neque ipsam vitae rerum ex mollitia deleniti earum?
                </TextExpander>
                <TextExpander
                    collasedNumChars={80}
                    expandButtonText='expand'
                    collaseButtonText='collapse'
                >
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. At temporibus quis fuga quaerat officiis. Rerum maiores amet ex repudiandae. Totam delectus, molestiae vero eligendi commodi perspiciatis corporis eos inventore recusandae. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore animi libero consectetur quia reiciendis id repudiandae fugiat illo alias, accusantium tempora assumenda neque ipsam vitae rerum ex mollitia deleniti earum?
                </TextExpander>
                <TextExpander className='test'
                    collasedNumChars={80}
                    expandButtonText='expand'
                    collaseButtonText='collapse'
                >
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                </TextExpander>
            </div>
        </>
    )
}