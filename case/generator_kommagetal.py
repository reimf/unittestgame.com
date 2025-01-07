import random

def generate_digits():
    for d1 in range(10):
        for d2 in range(d1, 10):
            if d1 + d2 == 13:
                yield [d1, d2]
            for d3 in range(d2, 10):
                if d1 + d2 + d3 == 13:
                    yield [d1, d2, d3]
                for d4 in range(d3, 10):
                    if d1 + d2 + d3 + d4 == 13:
                        yield [d1, d2, d3, d4]

def generate_letters():
    for u1 in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ':
        yield [u1]
        for u2 in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ':
            yield []
            yield [u1, u2]

def generate_special_characters():
    for s1 in '@#':
        yield [s1]
        for s2 in '@#':
            yield []
            yield [s1, s2]

digits = list(generate_digits())
letters = list(generate_letters())
special_characters = list(generate_special_characters())

for i in range(100):
    ds = random.choice(digits)
    us = random.choice(letters)
    scs = random.choice(special_characters)
    chars = [str(d) for d in ds] + us + scs
    random.shuffle(chars)
    print(''.join(chars))

    p = random.randint(0, len(chars) - 1)
    chars[p] = random.choice('0123456789')
    print('  ' + ''.join(chars))
