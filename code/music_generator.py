"""
You can see the actual code file [here](music_generator.py).
"""

import argparse
import random
from collections import defaultdict
from music21 import *

def get_trigrams(data):
    """
    Generates the trigrams of an array of elements. For example, if `data = [a, b, c, d]` then the
    output will be `[[a,b,c], [b,c,d]]`.
    """
    for i in range(len(data) - 2):
        yield data[i:i + 3]

def weighted_choice(states):
    """
    Helper function that, when given a dictionary of keys and weights, chooses a random key based on its weight.
    """
    n = random.uniform(0, sum(states.values()))
    for key, val in states.items():
        if n < val:
            return key
        n -= val

    # Something went wrong, don't make a choice.
    return None

# This is the entry point of our music generator.
if __name__ == '__main__':
    # Create the Markov Chain. I use `defaultdict` as a simple (error-free) counter. This just
    # means that every key in the dictionary has a default value. If a key isn't in the dictionary
    # then it will automatically have a value generated. The `lambda: defaultdict(int)` means the
    # default value will be *another* dictionary which sets the default values to zero.
    #
    # So if you wrote `markov['test']` you would get a `defaultdict`. Going one step further,
    # you could write `markov['a']['b']` which would result in 0. This let's you write a counter
    # in the form `markov['a']['b'] += 1` without getting a `KeyError`.
    markov = defaultdict(lambda: defaultdict(int))


    # There are a few ways to initialize the Markov Chain. Here, I choose to treat all the parts
    # in the source material equally.
    sourceMaterial = corpus.parse('bach/bwv7.7')
    for part in sourceMaterial.parts:
        notes = part.flat.notes

        # Generate trigrams for each part.
        for (w1, w2, w3) in get_trigrams(notes):
            # Update the tally for this combination.
            markov[(w1, w2)][w3] += 1

    # Create a music21 stream to hold the result
    stream = stream.Stream()

    # You can use the following code for a preview of the Markov Chain probabilites:
    # `for state in markov: print('%r => %r' % (state, markov[state]))`

    # Use random to pick a random initial state (or set it yourself).
    # You can preview it by writing ```print("Initial State: %s" % repr(start_state))```
    start_state = random.choice(list(markov.keys()))

    # Now start 'walking' along the Markov Chain to generate stuff. Unfortunately, the hard part
    # is knowing when to stop. Here I say I want a song no longer than 30 notes, and if there's
    # a dead-end, stop immediately. Naturally, there are much better ways to do this.
    s1, s2 = start_state
    max_length = 30
    result = [s1, s2]
    for i in range(max_length):
        next_state = weighted_choice(markov[(s1, s2)])
        if next_state is None: break
        stream.append(next_state)
        s1 = s2
        s2 = next_state

    stream.show('midi')