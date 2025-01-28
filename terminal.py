from variable import Variable
from form import Form

class Terminal:
    def show(lines, callback=None):
        values = {}
        print()
        for line in lines:
            if type(line) == Form:
                values = {
                    variable.name: variable.convert(input(variable.label + ': ')) 
                    for variable in line.variables
                }
            else:
                print(line)
        if callback and values:
            callback(values)
