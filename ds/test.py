'''
Crowd-Counting using Multi-Column Convolutional Neural Networks.
'''

from network import MCNN
import sys


# For predicting the count of people in one Image.

def pre():
    
    mcnn = MCNN('A')
    mcnn.predict(sys.argv)
