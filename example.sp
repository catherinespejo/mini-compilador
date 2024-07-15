test = "123"

show("Hello world!")
show("3 + 5 =" plus(3 5))

hello = (subject) => {
    show(concat("Hello, " subject))
    show(concat("Hello, " subject))
}

doIt = () => {
    show("Do it!")
}

doIt()

hello("Brother")

classmates = split("Jerry Jordan Johnny Jack Jeffery" " ")

each(classmates (peep) =>
    show(concat("Hello " peep))
)

fib = (n) =>
    if(eq(n 1)
        () => 1
        () =>
            if(eq(n 2)
                () => 1
                () =>
                    plus(
                        fib(minus(n 1))
                        fib(minus(n 2))
                    )
            )
        )

show(fib(9))