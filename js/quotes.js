var quotations = [
   {
      quote: "We should do away with the absolutely specious notion that everybody has to earn a living. It is a fact today that one in ten thousand of us can make a technological breakthrough capable of supporting all the rest. The youth of today are absolutely right in recognizing this nonsense of earning a living. We keep inventing jobs because of this false idea that everybody has to be employed at some kind of drudgery because, according to Malthusian Darwinian theory he must justify his right to exist. So we have inspectors of inspectors and people making instruments for inspectors to inspect inspectors. The true business of people should be to go back to school and think about whatever it was they were thinking about before somebody came along and told them they had to earn a living.",
      src: "Buckminister Fuller"
   },
   {
      quote: "The page that, at dusk, upon the resolved truth of a day's end, at sunset, with its dark and fresh breeze and girls glowing against the street, I would dare to read to a friend.",
      src: "Jorge Luis Borges"
   },
   {
      quote: "The impoverished condition of our literature, its incapacity to attract readers, has produced a superstition about style, an inattentive reading that favors certain affectations. Those who condone this superstition reckon that style is not the effectiveness or ineffectiveness of a certain page but rather the writer's apparent skills: his analogies, acoustics, the rhythm of his syntax or punctuation. They are indifferent to their own convictions or feelings, and seek techniques (to quote Miguel de Unamuno) that will inform them whether or not this reading matter has the right to please them.",
      src: "Jorge Luis Borges"
   },
   {
      quote: "We act as though comfort and luxury were the chief requirements of life, when all that we need to make us happy is something to be enthusiastic about.",
      src: "Albert Einstein"
   },
   {
      quote: "I can never read all the books I want; I can never be all the people I want and live all the lives I want. I can never train myself in all the skills I want. And why do I want? I want to live and feel all the shades, tones and variations of mental and physical experience possible in life. And I am horribly limited.",
      src: "Sylvia Plath, <i>The Unabridged Journals of Sylvia Plath</i>"
   },
   {
      quote: "Immature strategy is the cause of grief.",
      src: "Miyamoto Musashi, <i>Book of Five Rings</i>"
   },
   {
      quote: "Violence is the last refuge of the incompetent",
      src: "Isaac Asimov"
   },
   {
      quote: "When you say I don't care about the right to privacy because I have nothing to hide, that is no different than saying I don't care about freedom of speech because I have nothing to say or freedom of the press because I have nothing to write.",
      src: "Edward Snowden"
   },
   {
      quote: "when you don’t create things, you become defined by your tastes rather than ability. your tastes only narrow & exclude people. so create.",
      src: "_why"
   },
   {
      quote: "The actors by their presence always convince me, to my horror, that most of what I've written about them until now is false. It is false because I write about them with steadfast love (even now, while I write it down, this, too, becomes false) but varying ability, and this varying ability does not hit off the real actors loudly and correctly but loses itself dully in this love that will never be satisfied with the ability and therefore thinks it is protecting the actors by preventing this ability from exercising itself.",
      src: "Franz Kafka"
   },
   {
      quote: "It is (to describe it figuratively) as if an author were to make a slip of the pen, and as if this clerical error became conscious of being such. Perhaps this was no error but in a far higher sense was an essential part of the whole exposition. It is, then, as if this clerical error were to revolt against the author, out of hatred for him, were to forbid him to correct it, and were to say, 'No, I will not be erased, I will stand as a witness against thee, that thou art a very poor writer.'",
      src: "Søren Kierkegaard"
   }
];

window.onload = function () {
   var quote = quotations[Math.floor(Math.random() * quotations.length)];
   document.querySelector('.quote').innerHTML = '<i>"'
      + quote.quote
      + '"</i><br /> &nbsp - '
      + quote.src;
};
