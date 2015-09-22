import numpy as np
import matplotlib.pyplot as plt

# A basic line plot
plt.plot([1,2,3,4])
plt.ylabel('some numbers')
plt.xlabel('domain of some numbers')
plt.show()

# A basic scatter plot
y_values = [1,4,9,16]
x_values = [1,2,3,4]
# The available formats can be found [here](http://matplotlib.org/api/pyplot_api.html#matplotlib.pyplot.plot).
format = 'ro'
plt.plot(x_values, y_values, format)

# Choose some values for the domain and range of the graph.
x_min = 0
x_max = 6
y_min = 0
y_max = 20

# You could just as easily shorten it to `plt.axis([0, 6, 0 20])`.
plt.axis([x_min, x_max, y_min, y_max])
plt.show()


"""
    Here we plot a green histogram of pitches that is slightly transparent,
    using 6 evenly-spaced bins, and normalize their probabilities.
"""
pitches = [1, 3, 11, 11, 9, 3, 4, 2, 7, 7, 11, 3, 4, 2, 2, 9, 8, 4, 2]
plt.hist(pitches, bins=6, normed=1, facecolor='g', alpha=0.75)

# Assign some labels to the plot
plt.xlabel('Pitches')
plt.ylabel('Probability')
plt.title('Pitch Probabilities')

# Apply a grid and show it
plt.grid(True)
plt.show()

"""
    Creating multiple plots on one figure.
"""

# Create a plot with one row and two columns.
rows = 1
columns = 2
fig, ax = plt.subplots(rows, columns)

# ax is an array containing each of the subplots, from top-left to bottom-right.
# First, let's plot the histogram
pitches = [1, 3, 11, 11, 9, 3, 4, 2, 7, 7, 11, 3, 4, 2, 2, 9, 8, 4, 2]
ax[0].hist(pitches, bins=6, normed=1, facecolor='g', alpha=0.75)

ax[0].set_title("Histogram")
ax[0].set_xlabel('Pitch')
ax[0].set_ylabel('Probability')
ax[0].grid(True)

# Now the second plot
y_values = [1,4,9,16]
x_values = [1,2,3,4]
format = 'ro'
ax[1].plot(x_values, y_values, format)
ax[1].set_title("Example 2 Plot")
ax[1].axis([0, 6, 0, 20])

plt.show()