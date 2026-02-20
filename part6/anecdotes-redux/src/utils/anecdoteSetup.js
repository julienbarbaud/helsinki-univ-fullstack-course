const shittyQuotes = [
    'If it hurts, do it more often and say "thank you daddy for making me squeal".',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Premature optimization is the root of all evil. Which logically implies that any genocidal war crime that does not stem from premature optimization is not evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it. Which is what a fool who thinks that writing code cleverly makes it harder to deal with would say. Writing code stupidly makes it harder to debug.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients. Which is a perfectly reasonable decision for 99.9% of patients a doctor sees.',
    'The only way to go fast, is to go well. Or to give up early',
];

export const generateId = () => Math.floor(Math.random()*1000000)

const setupAnecdote = (quote) => {
  return {
    content: quote,
    likes: 0,
    id: generateId(),
  };
};

const initialAnecdotes = shittyQuotes.map(setupAnecdote);

export default initialAnecdotes
