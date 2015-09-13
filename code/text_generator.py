import string
import random
from collections import defaultdict


def remove_punction(text):
    """
    Removes the punctuation from a given string
    """
    return text.translate(str.maketrans("", "", string.punctuation))


def get_trigrams(data):
    """
    Generates the trigrams of an array of elements. For example, if `data = [a, b, c, d]` then the
    output will be `[[a,b,c], [b,c,d]]`.
    """
    for i in range(len(data) - 2):
        yield data[i:i + 3]


def get_ngrams(degree, data):
    """
    Generates the n-grams of an array of elements. For example, if `data = [a, b, c, d]` and
    `degree = 2` then the output will be `[[a,b], [b,c], [c,d]]`. This is just a generic
    version of the `get_trigrams` function, here for reference.
    """
    for i in range(len(data) - degree + 1):
        yield data[i:i + degree]


def weighted_choice(states):
    """
    Given a dictionary of keys and weights, choose a random key based on its weight.
    """
    n = random.uniform(0, sum(states.values()))
    for key, val in states.items():
        if n < val:
            return key
        n -= val

    # Something went wrong, don't make a choice.
    return None


if __name__ == '__main__':
    # Load some data from a text file named `lyrics.txt`
    # Open the file containing the data, and read it into a variable.
    # The file might look something like:
    """
    `
    WORK IN PRAGUE\n
    Low comedy's got the new shine.\n
    Defiant luster.\n
    The three film score.\n
    No claims between updates and rehearsals.\n
    Always admired.\n
    `
    """
    file = open("lyrics.txt")
    data = file.read()

    # Clean up the data by removing punctuation and replacing newlines (`\n`) with spaces.
    # Cleaning is *typically* the hardest part, since you'll encounter a lot of weird stuff
    # out in the wild.
    data = remove_punction(data).replace('\n', ' ')
    parsed_data = data.split(' ')

    # Create the Markov Chain. I use `defaultdict` as a simple (error-free) counter. This just
    # means that every key in the dictionary has a default value. If a key isn't in the dictionary
    # then it will automatically have a value generated. The `lambda: defaultdict(int)` means the
    # default value will be *another* dictionary which sets the default values to zero.
    #
    # So if you wrote `markov['test']` you would get a `defaultdict`. Going one step further,
    # you could write `markov['a']['b']` which would result in 0. This let's you write a counter
    # in the form `markov['a']['b'] += 1` without getting a `KeyError`.
    markov = defaultdict(lambda: defaultdict(int))

    # Now split the input data into trigrams for parsing.
    for (w1, w2, w3) in get_trigrams(parsed_data):
        # Use lowercase to normalize the data.
        w1 = w1.lower()
        w2 = w2.lower()
        w3 = w3.lower()

        # Update the tally for this combination.
        markov[(w1, w2)][w3] += 1

    # You can use the following code for a preview of the Markov Chain probabilites:
    # `for state in markov: print('%r => %r' % (state, markov[state]))`

    # Use random to pick a random initial state (or set it yourself).
    start_state = random.choice(list(markov.keys()))
    # You can preview it by writing ```print("Initial State: %s" % repr(start_state))```

    # Now start 'walking' along the Markov Chain to generate stuff. Unfortunately, the hard part
    # is knowing when to stop. Here I say I want sentences no longer than 15 words, and if there's
    # a dead-end, stop immediately. Naturally, there's much better ways to do this.
    s1, s2 = start_state
    max_length = 15
    result = [s1, s2]
    for i in range(max_length):
        next_state = weighted_choice(markov[(s1, s2)])
        if next_state is None: break
        result.append(next_state)
        s1 = s2
        s2 = next_state

    # Now we convert the data to regular string.
    generated_text = ' '.join(result) + '.'
    print("Lyrics: %s" % generated_text)

    # Enjoy! Sometimes Markov Chains are great, sometimes they are finicky, and you probably
    # need a lot of data to get coherent/good results from them. They're definitely a good
    # starting place for content generation, though.
