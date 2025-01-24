try:
    from pyscript.web import page, li

    class Web:
        def show_unit_tests(unit_tests):
            ol_unit_tests = page['#unit-tests'][0]
            for li_unit_test in ol_unit_tests:
                li_unit_test._dom_element.remove()
            for unit_test in unit_tests:
                ol_unit_tests.append(li(str(unit_test)))

        def show_current_function(function):
            code_current_function = page['#current-function'][0]
            code_current_function.innerHTML = str(function)

except ModuleNotFoundError:
    class Web:
        def show_unit_tests(unit_tests):
            pass

        def show_current_function(function):
            pass
