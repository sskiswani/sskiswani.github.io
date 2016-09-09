var quotables = [
   ["We should do away with the absolutely specious notion that everybody has to earn a living. It is a fact today that one in ten thousand of us can make a technological breakthrough capable of supporting all the rest. The youth of today are absolutely right in recognizing this nonsense of earning a living. We keep inventing jobs because of this false idea that everybody has to be employed at some kind of drudgery because, according to Malthusian Darwinian theory he must justify his right to exist. So we have inspectors of inspectors and people making instruments for inspectors to inspect inspectors. The true business of people should be to go back to school and think about whatever it was they were thinking about before somebody came along and told them they had to earn a living.",
   "Buckminister Fuller"],

   ["The page that, at dusk, upon the resolved truth of a day's end, at sunset, with its dark and fresh breeze and girls glowing against the street, I would dare to read to a friend.",
   "Jorge Luis Borges"],

   ["The impoverished condition of our literature, its incapacity to attract readers, has produced a superstition about style, an inattentive reading that favors certain affectations. Those who condone this superstition reckon that style is not the effectiveness or ineffectiveness of a certain page but rather the writer's apparent skills: his analogies, acoustics, the rhythm of his syntax or punctuation. They are indifferent to their own convictions or feelings, and seek techniques (to quote Miguel de Unamuno) that will inform them whether or not this reading matter has the right to please them.",
   "Jorge Luis Borges"],

   ["We act as though comfort and luxury were the chief requirements of life, when all that we need to make us happy is something to be enthusiastic about.",
   "Albert Einstein"],

   ["I can never read all the books I want; I can never be all the people I want and live all the lives I want. I can never train myself in all the skills I want. And why do I want? I want to live and feel all the shades, tones and variations of mental and physical experience possible in life. And I am horribly limited.",
   "Sylvia Plath (The Unabridged Journals of Sylvia Plath)"],

   ["Violence is the last refuge of the incompetent",
   "Isaac Asimov"],

   ["When you say I don't care about the right to privacy because I have nothing to hide, that is no different than saying I don't care about freedom of speech because I have nothing to say or freedom of the press because I have nothing to write.",
   "Edward Snowden"],

   ["when you don’t create things, you become defined by your tastes rather than ability. your tastes only narrow & exclude people. so create.",
   "_why"]
];

window.onload = function() {
   var quote = quotables[Math.floor(Math.random() * quotables.length)];
   document.getElementById("quote").innerHTML = '<i>\"' + quote[0] + '"</i><br>&nbsp;&nbsp;&nbsp; - ' + quote[1];
}